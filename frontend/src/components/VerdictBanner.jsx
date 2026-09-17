import React from "react";
import ScoreGauge from "./ScoreGauge";
import { Info, AlertOctagon, CheckCircle2, AlertTriangle } from "lucide-react";

export default function VerdictBanner({
  score,
  verdict,
  verdictBadge,
  summary,
  isMock,
}) {
  const isPass = verdictBadge === "pass" || score < 40;
  const isFail = verdictBadge === "fail" || score >= 70;

  const containerTheme = isPass
    ? "bg-emerald-950/30 border-emerald-500/30"
    : isFail
    ? "bg-rose-950/30 border-rose-500/30"
    : "bg-amber-950/30 border-amber-500/30";

  const badgeTheme = isPass
    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
    : isFail
    ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
    : "bg-amber-500/20 text-amber-300 border-amber-500/40";

  const Icon = isPass ? CheckCircle2 : isFail ? AlertOctagon : AlertTriangle;

  return (
    <div
      className={`rounded-2xl border p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl backdrop-blur-sm ${containerTheme}`}
    >
      <div className="flex-shrink-0">
        <ScoreGauge score={score} verdictBadge={verdictBadge} />
      </div>

      <div className="flex-1 text-center md:text-left">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1.5">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${badgeTheme}`}
          >
            <Icon className="w-3.5 h-3.5" />
            {verdict}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white tracking-tight mt-1">
          {verdict}
        </h3>

        <p className="text-sm text-slate-300 mt-2 leading-relaxed max-w-3xl">
          {summary}
        </p>

        {isMock && (
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-amber-400/90 bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20">
            <Info className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Demo Mode: Simulating search signals (add SERPAPI_KEY in .env for live API queries)</span>
          </div>
        )}
      </div>
    </div>
  );
}
