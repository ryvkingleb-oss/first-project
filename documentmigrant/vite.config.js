import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: false,
    assetsDir: "assets",
    rollupOptions: {
      input: "index.html",
    },
  },
});
