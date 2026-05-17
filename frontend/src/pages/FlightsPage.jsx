import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { flightService } from "../services/flightService";

const STATUS_BADGE = {
  scheduled: "bg-slate-600 text-slate-300",
  boarding: "bg-blue-500/20 text-blue-400",
  departed: "bg-green-500/20 text-green-400",
  arrived: "bg-green-500/20 text-green-400",
  delayed: "bg-yellow-500/20 text-yellow-400",
  cancelled: "bg-red-500/20 text-red-400",
};

export default function FlightsPage() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ terminal: "", status: "" });

  const fetchFlights = () => {
    setLoading(true);
    flightService.getAll(filter)
      .then((d) => setFlights(d.flights || []))
      .catch(() => setFlights([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchFlights(); }, [filter]);

  return (
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Flight Management</h1>
          <p className="text-slate-400 text-sm mt-1">{flights.length} flights loaded</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <select
          value={filter.terminal}
          onChange={(e) => setFilter({ ...filter, terminal: e.target.value })}
          className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-2"
        >
          <option value="">All Terminals</option>
          {["T1","T2","T3","T4"].map((t) => <option key={t}>{t}</option>)}
        </select>
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-2"
        >
          <option value="">All Statuses</option>
          {["scheduled","boarding","departed","arrived","delayed","cancelled"].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Flight</th>
              <th className="px-4 py-3 text-left">Route</th>
              <th className="px-4 py-3 text-left">Terminal</th>
              <th className="px-4 py-3 text-left">Departure</th>
              <th className="px-4 py-3 text-left">Passengers</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={6} className="text-center py-10 text-slate-500">Loading...</td></tr>
            )}
            {!loading && flights.length === 0 && (
              <tr><td colSpan={6} className="text-center py-10 text-slate-500">No flights found</td></tr>
            )}
            {flights.map((f) => (
              <tr key={f._id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition">
                <td className="px-4 py-3 text-white font-mono font-medium">{f.flightNumber}</td>
                <td className="px-4 py-3 text-slate-300">{f.origin} → {f.destination}</td>
                <td className="px-4 py-3 text-slate-400">{f.terminal}</td>
                <td className="px-4 py-3 text-slate-400">
                  {f.scheduledDeparture ? new Date(f.scheduledDeparture).toLocaleTimeString() : "—"}
                </td>
                <td className="px-4 py-3 text-slate-300">{f.passengerCount}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${STATUS_BADGE[f.status] || STATUS_BADGE.scheduled}`}>
                    {f.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
