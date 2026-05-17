import api from "./api";

export const predictionService = {
  getCurrent: () => api.get("/predictions/current").then((r) => r.data),
  getHourly: () => api.get("/predictions/hourly").then((r) => r.data),
  getTerminal: (id) => api.get(`/predictions/terminal/${id}`).then((r) => r.data),
  getCustom: (payload) => api.post("/predictions/custom", payload).then((r) => r.data),
};
