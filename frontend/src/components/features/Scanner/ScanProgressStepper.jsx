import React from "react";
import { CheckCircle2, Loader2, Radio } from "lucide-react";

export function ScanProgressStepper({ steps, activeIndex }) {
  return (
    <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 text-white shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Live OSINT Probe Pipeline Executing
          </span>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Probe {Math.min(activeIndex + 1, steps.length)} of {steps.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {steps.map((step, idx) => {
          const isDone = idx < activeIndex;
          const isCurrent = idx === activeIndex;

          let stateStyle = "bg-slate-950/60 border-slate-800/80 text-slate-500 opacity-60";
          if (isCurrent) {
            stateStyle =
              "bg-indigo-950/60 border-indigo-500/60 text-indigo-200 shadow-md shadow-indigo-500/20";
          } else if (isDone) {
            stateStyle = "bg-emerald-950/40 border-emerald-500/40 text-emerald-300";
          }

          return (
            <div
              key={step.id}
              className={`p-2.5 rounded-lg border text-xs flex items-center gap-2 transition-all duration-300 ${stateStyle}`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 animate-spin text-indigo-400 flex-shrink-0" />
              ) : (
                <Radio className="w-4 h-4 text-slate-600 flex-shrink-0" />
              )}
              <span className="font-medium truncate">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
