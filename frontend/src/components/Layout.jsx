import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LiveCounter from "./Dashboard/LiveCounter";

const navItems = [
  { path: "/", label: "Dashboard", icon: "📊" },
  { path: "/predictions", label: "Predictions", icon: "🧠" },
  { path: "/flights", label: "Flights", icon: "✈️" },
  { path: "/alerts", label: "Alerts", icon: "🔔" },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-5 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✈️</span>
            <div>
              <div className="text-white font-bold text-sm">AeroFlow</div>
              <div className="text-slate-500 text-xs">Flow Prediction</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-700"
                }`
              }
            >
              <span>{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="text-xs text-slate-400 mb-1 truncate">{user?.name}</div>
          <div className="text-xs text-slate-600 mb-3 capitalize">{user?.role}</div>
          <button
            onClick={handleLogout}
            className="w-full text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 py-1.5 rounded-lg transition"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-slate-800/50 border-b border-slate-700 px-6 py-3 flex justify-between items-center">
          <span className="text-slate-300 text-sm">Airport Operations Center</span>
          <LiveCounter />
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
