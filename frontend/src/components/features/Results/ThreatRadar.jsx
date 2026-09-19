import React from "react";
import { ShieldCheck, ShieldAlert, AlertTriangle, Activity } from "lucide-react";
import { Card } from "../../ui/Card";

export function ThreatRadar({ signals = [] }) {
  if (!signals || signals.length === 0) return null;

  const total = signals.length;
  const passed = signals.filter((s) => s.status === "pass").length;
  const failed = signals.filter((s) => s.status === "fail").length;
  const warnings = signals.filter((s) => s.status === "warning").length;

  const passPercent = Math.round((passed / total) * 100);
  const failPercent = Math.round((failed / total) * 100);
  const warnPercent = Math.round((warnings / total) * 100);

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-500" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Threat Vector Telemetry
          </h4>
        </div>
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
          6 Live OSINT Engines Queried
        </span>
      </div>

      {/* Multi-segment distribution bar */}
      <div className="space-y-2">
        <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
          <div
            style={{ width: `${failPercent}%` }}
            className="bg-rose-500 transition-all duration-700"
            title={`Failed (Scam Signals): ${failed}`}
          />
          <div
            style={{ width: `${warnPercent}%` }}
            className="bg-amber-500 transition-all duration-700"
            title={`Warnings / Inconclusive: ${warnings}`}
          />
          <div
            style={{ width: `${passPercent}%` }}
            className="bg-emerald-500 transition-all duration-700"
            title={`Verified Legitimate: ${passed}`}
          />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-2 text-center pt-2">
          <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <div className="flex items-center justify-center gap-1 text-rose-600 dark:text-rose-400 text-xs font-bold">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{failed} Failed</span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
              Scam Vectors
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400 text-xs font-bold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{warnings} Warnings</span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
              Inconclusive
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{passed} Verified</span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
              Authentic
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
