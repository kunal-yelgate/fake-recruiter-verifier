import React from "react";
import { AlertTriangle, CheckCircle, ArrowRight, Loader2, RotateCcw } from "lucide-react";
import { SAMPLES } from "../constants/samples";

export default function PostingInput({
  text,
  setText,
  onVerify,
  isLoading,
  error,
}) {
  const charCount = text.trim().length;

  return (
    <section className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm transition-colors">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Paste Job Posting or Recruiter Message
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          We cross-check company footprint, LinkedIn legitimacy, lookalike domains, duplicate forum spam, and news reports in parallel.
        </p>
      </div>

      {/* Quick Samples */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-1">
          Quick Samples:
        </span>
        <button
          type="button"
          onClick={() => setText(SAMPLES.scam)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/20 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors cursor-pointer"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
          Load Scam Sample (Apex Global)
        </button>
        <button
          type="button"
          onClick={() => setText(SAMPLES.legit)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors cursor-pointer"
        >
          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
          Load Legit Sample (Stripe)
        </button>
        {text && (
          <button
            type="button"
            onClick={() => setText("")}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/60 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          rows={7}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the full job posting description, recruiter email, or message here... (e.g. Company name, email, compensation, requirements)"
          className="w-full rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800 p-4 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm leading-relaxed transition font-mono resize-y min-h-[140px]"
        />
      </div>

      {error && (
        <div className="mt-3 p-3 rounded-lg bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-500 dark:text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Action Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80">
        <span className="text-xs text-slate-500 dark:text-slate-400 order-2 sm:order-1 font-mono">
          {charCount.toLocaleString()} characters
        </span>

        <button
          type="button"
          onClick={onVerify}
          disabled={isLoading || charCount < 10}
          className="w-full sm:w-auto order-1 sm:order-2 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/25 disabled:shadow-none cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Verifying with Live SerpApi...</span>
            </>
          ) : (
            <>
              <span>Verify with Live SerpApi</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </section>
  );
}
