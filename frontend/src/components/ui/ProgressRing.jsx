import React, { useEffect, useState } from "react";

export function ProgressRing({ score = 0, size = 120, strokeWidth = 10 }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [score]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const isPass = score < 35;
  const isFail = score >= 65;

  const strokeColor = isPass
    ? "stroke-emerald-500"
    : isFail
    ? "stroke-rose-500"
    : "stroke-amber-500";

  const textColor = isPass
    ? "text-emerald-500 dark:text-emerald-400"
    : isFail
    ? "text-rose-500 dark:text-rose-400"
    : "text-amber-500 dark:text-amber-400";

  const glowShadow = isPass
    ? "drop-shadow-[0_0_12px_rgba(16,185,129,0.35)]"
    : isFail
    ? "drop-shadow-[0_0_12px_rgba(239,68,68,0.35)]"
    : "drop-shadow-[0_0_12px_rgba(245,158,11,0.35)]";

  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <svg className={`w-full h-full -rotate-90 transform ${glowShadow}`} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-slate-200 dark:stroke-slate-800/80"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={`${strokeColor} transition-all duration-1000 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className={`text-3xl sm:text-4xl font-black tracking-tight ${textColor} font-mono`}>
          {animatedScore}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Risk / 100
        </span>
      </div>
    </div>
  );
}
