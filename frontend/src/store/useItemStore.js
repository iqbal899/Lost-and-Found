import { create } from "zustand";
import { getAllItemsApi, getSingleItemApi, getMyItemsApi, createItemApi } from "../api/itemApi";

export const useItemStore = create((set) => ({
  items: [],
  myItems: [],
  currentItem: null,
  loading: false,
  error: null,

  fetchAllItems: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await getAllItemsApi();
      set({ items: data });
    } catch (e) {
      set({ error: e.response?.data?.message || "Failed to fetch items" });
    } finally {
      set({ loading: false });
    }
  },

  fetchSingleItem: async (id) => {
    set({ loading: true, currentItem: null });
    try {
      const { data } = await getSingleItemApi(id);
      set({ currentItem: data });
    } catch (e) {
      set({ error: e.response?.data?.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchMyItems: async () => {
    set({ loading: true });
    try {
      const { data } = await getMyItemsApi();
      set({ myItems: data });
    } finally {
      set({ loading: false });
    }
  },

  createItem: async (formData) => {
    const { data } = await createItemApi(formData);
    set((state) => ({ myItems: [data, ...state.myItems] }));
    return data;
  },
}));