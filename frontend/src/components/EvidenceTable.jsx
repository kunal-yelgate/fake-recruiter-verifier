import React from "react";
import { ExternalLink, Search } from "lucide-react";

export default function EvidenceTable({ signals }) {
  if (!signals || signals.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm transition-colors">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Live Search Evidence Breakdown
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Every score adjustment links directly to the real-world search query that verified or flagged it.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold uppercase text-[11px] tracking-wider">
              <th className="py-3 px-4 w-[28%]">Signal & Engine</th>
              <th className="py-3 px-4 w-[14%] text-center">Score Delta</th>
              <th className="py-3 px-4 w-[18%] text-center">Status</th>
              <th className="py-3 px-4 w-[40%]">Finding & Direct Evidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 font-sans">
            {signals.map((sig, idx) => {
              const delta = sig.score_delta;
              const isPlus = delta > 0;
              const isMinus = delta < 0;

              const status = sig.status;
              const isPass = status === "pass";
              const isFail = status === "fail";

              const statusBadgeStyle = isPass
                ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30"
                : isFail
                ? "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/30"
                : "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30";

              const statusText = isPass
                ? "PASS (Legit)"
                : isFail
                ? "FAIL (Scam)"
                : "INCONCLUSIVE";

              const deltaBadgeStyle = isPlus
                ? "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/30"
                : isMinus
                ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700";

              const deltaText = isPlus
                ? `+${delta} pts`
                : `${delta} pts`;

              const linkUrl = sig.evidence_url || sig.search_url;
              const isEvidence = Boolean(sig.evidence_url);

              return (
                <tr
                  key={idx}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors duration-150"
                >
                  <td className="py-3.5 px-4 align-top">
                    <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                      {sig.signal_name}
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      ⚙️ {sig.engine}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 align-top text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-xs font-mono font-semibold border ${deltaBadgeStyle}`}
                    >
                      {deltaText}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 align-top text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wide border ${statusBadgeStyle}`}
                    >
                      {statusText}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 align-top">
                    <div className="text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
                      {sig.finding}
                    </div>

                    {linkUrl && (
                      <a
                        href={linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
                      >
                        {isEvidence ? (
                          <>
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>View Direct Evidence / Result →</span>
                          </>
                        ) : (
                          <>
                            <Search className="w-3.5 h-3.5" />
                            <span>View Live Search Query →</span>
                          </>
                        )}
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
