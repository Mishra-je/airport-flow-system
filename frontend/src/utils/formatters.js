export const formatCount = (n) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

export const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" });

export const congestionColor = (level) => ({
  low: "#22c55e",
  medium: "#f59e0b",
  high: "#ef4444",
  critical: "#dc2626",
})[level] || "#94a3b8";
