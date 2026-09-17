import React, { useEffect, useState } from "react";

export default function ScoreGauge({ score, verdictBadge }) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 750;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease out
      const current = Math.round(eased * score);
      setDisplayScore(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [score]);

  // Determine colors based on verdict badge or score
  const isPass = verdictBadge === "pass" || score < 40;
  const isFail = verdictBadge === "fail" || score >= 70;

  const colorStyles = isPass
    ? {
        border: "border-emerald-500/30",
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        ring: "stroke-emerald-500",
      }
    : isFail
    ? {
        border: "border-rose-500/30",
        bg: "bg-rose-500/10",
        text: "text-rose-400",
        ring: "stroke-rose-500",
      }
    : {
        border: "border-amber-500/30",
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        ring: "stroke-amber-500",
      };

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            className="stroke-slate-800"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            className={`${colorStyles.ring} transition-all duration-1000 ease-out`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className={`text-3xl font-extrabold tracking-tight ${colorStyles.text}`}>
            {displayScore}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Risk Score
          </span>
        </div>
      </div>
    </div>
  );
}
