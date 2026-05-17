import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

export default function FlowChart({ data, title = "Passenger Flow" }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="hour" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <YAxis stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
            labelStyle={{ color: "#94a3b8" }}
          />
          <Legend wrapperStyle={{ color: "#94a3b8" }} />
          <Area type="monotone" dataKey="actual" stroke="#3b82f6" fill="url(#colorActual)" name="Actual" strokeWidth={2} />
          <Area type="monotone" dataKey="predicted" stroke="#f59e0b" fill="url(#colorPredicted)" name="Predicted" strokeWidth={2} strokeDasharray="5 5" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
