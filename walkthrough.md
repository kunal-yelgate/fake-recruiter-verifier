# Walkthrough: React + Vite + Tailwind CSS Frontend Migration

The frontend in [`frontend/`](file:///c:/Users/yelga/Pictures/fake-recruiter-verifier/frontend) has been migrated from vanilla HTML/JS/CSS to a clean, modular **React 18** application powered by **Vite** and **Tailwind CSS**.

## Summary of Changes

1. **Clean Modular Architecture**:
   - **Entrypoint**: [`frontend/index.html`](file:///c:/Users/yelga/Pictures/fake-recruiter-verifier/frontend/index.html) mounts the React root [`frontend/src/main.jsx`](file:///c:/Users/yelga/Pictures/fake-recruiter-verifier/frontend/src/main.jsx).
   - **Vite & Tailwind Config**: Configured [`frontend/vite.config.js`](file:///c:/Users/yelga/Pictures/fake-recruiter-verifier/frontend/vite.config.js), [`frontend/tailwind.config.js`](file:///c:/Users/yelga/Pictures/fake-recruiter-verifier/frontend/tailwind.config.js), and [`frontend/postcss.config.js`](file:///c:/Users/yelga/Pictures/fake-recruiter-verifier/frontend/postcss.config.js).
   - **Styling**: [`frontend/src/index.css`](file:///c:/Users/yelga/Pictures/fake-recruiter-verifier/frontend/src/index.css) with Tailwind directives and font definitions.

2. **Components**:
   - [`Header.jsx`](file:///c:/Users/yelga/Pictures/fake-recruiter-verifier/frontend/src/components/Header.jsx): App title, subtitle, shield icon, and responsive dark/light mode toggle.
   - [`PostingInput.jsx`](file:///c:/Users/yelga/Pictures/fake-recruiter-verifier/frontend/src/components/PostingInput.jsx): Textarea with live character counter, quick sample buttons ("Load Scam Sample", "Load Legit Sample", "Clear"), and verification submit button with spinner.
   - [`ScoreGauge.jsx`](file:///c:/Users/yelga/Pictures/fake-recruiter-verifier/frontend/src/components/ScoreGauge.jsx): Animated circular SVG risk score gauge (0–100) dynamically colored by verdict (green for pass/legit, red for scam/fail, amber for inconclusive).
   - [`VerdictBanner.jsx`](file:///c:/Users/yelga/Pictures/fake-recruiter-verifier/frontend/src/components/VerdictBanner.jsx): Top verdict summary banner displaying the risk gauge, verdict title, status badges, and demo/mock mode notice.
   - [`EntitiesGrid.jsx`](file:///c:/Users/yelga/Pictures/fake-recruiter-verifier/frontend/src/components/EntitiesGrid.jsx): 4-card grid displaying extracted company, job title, recruiter, and domain/email.
   - [`EvidenceTable.jsx`](file:///c:/Users/yelga/Pictures/fake-recruiter-verifier/frontend/src/components/EvidenceTable.jsx): Evidence breakdown table with signal names, engine tags, score deltas (`+` / `-`), status badges, finding text, and clickable search query/evidence links.
   - [`Footer.jsx`](file:///c:/Users/yelga/Pictures/fake-recruiter-verifier/frontend/src/components/Footer.jsx): Attribution and score formula footer.

3. **Services & Fixtures**:
   - [`api.js`](file:///c:/Users/yelga/Pictures/fake-recruiter-verifier/frontend/src/services/api.js): Service communicating with FastAPI `/check` endpoint.
   - [`samples.js`](file:///c:/Users/yelga/Pictures/fake-recruiter-verifier/frontend/src/constants/samples.js): Fixtures for Apex Global (scam) and Stripe (legitimate).

4. **Removed Legacy Vanilla Files**:
   - Removed `frontend/app.js` and `frontend/styles.css`.

---

## How to Run

### Development Mode
In the terminal, run:
```bash
cd frontend
npm run dev
```
Open `http://localhost:5173` in your browser.

### Production Build
```bash
cd frontend
npm run build
```
The production bundle builds to `frontend/dist/`.
