import React from "react";

const badge = {
  low: "bg-green-500/20 text-green-400",
  medium: "bg-yellow-500/20 text-yellow-400",
  high: "bg-red-500/20 text-red-400",
};

export default function HourlyForecast({ data = [] }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <h3 className="text-white font-semibold mb-4">Hourly Breakdown</h3>
      <div className="overflow-y-auto max-h-72 space-y-1 pr-1">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-slate-700/50">
            <span className="text-slate-300 text-sm w-16">{item.hour}</span>
            <div className="flex-1 mx-3">
              <div className="bg-slate-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min((item.predicted_count / 900) * 100, 100)}%` }}
                />
              </div>
            </div>
            <span className="text-white text-sm w-16 text-right">{item.predicted_count?.toLocaleString()}</span>
            <span className={`ml-3 text-xs px-2 py-0.5 rounded-full w-20 text-center ${badge[item.congestion] || badge.low}`}>
              {item.congestion}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
