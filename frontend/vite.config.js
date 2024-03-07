import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    preserveSymlinks: true,
  },
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    hmr: false,
  },
  optimizeDeps: {
    exclude: [],
  },
});
