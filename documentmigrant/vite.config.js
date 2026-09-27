import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  publicDir: "public",
  envPrefix: ["VITE_", "ADS_"],
  resolve: {
    alias: {
      "@shared": path.resolve("shared"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: false,
    assetsDir: "assets",
    rollupOptions: {
      input: "index.html",
    },
  },
});
