import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-400/10 blur-3xl rounded-full"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        
        {/* Logo & Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30 mb-4">
            <span className="text-4xl">✈️</span>
          </div>

          <h1 className="text-4xl font-extrabold text-white tracking-wide">
            AeroFlow
          </h1>

          <p className="text-slate-400 mt-2 text-sm leading-relaxed">
            AI-Based Airport Passenger Flow <br />
            Prediction & Resource Management System
          </p>
        </div>

        {/* Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/30">
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">
              Welcome Back 👋
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Sign in to continue to your dashboard
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-700"></div>
            <span className="text-slate-500 text-xs">OR</span>
            <div className="flex-1 h-px bg-slate-700"></div>
          </div>

          {/* Register */}
          <p className="text-center text-sm text-slate-400">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-cyan-400 font-medium hover:text-cyan-300 transition duration-200"
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6 tracking-wide">
          Secure access • AI-powered analytics • Role-based permissions
        </p>
      </div>
    </div>
  );
}