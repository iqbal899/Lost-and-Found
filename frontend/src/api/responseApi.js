import api from "./axios";

export const submitResponseApi = (data) => api.post("/responses", data);
export const acceptResponseApi = (id) => api.put(`/responses/${id}/accept`);
export const getMyResponsesApi = () => api.get("/my-responses");
export const getReceivedResponsesApi = () => api.get("/received-responses");
export const getContactDetailsApi = (id) => api.get(`/responses/${id}/contact`);