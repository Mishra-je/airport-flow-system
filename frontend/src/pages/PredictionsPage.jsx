import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PredictionChart from "../components/Predictions/PredictionChart";
import HourlyForecast from "../components/Predictions/HourlyForecast";
import { predictionService } from "../services/predictionService";

const TERMINALS = ["T1", "T2", "T3", "T4"];

export default function PredictionsPage() {
  const [forecast, setForecast] = useState([]);
  const [selectedTerminal, setSelectedTerminal] = useState("T1");
  const [terminalForecast, setTerminalForecast] = useState([]);
  const [custom, setCustom] = useState({ terminal: "T1", dateTime: "", flightCount: 10 });
  const [customResult, setCustomResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    predictionService.getHourly()
      .then((d) => setForecast(d.forecast || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    predictionService.getTerminal(selectedTerminal)
      .then((d) => setTerminalForecast(d.forecast || []))
      .catch(() => {});
  }, [selectedTerminal]);

  const handleCustomPredict = async () => {
    setLoading(true);
    try {
      const result = await predictionService.getCustom(custom);
      setCustomResult(result.prediction);
    } catch {
      setCustomResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">AI Predictions</h1>
        <p className="text-slate-400 text-sm mt-1">LSTM-powered 24-hour passenger flow forecast</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <PredictionChart data={forecast} title="Airport-Wide 24h Forecast" />
        <HourlyForecast data={forecast} />
      </div>

      {/* Terminal selector */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 mb-4">
        <h3 className="text-white font-semibold mb-3">Terminal-Specific Forecast</h3>
        <div className="flex gap-2 mb-4">
          {TERMINALS.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTerminal(t)}
              className={`px-4 py-1.5 rounded-lg text-sm transition ${
                selectedTerminal === t
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <PredictionChart data={terminalForecast} title={`${selectedTerminal} — Next 12 Hours`} />
      </div>

      {/* Custom prediction */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4">Custom Prediction</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <select
            value={custom.terminal}
            onChange={(e) => setCustom({ ...custom, terminal: e.target.value })}
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
          >
            {TERMINALS.map((t) => <option key={t}>{t}</option>)}
          </select>
          <input
            type="datetime-local"
            value={custom.dateTime}
            onChange={(e) => setCustom({ ...custom, dateTime: e.target.value })}
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
          />
          <input
            type="number"
            placeholder="Flight count"
            value={custom.flightCount}
            onChange={(e) => setCustom({ ...custom, flightCount: e.target.value })}
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
          />
        </div>
        <button
          onClick={handleCustomPredict}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg text-sm transition"
        >
          {loading ? "Predicting..." : "Run Prediction"}
        </button>
        {customResult && (
          <div className="mt-4 p-4 bg-slate-700 rounded-lg">
            <p className="text-slate-400 text-sm">Predicted passengers:</p>
            <p className="text-3xl font-bold text-white mt-1">{customResult.predicted_count?.toLocaleString()}</p>
            <p className="text-slate-400 text-sm mt-1">
              Congestion: <span className="text-yellow-400 capitalize">{customResult.congestion}</span>
              {" · "}Confidence: {(customResult.confidence * 100).toFixed(0)}%
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
