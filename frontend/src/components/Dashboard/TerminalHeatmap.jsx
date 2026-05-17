import React from "react";

const congestionColors = {
  low: "bg-green-500/20 border-green-500/40 text-green-400",
  medium: "bg-yellow-500/20 border-yellow-500/40 text-yellow-400",
  high: "bg-red-500/20 border-red-500/40 text-red-400",
  critical: "bg-red-700/30 border-red-600 text-red-300",
};

const congestionLabel = {
  low: "Low Traffic",
  medium: "Moderate",
  high: "Heavy",
  critical: "Critical",
};

export default function TerminalHeatmap({ terminals = [] }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <h3 className="text-white font-semibold mb-4">Terminal Status</h3>
      <div className="grid grid-cols-2 gap-3">
        {terminals.map((t) => (
          <div
            key={t.id}
            className={`border rounded-lg p-4 ${congestionColors[t.congestion] || congestionColors.low}`}
          >
            <div className="text-xl font-bold">{t.id}</div>
            <div className="text-2xl font-mono mt-1">{t.count?.toLocaleString()}</div>
            <div className="text-xs mt-1 opacity-80">{congestionLabel[t.congestion]}</div>
            <div className="text-xs opacity-60 mt-1">Wait: ~{t.waitTime} min</div>
          </div>
        ))}
      </div>
    </div>
  );
}
