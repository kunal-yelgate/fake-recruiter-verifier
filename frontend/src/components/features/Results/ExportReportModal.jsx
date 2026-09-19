import React, { useState } from "react";
import { Copy, Download, Check, FileCode, FileText } from "lucide-react";
import { Modal } from "../../ui/Modal";
import { Button } from "../../ui/Button";
import { generateMarkdownReport, downloadFile } from "../../../services/reportGenerator";
import { useClipboard } from "../../../hooks/useClipboard";

export function ExportReportModal({ isOpen, onClose, results }) {
  const [format, setFormat] = useState("markdown");
  const { copied, copy } = useClipboard();

  if (!results) return null;

  const markdownContent = generateMarkdownReport(results);
  const jsonContent = JSON.stringify(results, null, 2);
  const activeContent = format === "markdown" ? markdownContent : jsonContent;

  const handleDownload = () => {
    const filename = `TrueRecruit-Forensic-Report-${results.extracted_fields?.company_name || "scan"}-${Date.now()}.${
      format === "markdown" ? "md" : "json"
    }`;
    const contentType = format === "markdown" ? "text/markdown" : "application/json";
    downloadFile(activeContent, filename, contentType);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Forensic Verification Brief" maxWidth="max-w-3xl">
      <div className="space-y-4">
        {/* Format Selector */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFormat("markdown")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                format === "markdown"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Markdown (.md)</span>
            </button>

            <button
              type="button"
              onClick={() => setFormat("json")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                format === "json"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>JSON (.json)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => copy(activeContent)}
              icon={copied ? Check : Copy}
            >
              {copied ? "Copied to Clipboard!" : "Copy Report"}
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={handleDownload}
              icon={Download}
            >
              Download
            </Button>
          </div>
        </div>

        {/* Code Preview */}
        <div className="relative">
          <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 text-xs font-mono max-h-[380px] overflow-y-auto leading-relaxed border border-slate-800">
            {activeContent}
          </pre>
        </div>
      </div>
    </Modal>
  );
}
