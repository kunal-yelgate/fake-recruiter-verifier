"""Parallel SerpApi signal evaluators for cross-checking job postings with live web data."""

import asyncio
import urllib.parse
from typing import List, Tuple
from app.models import ExtractedFields, SignalResult
from app.serpapi_client import serpapi_client

FREE_EMAIL_DOMAINS = {
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "aol.com",
    "proton.me",
    "protonmail.com",
    "icloud.com",
    "mail.com",
    "zoho.com",
}


def _extract_domain_from_url(url: str) -> str:
    """Extract clean domain (e.g., example.com) from any URL string."""
    try:
        if not url.startswith(("http://", "https://")):
            url = "https://" + url
        parsed = urllib.parse.urlparse(url)
        domain = parsed.netloc or parsed.path
        if domain.startswith("www."):
            domain = domain[4:]
        return domain.lower().split(":")[0]
    except Exception:
        return ""


async def check_company_footprint(fields: ExtractedFields) -> SignalResult:
    """Check 1: Google Maps real-world physical presence check."""
    company = fields.company_name or "Company"
    query = company
    params = {"q": query}

    data = await serpapi_client.search("google_maps", params)
    local_results = data.get("local_results", [])
    place = data.get("place_results")

    search_url = f"https://www.google.com/maps/search/{urllib.parse.quote_plus(query)}"
    evidence_url = None

    match_found = False
    top_place = None
    candidates = []
    if place:
        candidates.append(place)
    if local_results and isinstance(local_results, list):
        candidates.extend(local_results)

    company_clean = "".join(c for c in company.lower() if c.isalnum() or c.isspace())
    stopwords = {"inc", "llc", "corp", "corporation", "ltd", "limited", "group", "co", "the", "services", "solutions", "agency", "staffing"}
    specific_words = [w for w in company_clean.split() if w not in stopwords and len(w) >= 3]
    
    for res in candidates:
        res_title = res.get("title", "").lower()
        if specific_words and all(w in res_title for w in specific_words):
            top_place = res
            match_found = True
            break

    if match_found and top_place:
        title = top_place.get("title", company)
        addr = top_place.get("address", "Registered location")
        evidence_url = top_place.get("website") or search_url
        return SignalResult(
            signal_key="company_footprint",
            signal_name="Company Physical Footprint",
            engine="google_maps",
            score_delta=-15,
            status="pass",
            finding=f"Verified business footprint on Google Maps: '{title}' at {addr}.",
            query_used=query,
            evidence_url=evidence_url,
            search_url=search_url,
        )

    return SignalResult(
        signal_key="company_footprint",
        signal_name="Company Physical Footprint",
        engine="google_maps",
        score_delta=10,
        status="warning",
        finding=f"No verified Google Maps listing or registered headquarters address found for '{company}'.",
        query_used=query,
        evidence_url=None,
        search_url=search_url,
    )


async def check_linkedin_presence(fields: ExtractedFields) -> SignalResult:
    """Check 2: Google search with site:linkedin.com to verify official company page."""
    company = fields.company_name or "Company"
    query = f'site:linkedin.com/company "{company}"'
    params = {"q": query}

    data = await serpapi_client.search("google", params)
    organic = data.get("organic_results", [])

    search_url = f"https://www.google.com/search?q={urllib.parse.quote_plus(query)}"
    evidence_url = None

    for item in organic:
        link = item.get("link", "")
        if "linkedin.com/company/" in link:
            evidence_url = link
            snippet = item.get("snippet", "")
            return SignalResult(
                signal_key="linkedin_presence",
                signal_name="LinkedIn Corporate Presence",
                engine="google",
                score_delta=-15,
                status="pass",
                finding=f"Active verified LinkedIn corporate page found: {item.get('title', 'Company Profile')}.",
                query_used=query,
                evidence_url=evidence_url,
                search_url=search_url,
            )

    return SignalResult(
        signal_key="linkedin_presence",
        signal_name="LinkedIn Corporate Presence",
        engine="google",
        score_delta=12,
        status="fail",
        finding=f"No corporate LinkedIn page discovered for '{company}'. Legitimate recruiters almost universally maintain an official company presence.",
        query_used=query,
        evidence_url=None,
        search_url=search_url,
    )


async def check_duplicate_posting(fields: ExtractedFields) -> SignalResult:
    """Check 3: Exact phrase search to spot cross-posting spam or scraper fingerprint."""
    phrase = fields.distinctive_phrase or "hiring remote immediate"
    query = f'"{phrase}"'
    params = {"q": query}

    data = await serpapi_client.search("google", params)
    organic = data.get("organic_results", [])
    count = len(organic)

    search_url = f"https://www.google.com/search?q={urllib.parse.quote_plus(query)}"

    # Check if duplicate is on pastebins or known suspicious boards
    suspicious_domains = {"pastebin.com", "telegra.ph", "freelance-jobs.xyz", "classifieds-spam.net", "forum"}
    suspicious_count = 0
    top_link = None

    for item in organic:
        link = item.get("link", "")
        if not top_link:
            top_link = link
        domain = _extract_domain_from_url(link)
        if any(s in domain for s in suspicious_domains):
            suspicious_count += 1

    if count >= 4 or suspicious_count >= 1:
        return SignalResult(
            signal_key="duplicate_posting",
            signal_name="Duplicate / Cross-Posting Fingerprint",
            engine="google",
            score_delta=18,
            status="fail",
            finding=f"Exact posting text was duplicated across {count} different websites/forums (typical signature of automated recruitment spam).",
            query_used=query,
            evidence_url=top_link or search_url,
            search_url=search_url,
        )
    elif count == 1:
        return SignalResult(
            signal_key="duplicate_posting",
            signal_name="Duplicate / Cross-Posting Fingerprint",
            engine="google",
            score_delta=-8,
            status="pass",
            finding="Posting text is unique and appears restricted to official recruitment channels.",
            query_used=query,
            evidence_url=top_link or search_url,
            search_url=search_url,
        )

    return SignalResult(
        signal_key="duplicate_posting",
        signal_name="Duplicate / Cross-Posting Fingerprint",
        engine="google",
        score_delta=-4,
        status="pass",
        finding="No widespread duplicate spam copies found across public forums or paste sites.",
        query_used=query,
        evidence_url=search_url,
        search_url=search_url,
    )


async def check_news_fraud(fields: ExtractedFields) -> SignalResult:
    """Check 4: Google News scan for scam, fraud, or lawsuit complaints."""
    company = fields.company_name or "Company"
    query = f'"{company}" (scam OR fraud OR fake OR lawsuit OR complaint)'
    params = {"q": query}

    data = await serpapi_client.search("google_news", params)
    news = data.get("news_results", [])

    search_url = f"https://news.google.com/search?q={urllib.parse.quote_plus(query)}"

    if news and len(news) > 0:
        top_news = news[0]
        headline = top_news.get("title", "Fraud report")
        source = top_news.get("source", "News Alert")
        link = top_news.get("link") or search_url
        return SignalResult(
            signal_key="news_fraud_mentions",
            signal_name="News Fraud & Scam Mentions",
            engine="google_news",
            score_delta=20,
            status="fail",
            finding=f"Public fraud complaints or scam alerts detected: \"{headline}\" ({source}).",
            query_used=query,
            evidence_url=link,
            search_url=search_url,
        )

    return SignalResult(
        signal_key="news_fraud_mentions",
        signal_name="News Fraud & Scam Mentions",
        engine="google_news",
        score_delta=-5,
        status="pass",
        finding=f"No negative press, regulatory enforcement, or scam complaints discovered in Google News for '{company}'.",
        query_used=query,
        evidence_url=None,
        search_url=search_url,
    )


async def check_domain_match(fields: ExtractedFields) -> SignalResult:
    """Check 5: Lookalike domain & recruiter email verification."""
    claimed_domain = fields.claimed_domain
    email = fields.contact_email
    company = fields.company_name or "Company"
    query = f'"{company}" official website'
    params = {"q": query}

    search_url = f"https://www.google.com/search?q={urllib.parse.quote_plus(query)}"

    # 1. Critical red flag: Recruiter contacts candidate from a free webmail address
    if claimed_domain and claimed_domain in FREE_EMAIL_DOMAINS:
        return SignalResult(
            signal_key="domain_match",
            signal_name="Domain & Email Match",
            engine="google",
            score_delta=25,
            status="fail",
            finding=f"High Risk: Recruiter email uses a free webmail domain (@{claimed_domain}) instead of an official company email domain.",
            query_used=query,
            evidence_url=None,
            search_url=search_url,
        )

    # 2. Check corporate domain via Google search
    data = await serpapi_client.search("google", params)
    organic = data.get("organic_results", [])

    official_domain = ""
    top_link = None
    for item in organic:
        link = item.get("link", "")
        domain = _extract_domain_from_url(link)
        # Exclude directories, social media, and Wikipedia
        if domain and not any(skip in domain for skip in ["wikipedia.org", "linkedin.com", "glassdoor.com", "facebook.com", "bloomberg.com"]):
            official_domain = domain
            top_link = link
            break

    if not claimed_domain:
        return SignalResult(
            signal_key="domain_match",
            signal_name="Domain & Email Match",
            engine="google",
            score_delta=5,
            status="warning",
            finding="No company domain or email address was present in the posting to verify against official web records.",
            query_used=query,
            evidence_url=top_link,
            search_url=search_url,
        )

    # Compare claimed domain vs official domain
    claimed_clean = _extract_domain_from_url(claimed_domain)
    if official_domain and (claimed_clean == official_domain or claimed_clean.endswith("." + official_domain)):
        return SignalResult(
            signal_key="domain_match",
            signal_name="Domain & Email Match",
            engine="google",
            score_delta=-15,
            status="pass",
            finding=f"Claimed domain ({claimed_clean}) directly matches the verified official website ({official_domain}).",
            query_used=query,
            evidence_url=top_link,
            search_url=search_url,
        )

    # Lookalike or domain spoofing detection
    if official_domain and claimed_clean != official_domain:
        return SignalResult(
            signal_key="domain_match",
            signal_name="Domain & Email Match",
            engine="google",
            score_delta=22,
            status="fail",
            finding=f"Lookalike Domain Alert: Posting references '{claimed_clean}', but official company website is '{official_domain}'.",
            query_used=query,
            evidence_url=top_link,
            search_url=search_url,
        )

    return SignalResult(
        signal_key="domain_match",
        signal_name="Domain & Email Match",
        engine="google",
        score_delta=0,
        status="warning",
        finding=f"Domain '{claimed_clean}' could not be definitively cross-referenced with top search results.",
        query_used=query,
        evidence_url=top_link,
        search_url=search_url,
    )


async def check_recruiter_identity(fields: ExtractedFields) -> SignalResult:
    """Check 6: Recruiter identity & company affiliation verification."""
    recruiter = fields.recruiter_name
    company = fields.company_name or "Company"

    if not recruiter:
        return SignalResult(
            signal_key="recruiter_check",
            signal_name="Recruiter Identity Verification",
            engine="google",
            score_delta=0,
            status="warning",
            finding="No specific recruiter or hiring manager name found in the posting text.",
            query_used="N/A",
            evidence_url=None,
            search_url=None,
        )

    query = f'"{recruiter}" "{company}" (recruiter OR talent OR HR OR "human resources" OR linkedin)'
    params = {"q": query}
    data = await serpapi_client.search("google", params)
    organic = data.get("organic_results", [])

    search_url = f"https://www.google.com/search?q={urllib.parse.quote_plus(query)}"

    recruiter_parts = recruiter.lower().split()
    company_clean = "".join(c for c in company.lower() if c.isalnum() or c.isspace())
    company_parts = [p for p in company_clean.split() if p not in {"inc", "llc", "corp", "ltd", "group", "co", "the", "services", "solutions", "staffing"} and len(p) >= 3]

    for item in organic:
        title = item.get("title", "").lower()
        snippet = item.get("snippet", "").lower()
        link = item.get("link", "")
        combined = title + " " + snippet
        
        has_recruiter = all(part in combined for part in recruiter_parts)
        has_company = not company_parts or any(cp in combined for cp in company_parts)

        if has_recruiter and has_company:
            return SignalResult(
                signal_key="recruiter_check",
                signal_name="Recruiter Identity Verification",
                engine="google",
                score_delta=-12,
                status="pass",
                finding=f"Public professional profile confirmed: {item.get('title', recruiter)} affiliated with {company}.",
                query_used=query,
                evidence_url=link,
                search_url=search_url,
            )

    return SignalResult(
        signal_key="recruiter_check",
        signal_name="Recruiter Identity Verification",
        engine="google",
        score_delta=10,
        status="fail",
        finding=f"No public professional record or LinkedIn profile connects '{recruiter}' to '{company}'.",
        query_used=query,
        evidence_url=None,
        search_url=search_url,
    )


async def evaluate_all_signals(fields: ExtractedFields) -> List[SignalResult]:
    """Run all 6 SerpApi verification signals concurrently."""
    tasks = [
        check_company_footprint(fields),
        check_linkedin_presence(fields),
        check_duplicate_posting(fields),
        check_news_fraud(fields),
        check_domain_match(fields),
        check_recruiter_identity(fields),
    ]
    results: List[SignalResult] = await asyncio.gather(*tasks)
    return results
