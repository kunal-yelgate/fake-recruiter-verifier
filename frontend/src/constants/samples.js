export const PRESET_CATEGORIES = [
  {
    id: "scam_check",
    title: "Fake Check & Equipment Scam",
    company: "Apex Global Staffing",
    role: "Remote Data Entry Clerk",
    badge: "danger",
    badgeLabel: "High Risk Phishing",
    description: "Requests check deposit for home office equipment with personal Gmail address.",
    text: `Job Title: Remote Data Entry Clerk / Administrative Assistant
Company: Apex Global Staffing Solutions
Location: Remote (US & Canada Only)
Salary: $45.00 - $55.00 per hour, paid weekly via direct deposit or wire transfer.

About the Role:
Apex Global Staffing is seeking dependable, detail-oriented individuals for immediate full-time and part-time Data Entry positions.

Responsibilities:
- Accurately input customer data, receipts, and order logs into our internal tracking software.
- Review spreadsheets for discrepancies and format weekly summary reports.
- Maintain strict confidentiality regarding company records and candidate information.

Requirements:
- High school diploma or equivalent.
- Basic familiarity with Microsoft Excel, Google Sheets, or similar office tools.
- Fast and accurate typing speed (minimum 40 WPM).
- Reliable high-speed internet connection and quiet home workspace.

Equipment & Onboarding:
Upon successful completion of the initial questionnaire, our accounting department will issue a check of $3,850.00 to cover the purchase of your home office setup, including an Apple MacBook Pro, encrypted time-tracking software, and a laser printer from our certified vendor.

How to Apply:
Please send your updated resume directly to our Senior Hiring Coordinator, Marcus Vance, at marcus.vance.careers@gmail.com with the subject line "DATA ENTRY APPLICANT". Interviews will be conducted immediately via Telegram messenger.`
  },
  {
    id: "scam_lookalike",
    title: "Lookalike Domain & Executive Impersonation",
    company: "Korn Ferry Careers (Lookalike)",
    role: "VP of Product Strategy",
    badge: "danger",
    badgeLabel: "Domain Spoof",
    description: "Impersonates executive recruiter using lookalike domain 'kornferry-talents.net'.",
    text: `CONFIDENTIAL EXECUTIVE SEARCH INQUIRY

Position: Vice President of Product Strategy & Innovation
Client: Global Fortune 500 Fintech Infrastructure
Target Compensation: $280,000 - $340,000 Base + Equity + Signing Bonus
Location: Remote / Flexible US Hubs

Dear Candidate,

I am reaching out on behalf of Korn Ferry Executive Search. Based on your public technical leadership background, our recruitment committee has selected your profile as a premier candidate for our confidential client's VP of Product Strategy role.

The mandate involves spearheading next-generation payment rails and cross-border settlement architectures across North American and European markets.

To proceed with our private executive briefing and NDA exchange:
1. Review the initial role charter at http://kornferry-talents.net/mandate-9812
2. Reply directly to this email with your updated CV and direct mobile phone number.
3. Our lead executive partner, Sarah Jenkins (Managing Director - Global Technology Practice), will arrange an introductory briefing.

Best regards,

Sarah Jenkins
Managing Director | Global Technology Practice
Korn Ferry Executive Search
Direct: sarah.jenkins@kornferry-talents.net
Web: https://kornferry-talents.net`
  },
  {
    id: "scam_telegram",
    title: "Telegram Chat / Instant Crypto Payout",
    company: "CloudVantage Logistics",
    role: "Customer Support Rep",
    badge: "warning",
    badgeLabel: "Suspicious Channel",
    description: "Instant hiring without video interview; asks for Telegram handle & crypto wallet.",
    text: `URGENT OPENING: REMOTE CUSTOMER SUPPORT SPECIALIST
Company: CloudVantage Logistics International
Pay Rate: $65.00/hour (Paid daily in USDT or Direct Wire)
Work Schedule: Flexible 4 hours/day

No prior customer service experience required! We provide full paid online training.
You will assist international clients by answering chat inquiries and forwarding shipment tracking updates.

Requirements:
- Age 18+
- Active Telegram or WhatsApp account
- Smartphone or laptop

To claim your position immediately, connect with our HR Manager @CloudVantage_HR on Telegram right now. Only 3 slots available for this week's cohort!`
  },
  {
    id: "legit_stripe",
    title: "Verified Enterprise (Stripe)",
    company: "Stripe",
    role: "Senior Software Engineer, Core Infrastructure",
    badge: "success",
    badgeLabel: "Verified Corporate",
    description: "Authentic tech posting with official domain, verifiable footprint, and clear hiring steps.",
    text: `Job Title: Senior Software Engineer, Core Infrastructure
Company: Stripe, Inc.
Location: San Francisco, CA / Seattle, WA / Remote (US)
Compensation: $195,000 - $265,000 Base + Equity + Comprehensive Benefits

About Stripe:
Stripe is a financial infrastructure platform for businesses. Millions of companies—from the world’s largest enterprises to the most ambitious startups—use Stripe to accept payments, grow their revenue, and accelerate new business opportunities.

About the Role:
We are looking for experienced Infrastructure Engineers to build the distributed foundations that power trillions of dollars in global transactions. You will design, scale, and maintain our multi-region Kubernetes clusters, low-latency datastores, and telemetry pipelines with 99.999% availability requirements.

Responsibilities:
- Architect high-throughput distributed systems capable of scaling with Stripe's exponential transaction growth.
- Partner with security and reliability engineers to harden infrastructure primitives against critical network partitions.
- Mentor engineers across the organization and establish best practices for cloud infrastructure reliability.

Requirements:
- 5+ years of software engineering experience in distributed systems (Go, Java, Rust, or C++).
- Deep knowledge of operating distributed systems at scale (Kubernetes, AWS, Envoy, Raft/Paxos algorithms).
- Passion for developer velocity, automated testing, and zero-downtime deployments.

How to Apply:
Submit your application through the Stripe Careers portal at https://stripe.com/jobs/infrastructure-senior-swe or contact talent@stripe.com.`
  },
  {
    id: "legit_google",
    title: "Verified Global Tech (Google)",
    company: "Google",
    role: "Staff Product Manager, Cloud AI Security",
    badge: "success",
    badgeLabel: "Verified Corporate",
    description: "Authentic Google Cloud role with mountain view headquarters and verified domain.",
    text: `Role: Staff Product Manager, Cloud AI & Enterprise Security
Company: Google LLC
Location: Mountain View, CA / New York, NY / Remote Eligible
Salary Range: $210,000 - $315,000 + Bonus + Equity + Benefits

Overview:
Google Cloud helps organizations innovate faster and build securely. As a Staff Product Manager in Cloud AI Security, you will lead the strategy and product execution for automated threat detection and model safety governance.

Key Responsibilities:
- Define the product roadmap for AI-driven security operations and zero-trust identity verification.
- Collaborate with DeepMind researchers and Google Cloud security architects to productize cutting-edge model evaluation tools.
- Engage directly with Fortune 500 enterprise CISOs to identify compliance bottlenecks and deliver high-impact security solutions.

Minimum Qualifications:
- Bachelor's degree in Computer Science, Electrical Engineering, or equivalent practical experience.
- 8+ years of product management experience delivering enterprise security or cloud software.

Preferred Qualifications:
- Demonstrated experience building ML/AI security products at hyperscale.
- Excellent executive communication and cross-functional leadership skills.

Apply via Google Careers: https://careers.google.com/jobs/results/98312019-staff-product-manager-cloud-ai`
  }
];

export const SAMPLES = {
  scam: PRESET_CATEGORIES[0].text,
  legit: PRESET_CATEGORIES[3].text,
};
