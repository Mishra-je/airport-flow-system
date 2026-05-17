import React, { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";

export default function LiveCounter() {
  const { socket, connected } = useSocket();
  const [flowData, setFlowData] = useState([]);

  useEffect(() => {
    if (!socket) return;
    socket.on("flow:all", (data) => setFlowData(data));
    return () => socket.off("flow:all");
  }, [socket]);

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={`w-2 h-2 rounded-full ${connected ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
      <span className="text-slate-400">{connected ? "Live" : "Disconnected"}</span>
      {flowData.length > 0 && (
        <span className="text-slate-500 text-xs">
          · Updated {new Date().toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}
