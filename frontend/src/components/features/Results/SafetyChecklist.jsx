import React from "react";
import { ShieldCheck, AlertOctagon, CheckSquare, ExternalLink } from "lucide-react";
import { Card } from "../../ui/Card";

export function SafetyChecklist({ score, isFail, isPass }) {
  const scamChecklist = [
    {
      title: "Never deposit an upfront check for home equipment",
      desc: "Fake check scams provide a high-value check, instruct you to buy from a 'certified vendor', then the check bounces days later.",
    },
    {
      title: "Refuse interviews conducted solely on Telegram or WhatsApp",
      desc: "Legitimate corporate recruiters conduct scheduled video interviews on Google Meet, Teams, or Zoom.",
    },
    {
      title: "Verify the job listing on the company's official career portal",
      desc: "Authentic positions will almost always appear on their primary website (e.g. company.com/careers).",
    },
    {
      title: "Report fraudulent recruiters to federal cybercrime bureaus",
      desc: "File a complaint with the FTC (ReportFraud.ftc.gov) or the FBI Internet Crime Complaint Center (IC3.gov).",
    },
  ];

  const legitChecklist = [
    {
      title: "Confirm application on official company career domain",
      desc: "Submit your resume through the verified applicant tracking system (Greenhouse, Lever, Workday).",
    },
    {
      title: "Protect sensitive PII until formal offer is signed",
      desc: "Never disclose Social Security Numbers or banking details before an official written job offer.",
    },
    {
      title: "Double-check recruiter email domain headers",
      desc: "Ensure correspondence originates directly from @company.com and not a subtle lookalike domain.",
    },
  ];

  const list = isFail ? scamChecklist : legitChecklist;

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          {isFail ? (
            <AlertOctagon className="w-4 h-4 text-rose-500" />
          ) : (
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          )}
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            {isFail ? "Mandatory Candidate Security Advisory" : "Best Practices for Candidate Safety"}
          </h4>
        </div>
      </div>

      <div className="space-y-3">
        {list.map((item, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-start gap-3"
          >
            <CheckSquare
              className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                isFail ? "text-rose-500" : "text-emerald-500"
              }`}
            />
            <div>
              <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                {item.title}
              </h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isFail && (
        <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
          <a
            href="https://reportfraud.ftc.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-rose-600 dark:text-rose-400 hover:underline"
          >
            <span>Report to FTC Fraud Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span>•</span>
          <a
            href="https://www.ic3.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-rose-600 dark:text-rose-400 hover:underline"
          >
            <span>File FBI IC3 Complaint</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </Card>
  );
}
