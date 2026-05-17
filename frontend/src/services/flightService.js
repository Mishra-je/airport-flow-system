import api from "./api";

export const flightService = {
  getAll: (params) => api.get("/flights", { params }).then((r) => r.data),
  getById: (id) => api.get(`/flights/${id}`).then((r) => r.data),
  create: (data) => api.post("/flights", data).then((r) => r.data),
  update: (id, data) => api.put(`/flights/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/flights/${id}`).then((r) => r.data),
};
