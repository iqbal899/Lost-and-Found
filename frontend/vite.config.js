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
  // Bypasses the strict CSS validator checks so modern sub-tokens don't crash your build
  css: {
    lightningcss: {
      errorRecovery: true
    }
  }
});