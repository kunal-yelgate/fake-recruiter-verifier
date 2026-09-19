# Fake Recruiter Verifier - Backend Service

FastAPI-powered asynchronous verification service backed by SerpApi live search intelligence and SQLite caching.

## Quick Start

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Run the development server
python run.py
# Or with uvicorn directly:
uvicorn app.main:app --reload --port 8000
```

## API Documentation
- Interactive Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc UI: `http://127.0.0.1:8000/redoc`
