import React from "react";
import { AlertTriangle, ShieldCheck, Sparkles } from "lucide-react";
import { PRESET_CATEGORIES } from "../../../constants/samples";

export function PresetSelector({ onSelectPreset, activeText }) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Quick Scenario Presets</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {PRESET_CATEGORIES.map((preset) => {
          const isDanger = preset.badge === "danger";
          const isWarning = preset.badge === "warning";
          const isSuccess = preset.badge === "success";

          const borderStyle = isDanger
            ? "hover:border-rose-500/50 hover:bg-rose-500/5"
            : isWarning
            ? "hover:border-amber-500/50 hover:bg-amber-500/5"
            : "hover:border-emerald-500/50 hover:bg-emerald-500/5";

          const badgeBg = isDanger
            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
            : isWarning
            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset.text)}
              className={`p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-left transition-all duration-200 ${borderStyle} cursor-pointer group flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeBg}`}
                  >
                    {isDanger || isWarning ? (
                      <AlertTriangle className="w-2.5 h-2.5" />
                    ) : (
                      <ShieldCheck className="w-2.5 h-2.5" />
                    )}
                    {preset.badgeLabel}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                  {preset.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {preset.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
