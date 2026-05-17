import React from "react";

const severityColors = {
  low: "text-green-400",
  medium: "text-yellow-400",
  high: "text-red-400",
  critical: "text-red-600",
};

export default function StatsCard({ title, value, subtitle, icon, trend, severity }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <div className="flex justify-between items-start mb-3">
        <span className="text-slate-400 text-sm">{title}</span>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <div className={`text-3xl font-bold mb-1 ${severity ? severityColors[severity] : "text-white"}`}>
        {value}
      </div>
      {subtitle && <p className="text-slate-500 text-xs">{subtitle}</p>}
      {trend !== undefined && (
        <p className={`text-xs mt-1 ${trend >= 0 ? "text-green-400" : "text-red-400"}`}>
          {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}% vs last hour
        </p>
      )}
    </div>
  );
}
