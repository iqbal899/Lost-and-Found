import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Tells Vite to compress CSS using esbuild instead of lightningcss, preventing the spacing function crash
    cssMinify: "esbuild",
  },
});