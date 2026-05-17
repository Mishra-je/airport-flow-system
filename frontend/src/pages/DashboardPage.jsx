import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatsCard from "../components/Dashboard/StatsCard";
import FlowChart from "../components/Dashboard/FlowChart";
import TerminalHeatmap from "../components/Dashboard/TerminalHeatmap";
import AlertBanner from "../components/Alerts/AlertBanner";
import { predictionService } from "../services/predictionService";
import { flightService } from "../services/flightService";

const MOCK_CHART = Array.from({ length: 12 }, (_, i) => ({
  hour: `${(i + 7) % 24}:00`,
  actual: Math.floor(Math.random() * 600 + 200),
  predicted: Math.floor(Math.random() * 600 + 200),
}));

const MOCK_TERMINALS = [
  { id: "T1", count: 782, congestion: "high", waitTime: 32 },
  { id: "T2", count: 345, congestion: "medium", waitTime: 15 },
  { id: "T3", count: 210, congestion: "low", waitTime: 7 },
  { id: "T4", count: 920, congestion: "critical", waitTime: 45 },
];

export default function DashboardPage() {
  const [hourly, setHourly] = useState([]);
  const [flightCount, setFlightCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      predictionService.getHourly().catch(() => ({ forecast: [] })),
      flightService.getAll().catch(() => ({ count: 0 })),
    ]).then(([pred, flights]) => {
      setHourly(pred.forecast || []);
      setFlightCount(flights.count || 0);
      setLoading(false);
    });
  }, []);

  const totalPax = MOCK_TERMINALS.reduce((sum, t) => sum + t.count, 0);

  return (
    <Layout>
      <AlertBanner />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Operations Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Real-time passenger flow across all terminals</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Total Passengers" value={totalPax.toLocaleString()} icon="👥" trend={4.2} />
        <StatsCard title="Active Flights" value={flightCount || 48} icon="✈️" trend={-1.1} />
        <StatsCard title="Avg Wait Time" value="22 min" icon="⏱️" severity="medium" />
        <StatsCard title="T4 Congestion" value="Critical" icon="🚨" severity="critical" subtitle="Terminal 4 needs attention" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2">
          <FlowChart data={MOCK_CHART} title="Actual vs Predicted Flow (Last 12h)" />
        </div>
        <TerminalHeatmap terminals={MOCK_TERMINALS} />
      </div>
    </Layout>
  );
}
