"""Dedicated backend runner script. Allows launching the server from within the backend directory or project root."""

import os
import sys
from pathlib import Path

# Add project root to sys.path so 'app' module is always importable
ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

import uvicorn
from app.config import settings

if __name__ == "__main__":
    print(f"[*] Starting Fake Recruiter Verifier API on http://{settings.host}:{settings.port}")
    uvicorn.run("app.main:app", host=settings.host, port=settings.port, reload=settings.debug)
