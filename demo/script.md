# Job Scam Verifier — Demo Video Script

**Format:** 3–4 Minute Screen Recording with Voiceover  
**Target Audience:** Recruiters, Job Seekers, Security Analysts, Hackathon Judges  
**Setup Checklist Before Recording:**
- Backend running on `http://localhost:8000` (`uvicorn app.main:app --reload`)
- Frontend open in browser at `http://localhost:5173` (or direct `frontend/index.html`)
- Two tabs ready:
  1. `tests/fixtures/scam_posting.txt`
  2. `tests/fixtures/legit_posting.txt`

---

## [0:00 - 0:35] The Hook & The Flaw in Existing Checkers

**[Visual: Presenter screen on the Job Scam Verifier web interface. Clean dark mode, glowing title.]**

> **Speaker:**  
> "Every week, thousands of job seekers get scammed by fake recruiters. They lose money on fake check deposits, hand over sensitive personal data, or fall for impersonators using spoofed company names.  
>  
> Existing job scam tools make a fundamental mistake: they only analyze the *text* of the job description for known red-flag phrases. But modern scammers know this. They copy real job descriptions word-for-word from companies like Google, Amazon, or Stripe.  
>  
> The real question isn't *what* the text says—it's **whether the world outside the posting corroborates it.**  
>  
> That’s why we built **Job Scam Verifier**—a verification engine powered by live SerpApi search signals."

---

## [0:35 - 1:20] How It Works: The 6 Real-World Signals

**[Visual: Scroll down or point cursor to the 6 SerpApi signals badge breakdown.]**

> **Speaker:**  
> "Instead of an opaque LLM score, our system cross-checks every posting against 6 live search engines via SerpApi:  
> 
> 1. **Google Maps Footprint:** Does this company have a physical, verifiable office or registered presence?  
> 2. **LinkedIn Presence:** Does an official company page exist with employee rosters?  
> 3. **Duplicate Posting Detection:** Does an exact 14-word phrase from this posting show up pasted across unindexed forums, Telegram groups, and pastebins?  
> 4. **Google News Alerts:** Are there fresh news reports or regulatory complaints linking this entity to fraud?  
> 5. **Domain Lookalike Matching:** Does the recruiter's email domain match the company's verified primary domain, or is it a lookalike like `amazon-careers.net` or a generic `@gmail.com`?  
> 6. **Recruiter Identity:** Does the named recruiter actually show up in public professional records attached to this company?  
> 
> Every signal modifies a base score of 50, and every piece of evidence links directly to the search query that proved it."

---

## [1:20 - 2:25] Live Demo: Analyzing a Real Job Scam

**[Visual: Click 'Load Scam Example' or paste contents of `scam_posting.txt`. Click 'Verify Job Posting'.]**

> **Speaker:**  
> "Let’s test it on a real scam posting from our dataset. Notice what it looks like: an urgent remote data entry role offering $50/hour, asking the candidate to connect on Telegram and mentioning an upfront check deposit.  
>  
> Let's hit **'Verify Job Posting'**.  
>  
> Behind the scenes, the API extracts the company name, recruiter Marcus Vance, and the email domain. Then it fires all 6 SerpApi queries in parallel."

**[Visual: Loading animation finishes in ~1 second. The Risk Score meter animates to 93/100 in Crimson Red with badge 'Likely Scam'.]**

> **Speaker:**  
> "Look at that result: **Risk Score 93/100 — Likely Scam.**  
>  
> Notice the transparency in the evidence table below:  
> - **Domain & Email Match (+25 pts):** The posting claims to be Apex Global Staffing, but the recruiter is using a free `@gmail.com` address.  
> - **Duplicate Fingerprint (+18 pts):** The exact phrase was detected across 5 different unverified classifieds and pastebin sites. Clicking this link takes us right to the live search proof.  
> - **Physical Footprint (+10 pts):** Google Maps found zero registered commercial presence for this company name.  
> - **News Alerts (+20 pts):** Public consumer alerts warning about check-cashing employment scams.  
>  
> In under 2 seconds, a job seeker is protected from losing thousands of dollars."

---

## [2:25 - 3:15] Live Demo: Verifying a Legitimate Posting

**[Visual: Click 'Load Legit Example' (Stripe Software Engineer posting). Click 'Verify Job Posting'.]**

> **Speaker:**  
> "Now let’s verify a real posting from Stripe’s careers page. We click **'Verify Job Posting'**.  
>  
> Watch the score calculate."

**[Visual: Risk Score meter animates to 5/100 in Emerald Green with badge 'Likely Legitimate'.]**

> **Speaker:**  
> "Now the score drops down to **5/100 — Likely Legitimate.**  
>  
> The signals tell the whole story:  
> - Official Google Maps headquarters verified in San Francisco.  
> - Official verified LinkedIn company page with thousands of employees.  
> - The email `@stripe.com` directly matches Stripe's official top-ranked domain.  
> - Zero duplicate spam syndicate entries.  
> - Zero negative fraud reports in Google News.  
>  
> All live, cached for 24 hours in SQLite so repeat queries cost zero SerpApi credits."

---

## [3:15 - 3:45] Conclusion & Open Source Architecture

**[Visual: Show GitHub repo, FastAPI `/docs` interactive Swagger page, and terminal with tests passing.]**

> **Speaker:**  
> "Under the hood, this is a clean FastAPI backend with an optional Claude extraction step and a regex fallback, coupled with a responsive frontend featuring dark mode.  
>  
> All unit tests for scoring thresholds and regex extraction pass out of the box.  
>  
> Job scams are evolving quickly, but scammers can't fake a real-world digital footprint. Thank you!"

---
