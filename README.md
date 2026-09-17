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
├── app/                            # Backend (FastAPI + Python)
│   ├── __init__.py
│   ├── main.py                     # FastAPI app, /check endpoint
│   ├── config.py                   # env/settings (pydantic-settings)
│   ├── models.py                   # Pydantic request/response schemas
│   ├── extraction.py               # Posting text → structured fields (LLM + regex fallback)
│   ├── signals.py                  # 6 parallel SerpApi verification checks
│   ├── scoring.py                  # Weighted scoring engine (base 50, clamped 0–100)
│   ├── cache.py                    # SQLite 24h query cache
│   └── serpapi_client.py           # Async SerpApi HTTP wrapper with mock fallback
│
├── frontend/                       # Frontend (React + Vite + Tailwind CSS)
│   ├── index.html                  # Vite HTML entrypoint
│   ├── package.json                # React 18, Vite, Tailwind CSS, Lucide React
│   ├── vite.config.js              # Vite + @vitejs/plugin-react
│   ├── tailwind.config.js          # Tailwind dark mode, fonts, content paths
│   ├── postcss.config.js           # PostCSS + Autoprefixer
│   └── src/
│       ├── main.jsx                # React DOM root
│       ├── App.jsx                 # Main app orchestrator (state, API calls, layout)
│       ├── index.css               # Tailwind directives
│       ├── components/
│       │   ├── Header.jsx          # Brand title + dark/light theme toggle
│       │   ├── PostingInput.jsx    # Textarea, sample loaders, char count, verify button
│       │   ├── VerdictBanner.jsx   # Risk score gauge + verdict badge + summary
│       │   ├── ScoreGauge.jsx      # Animated circular SVG risk score (0–100)
│       │   ├── EntitiesGrid.jsx    # Extracted company, title, recruiter, domain cards
│       │   ├── EvidenceTable.jsx   # Signal-by-signal breakdown with score deltas & links
│       │   └── Footer.jsx          # Attribution footer
│       ├── services/
│       │   └── api.js              # API client for FastAPI /check endpoint
│       └── constants/
│           └── samples.js          # Scam (Apex Global) & legit (Stripe) test fixtures
│
├── tests/                          # Backend tests (pytest)
│   ├── test_scoring.py             # Unit tests on scoring formula
│   ├── test_extraction.py          # Regex fallback extraction tests
│   ├── test_functional.py          # Functional end-to-end tests
│   ├── test_serpapi.py             # SerpApi connectivity test
│   └── fixtures/
│       ├── scam_posting.txt        # Sample scam posting fixture
│       └── legit_posting.txt       # Sample legit posting fixture
│
├── demo/
│   └── script.md                   # Demo video script
├── .env.example                    # Environment variable template
├── .gitignore
├── requirements.txt                # Python dependencies
└── README.md
```

## Setup

### 1. Clone & Configure

```bash
git clone <repo-url>
cd fake-recruiter-verifier
cp .env.example .env
```

Open `.env` and add your API key:

```env
SERPAPI_KEY=your_actual_serpapi_key_here
```

> Get a free key with 100 searches/month at [serpapi.com](https://serpapi.com)

### 2. Start the Backend (FastAPI)

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.
Visit `http://127.0.0.1:8000/docs` for the interactive Swagger UI.

```bash
curl -X POST http://127.0.0.1:8000/check \
  -H "Content-Type: application/json" \
  -d '{"raw_text": "<paste job posting text here>"}'
```

### 3. Start the Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser. The React app communicates with the FastAPI backend on port 8000.

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

## Tech Stack

| Layer    | Technology                                       |
|----------|--------------------------------------------------|
| Backend  | Python, FastAPI, Pydantic, httpx, SQLite         |
| Frontend | React 18, Vite, Tailwind CSS, Lucide React       |
| APIs     | SerpApi (Google, Google Maps, Google News)        |
| Optional | Anthropic Claude (enhanced field extraction)      |

## Notes

- `ANTHROPIC_API_KEY` is optional — used to extract structured fields
  (company name, recruiter, distinctive phrase) more reliably. Without it,
  a regex-based fallback is used.
- Queries are cached in a local SQLite file (`app_cache.db`) for 24h to avoid re-spending
  SerpApi credits on repeat checks during development/demo.
- When `SERPAPI_KEY` is not supplied, the backend runs in a demo simulation mode so that UI flows and mock signals can be tested immediately.