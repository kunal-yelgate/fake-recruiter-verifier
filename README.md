# Job Scam Verifier

Paste a job posting → get a risk score backed by live search evidence, not just
text-pattern matching.

## Why this is different

Most job-scam checkers (LoopCV, JobScamScore, JobMeter) classify the *text* of
a posting against known scam phrases. That misses the strongest scam signal:
whether the world outside the posting corroborates it. This tool cross-checks
the posting against live search data:

- Does the company have a real Google Maps listing?
- Does it have a LinkedIn company page?
- Is the exact posting text duplicated across unrelated sites (a classic spam
  signature)?
- Does the posting's domain match the company's actual official domain, or is
  it a lookalike (`amazon-careers.net` vs `amazon.com`)?
- Is there news coverage linking the company to fraud/scam complaints?
- Does the named recruiter show up anywhere legitimate tied to the company?

Every signal is a live SerpApi call. The verdict is a transparent, weighted
sum of these signals — not an opaque LLM judgment — and every line of
evidence links back to the SerpApi result that produced it.

## SerpApi usage

| Signal | Engine | Purpose |
|---|---|---|
| Company footprint | `google_maps` | real-world presence check |
| LinkedIn presence | `google` (`site:linkedin.com`) | company legitimacy |
| Duplicate posting | `google` (exact phrase) | spam/cross-posting fingerprint |
| News fraud mentions | `google_news` | prior fraud reports |
| Domain match | `google` | lookalike-domain detection |
| Recruiter check | `google` | recruiter identity verification |

## Repository Structure

```
fake-recruiter-verifier/
├── app/                        # backend (FastAPI)
│   ├── __init__.py
│   ├── main.py                 # FastAPI app, /check endpoint
│   ├── config.py               # env/settings
│   ├── models.py               # pydantic schemas
│   ├── extraction.py           # posting text -> structured fields (LLM + regex fallback)
│   ├── signals.py              # parallel SerpApi calls
│   ├── scoring.py              # weighted scoring engine
│   ├── cache.py                # SQLite 24h query cache
│   └── serpapi_client.py       # SerpApi HTTP wrapper
├── tests/
│   ├── test_scoring.py         # unit tests on scoring formula (fixed inputs)
│   ├── test_extraction.py      # regex fallback tests
│   └── fixtures/
│       ├── scam_posting.txt    # real scraped scam example
│       └── legit_posting.txt   # real company careers page text
├── frontend/                   # frontend client
│   ├── index.html              # interactive single-page UI
│   ├── app.js                  # paste box -> POST /check -> render evidence table
│   └── styles.css              # responsive dark/light styling with micro-animations
├── .env.example
├── .gitignore
├── requirements.txt
├── README.md
└── demo/
    └── script.md               # word-for-word demo video script
```

## Setup

```bash
git clone <repo-url>
cd fake-recruiter-verifier
cp .env.example .env        # add your SERPAPI_KEY (get one free at serpapi.com)
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Visit `http://127.0.0.1:8000/docs` for the interactive API, or `POST /check`:

```bash
curl -X POST http://127.0.0.1:8000/check \
  -H "Content-Type: application/json" \
  -d '{"raw_text": "<paste job posting text here>"}'
```

## Running the Frontend

You can run the frontend either by:
1. Opening `frontend/index.html` directly in any modern browser or serving via a local web server (e.g. `python -m http.server 5173 --directory frontend`).
2. Or running the Vite dev server with `cd frontend && npm install && npm run dev`.

## Running Tests

```bash
pytest -v
```

## Scoring

Base score 50, adjusted by weighted signals, clamped to 0–100.

- `>= 65` → **Likely Scam**
- `35–64` → **Caution**
- `< 35` → **Likely Legitimate**

See `app/scoring.py` for exact weights.

## Notes

- `ANTHROPIC_API_KEY` is optional — used to extract structured fields
  (company name, recruiter, distinctive phrase) more reliably. Without it,
  a regex-based fallback is used.
- Queries are cached in a local SQLite file (`app_cache.db`) for 24h to avoid re-spending
  SerpApi credits on repeat checks during development/demo.
- When `SERPAPI_KEY` is not supplied, the backend runs in a demo simulation mode so that UI flows and mock signals can be tested immediately.