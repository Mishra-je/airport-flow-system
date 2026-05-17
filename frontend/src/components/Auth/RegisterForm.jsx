import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        form
      );

      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm text-slate-400 mb-1">
          Name
        </label>

        <input
          type="text"
          required
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          placeholder="Sachin Mishra"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1">
          Email
        </label>

        <input
          type="email"
          required
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          placeholder="admin@airport.com"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1">
          Password
        </label>

        <input
          type="password"
          required
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition"
      >
        {loading ? "Creating Account..." : "Register"}
      </button>

      <p className="text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-400 hover:underline"
        >
          Sign In
        </Link>
      </p>

    </form>
  );
}