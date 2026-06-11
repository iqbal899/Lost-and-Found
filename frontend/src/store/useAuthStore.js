import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginApi, signupApi } from "../api/authApi";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: async (credentials) => {
        const { data } = await loginApi(credentials);
        set({ user: data.user, token: data.token });
        return data;
      },

      signup: async (userData) => {
        const { data } = await signupApi(userData);
        return data;
      },

      logout: () => set({ user: null, token: null }),
    }),
    { name: "auth-storage" }
  )
);