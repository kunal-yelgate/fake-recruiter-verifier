import React, { useState } from "react";
import { ExternalLink, Search, ChevronDown, ChevronUp } from "lucide-react";
import { SIGNAL_METADATA } from "../../../constants/signalDefinitions";

export function SignalRow({ signal }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const delta = signal.score_delta;
  const isPlus = delta > 0;
  const isMinus = delta < 0;

  const status = signal.status;
  const isPass = status === "pass";
  const isFail = status === "fail";

  const meta = SIGNAL_METADATA[signal.signal_key] || {};
  const Icon = meta.icon;

  const statusBadgeStyle = isPass
    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
    : isFail
    ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";

  const statusText = isPass ? "AUTHENTIC" : isFail ? "THREAT DETECTED" : "INCONCLUSIVE";

  const deltaBadgeStyle = isPlus
    ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
    : isMinus
    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700";

  const deltaText = isPlus ? `+${delta} pts` : `${delta} pts`;
  const linkUrl = signal.evidence_url || signal.search_url;
  const isEvidence = Boolean(signal.evidence_url);

  return (
    <>
      <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors duration-150 border-b border-slate-200 dark:border-slate-800/60">
        {/* Signal & Engine */}
        <td className="py-4 px-4 align-top">
          <div className="flex items-start gap-2.5">
            {Icon && (
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mt-0.5 flex-shrink-0">
                <Icon className="w-3.5 h-3.5" />
              </div>
            )}
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                {signal.signal_name}
              </div>
              <div className="flex items-center gap-1.5 mt-1 font-mono text-[10px] text-slate-500 dark:text-slate-400">
                <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                  ⚙️ {signal.engine}
                </span>
              </div>
            </div>
          </div>
        </td>

        {/* Score Delta */}
        <td className="py-4 px-4 align-top text-center">
          <span
            className={`inline-block px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${deltaBadgeStyle}`}
          >
            {deltaText}
          </span>
        </td>

        {/* Status */}
        <td className="py-4 px-4 align-top text-center">
          <span
            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusBadgeStyle}`}
          >
            {statusText}
          </span>
        </td>

        {/* Finding & Link */}
        <td className="py-4 px-4 align-top">
          <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans mb-2">
            {signal.finding}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {linkUrl && (
              <a
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
              >
                {isEvidence ? (
                  <>
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Direct Evidence Proof →</span>
                  </>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    <span>View Live Search Query →</span>
                  </>
                )}
              </a>
            )}

            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
            >
              <span>{isExpanded ? "Hide Details" : "Inspect Raw Query"}</span>
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </td>
      </tr>

      {/* Expandable Raw Query Drawer */}
      {isExpanded && (
        <tr className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800/80">
          <td colSpan={4} className="p-4">
            <div className="space-y-2 text-xs font-mono">
              <div className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                Raw OSINT Query Parameters & Context
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 break-all">
                <span className="text-indigo-400 font-bold">Query:</span> {signal.query_used || "N/A"}
              </div>
              {meta.description && (
                <div className="text-slate-500 dark:text-slate-400 text-[11px] font-sans">
                  <span className="font-bold">Evaluation Rationale:</span> {meta.description}
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
