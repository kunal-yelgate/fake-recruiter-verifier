"""Transparent weighted scoring engine for fake recruiter verification.

Scoring Logic:
  Base score = 50
  Adjusted by summing delta points from each verified signal.
  Clamped to [0, 100].

Thresholds:
  - Score >= 65: 'Likely Scam' (badge: danger)
  - Score between 35 and 64: 'Caution' (badge: warning)
  - Score < 35: 'Likely Legitimate' (badge: success)
"""

from typing import List, Tuple
from app.models import SignalResult


BASE_SCORE = 50
SCAM_THRESHOLD = 65
CAUTION_LOWER = 35


def calculate_risk_score(signals: List[SignalResult], base: int = BASE_SCORE) -> Tuple[int, str, str, str]:
    """
    Compute final risk score, verdict string, badge style, and an informative narrative summary.

    Returns:
        (risk_score, verdict, verdict_badge, summary)
    """
    total_delta = sum(s.score_delta for s in signals)
    raw_score = base + total_delta

    # Clamp to [0, 100]
    final_score = max(0, min(100, raw_score))

    if final_score >= SCAM_THRESHOLD:
        verdict = "Likely Scam"
        verdict_badge = "danger"
    elif final_score >= CAUTION_LOWER:
        verdict = "Caution"
        verdict_badge = "warning"
    else:
        verdict = "Likely Legitimate"
        verdict_badge = "success"

    # Generate transparent narrative summary
    failing_signals = [s for s in signals if s.status == "fail"]
    passing_signals = [s for s in signals if s.status == "pass"]

    if verdict == "Likely Scam":
        reasons = "; ".join(s.finding for s in failing_signals[:2])
        summary = (
            f"High scam probability ({final_score}/100). The posting triggered critical fraud signals: {reasons}. "
            "Do not send personal identity documents, deposit unsolicited checks, or communicate on unverified messaging channels."
        )
    elif verdict == "Caution":
        summary = (
            f"Moderate risk score ({final_score}/100). Mixed verification signals found. Some legitimate corporate traces "
            "exist, but key verification steps were inconclusive or missing. Exercise due diligence before providing confidential details."
        )
    else:
        corroborations = "; ".join(s.signal_name for s in passing_signals[:3])
        summary = (
            f"Low risk score ({final_score}/100). Strong corroborated digital footprint across live search results: {corroborations}. "
            "Posting appears authentic."
        )

    return final_score, verdict, verdict_badge, summary
