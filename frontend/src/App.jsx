import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import PostingInput from "./components/PostingInput";
import VerdictBanner from "./components/VerdictBanner";
import EntitiesGrid from "./components/EntitiesGrid";
import EvidenceTable from "./components/EvidenceTable";
import Footer from "./components/Footer";
import { verifyPosting } from "./services/api";

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const resultsRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleVerify = async () => {
    if (text.trim().length < 10) {
      setError("Please enter a longer job posting or recruiter message (minimum 10 characters).");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const data = await verifyPosting(text.trim());
      setResults(data);
      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      console.error("Verification error:", err);
      setError(err.message || "Failed to reach backend verification API.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-5xl mx-auto space-y-8">
        <Header isDark={isDark} onToggleTheme={() => setIsDark((prev) => !prev)} />

        <main className="space-y-8">
          <PostingInput
            text={text}
            setText={setText}
            onVerify={handleVerify}
            isLoading={isLoading}
            error={error}
          />

          {results && (
            <div ref={resultsRef} className="space-y-6 pt-4 animate-in fade-in duration-500">
              <VerdictBanner
                score={results.risk_score}
                verdict={results.verdict}
                verdictBadge={results.verdict_badge}
                summary={results.summary}
                isMock={results.is_mock}
              />

              <EntitiesGrid extractedFields={results.extracted_fields} />

              <EvidenceTable signals={results.signals} />
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
