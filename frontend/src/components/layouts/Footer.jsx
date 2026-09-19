import React from "react";
import { ShieldCheck, Database, Search, Cpu } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 pt-8 pb-12 border-t border-slate-200 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Col 1 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
              <span>TrueRecruit AI OSINT Radar</span>
            </div>
            <p className="leading-relaxed">
              Automated multi-engine recruitment threat intelligence. Cross-referencing real-world company footprints, lookalike domains, LinkedIn profiles, and duplicate scam syndicates.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
              <Search className="w-4 h-4 text-violet-500" />
              <span>Active OSINT Engines</span>
            </div>
            <ul className="space-y-1 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
              <li>• Google Maps Physical Footprint</li>
              <li>• LinkedIn Corporate Authority</li>
              <li>• Google News Fraud & Enforcement Intel</li>
              <li>• Exact-Match Global Web Fingerprints</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
              <Database className="w-4 h-4 text-cyan-500" />
              <span>Privacy & Architecture</span>
            </div>
            <p className="leading-relaxed">
              Zero persistent candidate tracking. Queries are cached in local SQLite for 24 hours to prevent redundant API queries. Powered by transparent weighted heuristic scoring.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p>© {new Date().getFullYear()} TrueRecruit AI. Built for candidate protection & recruiter verification.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <Cpu className="w-3 h-3 text-indigo-400" /> Base 50 Heuristic Engine
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
