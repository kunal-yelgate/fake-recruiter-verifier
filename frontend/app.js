/**
 * Job Scam Verifier - Frontend Application Logic
 * Interacts with FastAPI backend at /check and renders evidence breakdown
 */

// Configuration: backend endpoint (fallback to localhost:8000 if not served from same origin)
const API_BASE_URL = window.location.port === "8000" 
  ? "" 
  : "http://127.0.0.1:8000";

// Fixture samples for instant 1-click testing
const SAMPLES = {
  scam: `URGENT HIRING: Remote Data Entry Specialist & Executive Administrative Assistant

Company: Apex Global Staffing Solutions
Hiring Manager: Marcus Vance
Contact Email: marcus.vance.careers@gmail.com
Domain: apexglobal-staffing.org
Job Title: Remote Data Entry Clerk

About Us:
Apex Global Staffing Solutions is looking for self-motivated individuals to fill our immediate home-based openings. We provide weekly payouts and flexible working hours.

Compensation:
$45.00 - $55.00 per hour, paid weekly via direct deposit or wire transfer.

Requirements:
- Must have a reliable home computer and internet access.
- Candidate must be available for quick online orientation via Telegram (@HR_MarcusVance).
- You will receive an upfront check deposit of $3,850 to purchase required home-office hardware and specialized software from our certified supplier.

To proceed:
Please send your full name, phone number, and resume to marcus.vance.careers@gmail.com or contact Mr. Marcus Vance on Telegram immediately.`,

  legit: `Software Engineer, Infrastructure Platform

Company: Stripe, Inc.
Job Title: Software Engineer, Infrastructure Platform
Location: Seattle, WA / San Francisco, CA / Remote (US)
Contact Email: talent@stripe.com
Careers Portal: https://stripe.com/jobs

About Stripe:
Stripe is a financial infrastructure platform for businesses. Millions of companies—from the world’s largest enterprises to the most ambitious startups—use Stripe to accept payments, grow their revenue, and accelerate new business opportunities.

About the Role:
We are looking for an experienced software engineer to join our core Infrastructure Platform engineering team. You will design, build, and maintain the underlying compute, deployment pipeline, and observability foundation powering billions of transactions globally.

Responsibilities:
- Build reliable, performant, and scalable distributed systems using Go, Ruby, and Kubernetes.
- Collaborate across multidisciplinary teams including security, database reliability, and application developers.

Stripe provides competitive base pay, equity grant awards, comprehensive health benefits, and flexible time off.
To apply, submit your application directly through our careers portal at https://stripe.com/jobs or contact talent@stripe.com.`
};

// DOM Elements
const postingInput = document.getElementById("postingInput");
const charCount = document.getElementById("charCount");
const verifyBtn = document.getElementById("verifyBtn");
const loadScamBtn = document.getElementById("loadScamBtn");
const loadLegitBtn = document.getElementById("loadLegitBtn");
const clearBtn = document.getElementById("clearBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");

const loadingState = document.getElementById("loadingState");
const resultsDashboard = document.getElementById("resultsDashboard");
const scoreCircle = document.getElementById("scoreCircle");
const scoreNum = document.getElementById("scoreNum");
const verdictBadge = document.getElementById("verdictBadge");
const verdictTitle = document.getElementById("verdictTitle");
const verdictSummary = document.getElementById("verdictSummary");
const verdictBanner = document.getElementById("verdictBanner");
const mockAlert = document.getElementById("mockAlert");

const entityCompany = document.getElementById("entityCompany");
const entityTitle = document.getElementById("entityTitle");
const entityRecruiter = document.getElementById("entityRecruiter");
const entityDomain = document.getElementById("entityDomain");
const signalsTableBody = document.getElementById("signalsTableBody");

// Initialize theme from storage
function initTheme() {
  const saved = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeUI(saved);
}

function updateThemeUI(theme) {
  if (theme === "light") {
    themeIcon.textContent = "🌙";
    themeLabel.textContent = "Dark";
  } else {
    themeIcon.textContent = "☀️";
    themeLabel.textContent = "Light";
  }
}

themeToggleBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeUI(next);
});

// Character Counter
postingInput.addEventListener("input", () => {
  const len = postingInput.value.trim().length;
  charCount.textContent = `${len.toLocaleString()} characters`;
});

// Sample Loaders
loadScamBtn.addEventListener("click", () => {
  postingInput.value = SAMPLES.scam;
  postingInput.dispatchEvent(new Event("input"));
});

loadLegitBtn.addEventListener("click", () => {
  postingInput.value = SAMPLES.legit;
  postingInput.dispatchEvent(new Event("input"));
});

clearBtn.addEventListener("click", () => {
  postingInput.value = "";
  postingInput.dispatchEvent(new Event("input"));
  resultsDashboard.style.display = "none";
});

// Verification Submission
verifyBtn.addEventListener("click", async () => {
  const text = postingInput.value.trim();
  if (text.length < 15) {
    alert("Please enter a longer job posting or recruiter message (minimum 15 characters).");
    return;
  }

  // Toggle loading state
  verifyBtn.disabled = true;
  loadingState.style.display = "block";
  resultsDashboard.style.display = "none";

  try {
    const response = await fetch(`${API_BASE_URL}/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ raw_text: text }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || `Server returned ${response.status}`);
    }

    const data = await response.json();
    renderResults(data);
  } catch (error) {
    console.error("Verification failed:", error);
    alert(
      `Could not reach backend API at ${API_BASE_URL}.\n\nPlease ensure your FastAPI server is running with:\n  uvicorn app.main:app --reload\n\nError: ${error.message}`
    );
  } finally {
    verifyBtn.disabled = false;
    loadingState.style.display = "none";
  }
});

// Render Results to UI
function renderResults(data) {
  const { risk_score, verdict, verdict_badge, extracted_fields, signals, summary, is_mock } = data;

  // 1. Verdict & Score Banner
  animateScore(risk_score);
  verdictTitle.textContent = verdict;
  verdictBadge.textContent = verdict;
  verdictBadge.className = `verdict-badge ${verdict_badge}`;
  verdictBanner.className = `verdict-header ${verdict_badge}`;
  scoreCircle.className = `score-circle ${verdict_badge}`;
  verdictSummary.textContent = summary;

  if (is_mock) {
    mockAlert.style.display = "block";
  } else {
    mockAlert.style.display = "none";
  }

  // 2. Extracted Entities Pills
  entityCompany.textContent = extracted_fields.company_name || "Not specified";
  entityTitle.textContent = extracted_fields.job_title || "Not specified";
  entityRecruiter.textContent = extracted_fields.recruiter_name || "None listed";
  entityDomain.textContent = extracted_fields.contact_email || extracted_fields.claimed_domain || "None listed";

  // 3. Evidence Table Rows
  signalsTableBody.innerHTML = "";

  signals.forEach((sig) => {
    const row = document.createElement("tr");

    // Delta formatting
    let deltaClass = "zero";
    let deltaText = `${sig.score_delta} pts`;
    if (sig.score_delta > 0) {
      deltaClass = "plus";
      deltaText = `+${sig.score_delta} pts`;
    } else if (sig.score_delta < 0) {
      deltaClass = "minus";
    }

    // Status badge
    const statusBadgeClass = sig.status === "pass" 
      ? "success" 
      : sig.status === "fail" 
      ? "danger" 
      : "warning";

    const statusLabel = sig.status === "pass" 
      ? "PASS (Legit)" 
      : sig.status === "fail" 
      ? "FAIL (Scam)" 
      : "INCONCLUSIVE";

    // Evidence link
    let linkHtml = "";
    if (sig.evidence_url) {
      linkHtml = `
        <div>
          <a href="${escapeHtml(sig.evidence_url)}" target="_blank" rel="noopener noreferrer" class="evidence-link">
            🔗 View Direct Evidence / Result →
          </a>
        </div>
      `;
    } else if (sig.search_url) {
      linkHtml = `
        <div>
          <a href="${escapeHtml(sig.search_url)}" target="_blank" rel="noopener noreferrer" class="evidence-link">
            🔍 View Live Search Query →
          </a>
        </div>
      `;
    }

    row.innerHTML = `
      <td>
        <strong style="display: block; margin-bottom: 4px;">${escapeHtml(sig.signal_name)}</strong>
        <span class="engine-tag">⚙️ ${escapeHtml(sig.engine)}</span>
      </td>
      <td>
        <span class="delta-tag ${deltaClass}">${deltaText}</span>
      </td>
      <td>
        <span class="verdict-badge ${statusBadgeClass}">${statusLabel}</span>
      </td>
      <td>
        <div>${escapeHtml(sig.finding)}</div>
        ${linkHtml}
      </td>
    `;

    signalsTableBody.appendChild(row);
  });

  resultsDashboard.style.display = "block";
  resultsDashboard.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Smooth Number Counter
function animateScore(target) {
  let current = 0;
  scoreNum.textContent = "0";
  const step = Math.max(1, Math.floor(target / 25));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    scoreNum.textContent = current;
  }, 20);
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Initialize on page load
initTheme();
