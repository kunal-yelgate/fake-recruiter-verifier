import React from "react";
import { Building2, Briefcase, UserCheck, Globe } from "lucide-react";

export default function EntitiesGrid({ extractedFields }) {
  if (!extractedFields) return null;

  const entities = [
    {
      label: "Company",
      value: extractedFields.company_name || "Not specified",
      icon: Building2,
    },
    {
      label: "Job Title",
      value: extractedFields.job_title || "Not specified",
      icon: Briefcase,
    },
    {
      label: "Recruiter",
      value: extractedFields.recruiter_name || "None listed",
      icon: UserCheck,
    },
    {
      label: "Claimed Domain / Email",
      value:
        extractedFields.contact_email ||
        extractedFields.claimed_domain ||
        "None listed",
      icon: Globe,
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm transition-colors">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
        Extracted Entities
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {entities.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium mb-2">
                <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>{item.label}</span>
              </div>
              <div
                className="text-sm font-semibold text-slate-900 dark:text-slate-200 truncate"
                title={item.value}
              >
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
