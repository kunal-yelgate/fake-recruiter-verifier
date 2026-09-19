import React, { useState, useMemo } from "react";
import { Search, Filter, ShieldCheck, AlertOctagon, AlertTriangle } from "lucide-react";
import { Card } from "../../ui/Card";
import { SignalRow } from "./SignalRow";

export function EvidenceTable({ signals = [] }) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSignals = useMemo(() => {
    return signals.filter((sig) => {
      // Status filter
      if (filterStatus !== "all" && sig.status !== filterStatus) {
        return false;
      }
      // Search term filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = sig.signal_name?.toLowerCase().includes(query);
        const matchesFinding = sig.finding?.toLowerCase().includes(query);
        const matchesEngine = sig.engine?.toLowerCase().includes(query);
        if (!matchesName && !matchesFinding && !matchesEngine) return false;
      }
      return true;
    });
  }, [signals, filterStatus, searchTerm]);

  if (!signals || signals.length === 0) return null;

  return (
    <Card className="space-y-4">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Live OSINT Search Evidence Matrix
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Every heuristic score adjustment links directly to real-world SerpApi search probes.
          </p>
        </div>

        {/* Filter Pills & Search Input */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick status tabs */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setFilterStatus("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                filterStatus === "all"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              All ({signals.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("fail")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                filterStatus === "fail"
                  ? "bg-rose-500 text-white shadow-sm"
                  : "text-slate-500 hover:text-rose-600"
              }`}
            >
              Threats ({signals.filter((s) => s.status === "fail").length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("pass")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                filterStatus === "pass"
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-slate-500 hover:text-emerald-600"
              }`}
            >
              Verified ({signals.filter((s) => s.status === "pass").length})
            </button>
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search findings..."
              className="pl-8 pr-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-100/90 dark:bg-slate-950/90 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-bold uppercase text-[11px] tracking-wider">
              <th className="py-3 px-4 w-[28%]">OSINT Probe & Engine</th>
              <th className="py-3 px-4 w-[14%] text-center">Score Delta</th>
              <th className="py-3 px-4 w-[18%] text-center">Telemetry Status</th>
              <th className="py-3 px-4 w-[40%]">Finding & Live Corroboration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 font-sans">
            {filteredSignals.length > 0 ? (
              filteredSignals.map((sig, idx) => <SignalRow key={idx} signal={sig} />)
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center text-xs text-slate-500">
                  No signals match the current filter or search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
