import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

const getColor = (count) => {
  if (count > 700) return "#ef4444";
  if (count > 450) return "#f59e0b";
  return "#22c55e";
};


export default function PredictionChart({ data = [], title = "24-Hour Forecast" }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <div className="flex gap-4 text-xs text-slate-400 mb-3">
        <span><span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1" />Low (&lt;450)</span>
        <span><span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-1" />Medium (450–700)</span>
        <span><span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1" />High (&gt;700)</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="hour" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 11 }} />
          <YAxis stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 11 }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
            labelStyle={{ color: "#94a3b8" }}
          />
          <Bar dataKey="predicted_count" name="Passengers" radius={[4, 4, 0, 0]}>
           {(Array.isArray(data) ? data : []).map((entry, index) => (
              <Cell key={index} fill={getColor(entry.predicted_count)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
