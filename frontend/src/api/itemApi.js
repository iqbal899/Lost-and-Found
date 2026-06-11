import api from "./axios";

export const getAllItemsApi = () => api.get("/items");
export const getSingleItemApi = (id) => api.get(`/items/${id}`);
export const getMyItemsApi = () => api.get("/my-items");
export const createItemApi = (formData) =>
  api.post("/items", formData, { headers: { "Content-Type": "multipart/form-data" } });