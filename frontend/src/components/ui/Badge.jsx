import React from "react";

export function Badge({
  children,
  variant = "neutral",
  size = "md",
  icon: Icon,
  className = "",
}) {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3.5 py-1.5 text-sm",
  };

  const variantStyles = {
    success:
      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30",
    danger:
      "bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/30",
    warning:
      "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30",
    info:
      "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/30",
    neutral:
      "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full uppercase tracking-wider ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
