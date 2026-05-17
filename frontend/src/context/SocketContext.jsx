import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const s = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:5000", {
      auth: { token: localStorage.getItem("token") },
    });

    s.on("connect", () => setConnected(true));
    s.on("disconnect", () => setConnected(false));
    setSocket(s);

    return () => s.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
