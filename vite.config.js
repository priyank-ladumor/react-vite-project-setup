import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@tanstack/react-query"],
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
