import React from "react";
import RegisterForm from "../components/Auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="text-5xl mb-3">✈️</div>

          <h1 className="text-2xl font-bold text-white">
            AeroFlow
          </h1>

          <p className="text-slate-400 mt-1 text-sm">
            Airport Passenger Flow Prediction System
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-white font-semibold text-lg mb-6">
            Create Account
          </h2>

          <RegisterForm />
        </div>

        <p className="text-center text-slate-600 text-xs mt-4">
          Secure access · Role-based permissions
        </p>

      </div>
    </div>
  );
}