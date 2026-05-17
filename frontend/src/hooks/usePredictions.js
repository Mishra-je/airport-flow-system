import { useState, useEffect, useCallback } from "react";
import { predictionService } from "../services/predictionService";

export function usePredictions(terminal = null) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (terminal) {
        const res = await predictionService.getTerminal(terminal);
        setData(res.forecast || []);
      } else {
        const res = await predictionService.getHourly();
        setData(res.forecast || []);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [terminal]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
