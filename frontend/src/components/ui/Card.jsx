import React from "react";

export function Card({
  children,
  className = "",
  glow = "none",
  interactive = false,
  ...props
}) {
  const glowStyles = {
    none: "",
    indigo: "hover:border-indigo-500/40 hover:shadow-indigo-500/10",
    emerald: "hover:border-emerald-500/40 hover:shadow-emerald-500/10",
    rose: "hover:border-rose-500/40 hover:shadow-rose-500/10",
    amber: "hover:border-amber-500/40 hover:shadow-amber-500/10",
  };

  return (
    <div
      className={`glass-panel rounded-2xl p-6 shadow-xl transition-all duration-300 ${
        interactive ? "hover:-translate-y-0.5 cursor-pointer" : ""
      } ${glowStyles[glow]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
