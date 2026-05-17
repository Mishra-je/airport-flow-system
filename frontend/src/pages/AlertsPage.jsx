import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import AlertList from "../components/Alerts/AlertList";
import api from "../services/api";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ type: "congestion", severity: "warning", terminal: "T1", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchAlerts = () => {
    api.get("/alerts").then((r) => setAlerts(r.data.alerts || [])).finally(() => setLoading(false));
  };

  useEffect(() => { fetchAlerts(); }, []);

  const handleCreate = async () => {
    if (!form.message.trim()) return;
    setSubmitting(true);
    try {
      await api.post("/alerts", form);
      setForm({ ...form, message: "" });
      fetchAlerts();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResolve = async (id) => {
    await api.put(`/alerts/${id}`, { isActive: false });
    fetchAlerts();
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Alerts & Notifications</h1>
        <p className="text-slate-400 text-sm mt-1">Manage operational alerts across terminals</p>
      </div>

      {/* Create Alert */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 mb-6">
        <h3 className="text-white font-semibold mb-4">Create Alert</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
          >
            {["congestion","delay","security","weather","system"].map((t) => <option key={t}>{t}</option>)}
          </select>
          <select
            value={form.severity}
            onChange={(e) => setForm({ ...form, severity: e.target.value })}
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
          >
            {["info","warning","critical"].map((s) => <option key={s}>{s}</option>)}
          </select>
          <select
            value={form.terminal}
            onChange={(e) => setForm({ ...form, terminal: e.target.value })}
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
          >
            {["T1","T2","T3","T4","ALL"].map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Alert message..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
          />
          <button
            onClick={handleCreate}
            disabled={submitting || !form.message.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm transition"
          >
            {submitting ? "Sending..." : "Create"}
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-slate-500 text-center py-10">Loading alerts...</p>
      ) : (
        <AlertList alerts={alerts} onResolve={handleResolve} />
      )}
    </Layout>
  );
}
