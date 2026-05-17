import React from "react";

const severityBadge = {
  info: "bg-blue-500/20 text-blue-400",
  warning: "bg-yellow-500/20 text-yellow-400",
  critical: "bg-red-500/20 text-red-400",
};

export default function AlertList({ alerts = [], onResolve }) {
  return (
    <div className="space-y-3">
      {alerts.length === 0 && (
        <p className="text-slate-500 text-center py-8">No active alerts</p>
      )}
      {alerts.map((alert) => (
        <div key={alert._id} className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${severityBadge[alert.severity]}`}>
                {alert.severity}
              </span>
              <span className="text-slate-400 text-xs capitalize">{alert.type}</span>
              {alert.terminal && (
                <span className="text-slate-500 text-xs">· {alert.terminal}</span>
              )}
            </div>
            <p className="text-white text-sm">{alert.message}</p>
            <p className="text-slate-500 text-xs mt-1">
              {new Date(alert.createdAt).toLocaleString()}
            </p>
          </div>
          {alert.isActive && onResolve && (
            <button
              onClick={() => onResolve(alert._id)}
              className="text-xs text-slate-400 hover:text-white border border-slate-600 hover:border-slate-400 px-3 py-1 rounded-lg transition"
            >
              Resolve
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
