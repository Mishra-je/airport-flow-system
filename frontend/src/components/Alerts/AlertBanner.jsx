import React, { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";

const severityStyles = {
  info: "bg-blue-500/10 border-blue-500/40 text-blue-300",
  warning: "bg-yellow-500/10 border-yellow-500/40 text-yellow-300",
  critical: "bg-red-500/10 border-red-500/40 text-red-300",
};

const icons = { info: "ℹ️", warning: "⚠️", critical: "🚨" };

export default function AlertBanner() {
  const { socket } = useSocket();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!socket) return;
    socket.on("alert:new", (alert) => {
      setAlerts((prev) => [alert, ...prev].slice(0, 3));
      setTimeout(() => setAlerts((prev) => prev.filter((a) => a._id !== alert._id)), 8000);
    });
    return () => socket.off("alert:new");
  }, [socket]);

  if (!alerts.length) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {alerts.map((alert, i) => (
        <div key={i} className={`border rounded-lg px-4 py-3 text-sm flex gap-2 shadow-xl ${severityStyles[alert.severity] || severityStyles.info}`}>
          <span>{icons[alert.severity]}</span>
          <div>
            <p className="font-semibold capitalize">{alert.type}</p>
            <p className="opacity-80">{alert.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
