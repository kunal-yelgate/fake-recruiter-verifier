import React from "react";
import { AlertTriangle, Globe } from "lucide-react";

export function DomainMismatchAlert({ claimedDomain, contactEmail }) {
  const isFreeWebmail =
    claimedDomain &&
    ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "proton.me", "aol.com"].includes(
      claimedDomain.toLowerCase()
    );

  if (!isFreeWebmail && !claimedDomain) return null;

  if (isFreeWebmail) {
    return (
      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-200 text-xs flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Critical Impersonation Indicator:</span> Recruiter uses a free webmail address (
          <code className="font-mono font-bold bg-rose-500/20 px-1.5 py-0.5 rounded text-rose-900 dark:text-rose-100">
            {contactEmail || `@${claimedDomain}`}
          </code>
          ). Legitimate corporate talent teams strictly communicate through their verified corporate email domains.
        </div>
      </div>
    );
  }

  return null;
}
