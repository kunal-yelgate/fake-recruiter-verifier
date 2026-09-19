import React from "react";
import { History, Trash2, X, ArrowRight, ShieldCheck, AlertOctagon, AlertTriangle } from "lucide-react";
import { Button } from "../../ui/Button";

export function ScanHistoryDrawer({
  isOpen,
  onClose,
  history = [],
  onSelectScan,
  onClearHistory,
  onRemoveScan,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-md h-full glass-panel-elevated shadow-2xl border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Forensic Scans
            </h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {history.length}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scan List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-6 space-y-2">
              <History className="w-10 h-10 text-slate-600 stroke-1" />
              <p className="text-sm font-medium">No previous scans recorded yet.</p>
              <p className="text-xs text-slate-500">
                Run any job posting verification to populate your local history.
              </p>
            </div>
          ) : (
            history.map((item) => {
              const score = item.result?.risk_score ?? 50;
              const isPass = score < 35;
              const isFail = score >= 65;

              const borderStyle = isFail
                ? "border-rose-500/30 hover:border-rose-500/60"
                : isPass
                ? "border-emerald-500/30 hover:border-emerald-500/60"
                : "border-amber-500/30 hover:border-amber-500/60";

              const scoreBg = isFail
                ? "bg-rose-500/10 text-rose-500"
                : isPass
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-amber-500/10 text-amber-500";

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border bg-slate-50/80 dark:bg-slate-900/60 transition-all ${borderStyle} group relative flex flex-col justify-between space-y-2`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                        {item.company}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {item.role}
                      </p>
                    </div>

                    <div className={`px-2 py-0.5 rounded-md font-mono text-xs font-bold ${scoreBg}`}>
                      {score}/100
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 font-mono line-clamp-2 italic">
                    "{item.snippet}"
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-[10px] text-slate-400 font-mono">
                    <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onRemoveScan(item.id)}
                        className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                        title="Delete scan"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onSelectScan(item);
                          onClose();
                        }}
                        className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                      >
                        <span>Replay</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer actions */}
        {history.length > 0 && (
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={onClearHistory}
              className="w-full text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border-rose-500/30"
              icon={Trash2}
            >
              Clear All Scan History
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
