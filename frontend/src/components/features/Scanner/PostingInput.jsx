import React, { useRef } from "react";
import { AlertTriangle, ArrowRight, RotateCcw, UploadCloud, Search, ShieldCheck } from "lucide-react";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { PresetSelector } from "./PresetSelector";
import { ScanProgressStepper } from "./ScanProgressStepper";

export function PostingInput({
  text,
  setText,
  onVerify,
  isLoading,
  error,
  scanSteps,
  activeStepIndex,
}) {
  const fileInputRef = useRef(null);
  const charCount = text.trim().length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        setText(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <Card className="space-y-6">
      {/* Header title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Job Posting & Recruiter Forensic Analysis
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Paste the job description, recruiter outreach email, or Telegram/LinkedIn message. Our OSINT engine correlates company footprints, lookalike domains, and duplicate scam fingerprints via live SerpApi probes.
        </p>
      </div>

      {/* Preset Scenarios */}
      <PresetSelector onSelectPreset={(val) => setText(val)} activeText={text} />

      {/* Textarea Input Container */}
      <div className="space-y-2">
        <div className="relative">
          <textarea
            rows={7}
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
            placeholder="Paste raw job description, recruiter email, or outreach message here... (Include company name, email address, compensation, and requirements for maximum forensic depth)"
            className="w-full rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800/80 p-4 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-xs sm:text-sm leading-relaxed transition font-mono resize-y min-h-[160px] shadow-inner"
          />

          {/* Hidden File Input for drag/upload */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".txt,.md,.eml"
            className="hidden"
          />
        </div>

        {/* Live Scan Step Stepper if loading */}
        {isLoading && (
          <div className="pt-2">
            <ScanProgressStepper steps={scanSteps} activeIndex={activeStepIndex} />
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-500 dark:text-rose-400" />
            <span className="font-medium">{error}</span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono order-2 sm:order-1">
          <span>{charCount.toLocaleString()} chars</span>
          <span>•</span>
          <span>{wordCount.toLocaleString()} words</span>
          {text && (
            <>
              <span>•</span>
              <button
                type="button"
                onClick={() => setText("")}
                disabled={isLoading}
                className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Clear
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto order-1 sm:order-2">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="w-full sm:w-auto"
            title="Upload text file"
          >
            <UploadCloud className="w-4 h-4" />
            <span className="hidden sm:inline">Upload .txt</span>
          </Button>

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={onVerify}
            isLoading={isLoading}
            disabled={isLoading || charCount < 10}
            className="w-full sm:w-auto shadow-lg shadow-indigo-600/25"
          >
            <span>Run OSINT Verification</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
