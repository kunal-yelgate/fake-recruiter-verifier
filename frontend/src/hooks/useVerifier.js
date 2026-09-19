import { useState, useCallback, useRef } from "react";
import { verifyPosting } from "../services/api";

const SCAN_STEPS = [
  { id: "nlp", label: "Extracting Entities & Keywords", duration: 350 },
  { id: "maps", label: "Probing Google Maps Physical Footprint", duration: 450 },
  { id: "linkedin", label: "Verifying LinkedIn Corporate Identity", duration: 450 },
  { id: "duplicates", label: "Scanning Global Duplicate Web Fingerprints", duration: 500 },
  { id: "news", label: "Checking Google News Fraud & Lawsuit Intel", duration: 400 },
  { id: "domain", label: "Analyzing Lookalike Domains & Recruiter Credentials", duration: 450 },
];

export function useVerifier(onSuccess) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const abortControllerRef = useRef(null);

  const verify = useCallback(
    async (text) => {
      if (!text || text.trim().length < 10) {
        setError("Please enter at least 10 characters from the job posting or recruiter message.");
        return;
      }

      setError(null);
      setIsLoading(true);
      setActiveStepIndex(0);

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      // Start sequential step animator
      let currentStep = 0;
      const stepTimer = setInterval(() => {
        currentStep++;
        if (currentStep < SCAN_STEPS.length) {
          setActiveStepIndex(currentStep);
        }
      }, 400);

      try {
        const data = await verifyPosting(text.trim(), abortControllerRef.current.signal);
        clearInterval(stepTimer);
        setActiveStepIndex(SCAN_STEPS.length - 1);
        setResults(data);
        if (onSuccess) {
          onSuccess(data, text);
        }
      } catch (err) {
        clearInterval(stepTimer);
        console.error("Verification failed:", err);
        setError(err.message || "Failed to contact verification server.");
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess]
  );

  const reset = useCallback(() => {
    setResults(null);
    setError(null);
    setIsLoading(false);
    setActiveStepIndex(0);
  }, []);

  return {
    verify,
    reset,
    results,
    setResults,
    isLoading,
    error,
    activeStepIndex,
    scanSteps: SCAN_STEPS,
  };
}
