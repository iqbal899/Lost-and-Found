import { create } from "zustand";
import {
  submitResponseApi, acceptResponseApi,
  getMyResponsesApi, getReceivedResponsesApi, getContactDetailsApi
} from "../api/responseApi";

export const useResponseStore = create((set) => ({
  myResponses: [],
  receivedResponses: [],
  contactDetails: null,
  loading: false,

  submitResponse: async (data) => {
    const res = await submitResponseApi(data);
    return res.data;
  },

  acceptResponse: async (id) => {
    await acceptResponseApi(id);
    set((state) => ({
      receivedResponses: state.receivedResponses.map((r) =>
        r._id === id ? { ...r, status: "accepted" } : { ...r, status: r.status === "pending" ? "rejected" : r.status }
      ),
    }));
  },

  fetchMyResponses: async () => {
    set({ loading: true });
    try {
      const { data } = await getMyResponsesApi();
      set({ myResponses: data });
    } finally {
      set({ loading: false });
    }
  },

  fetchReceivedResponses: async () => {
    set({ loading: true });
    try {
      const { data } = await getReceivedResponsesApi();
      set({ receivedResponses: data });
    } finally {
      set({ loading: false });
    }
  },

  fetchContactDetails: async (id) => {
    const { data } = await getContactDetailsApi(id);
    set({ contactDetails: data });
    return data;
  },
}));