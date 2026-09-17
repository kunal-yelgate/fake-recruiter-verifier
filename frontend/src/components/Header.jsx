import React from "react";
import { ShieldCheck, Sun, Moon } from "lucide-react";

export default function Header({ isDark, onToggleTheme }) {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3 text-center sm:text-left">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-inner">
          <ShieldCheck className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Job Scam Verifier
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Live search corroboration backed by SerpApi evidence
          </p>
        </div>
      </div>

      <button
        onClick={onToggleTheme}
        type="button"
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors shadow-sm cursor-pointer"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <>
            <Sun className="w-4 h-4 text-amber-400" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="w-4 h-4 text-slate-600" />
            <span>Dark Mode</span>
          </>
        )}
      </button>
    </header>
  );
}
