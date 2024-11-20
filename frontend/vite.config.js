import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    open: false,
    port: 4001,
    host: true,
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      // Path aliases
      src: path.resolve("src/"),
      "@app": path.resolve("src"),
      "@pages": path.resolve("src/pages"),
      "@routes": path.resolve("src/routes"),
      "@themes": path.resolve("src/themes"),
      "@services": path.resolve("src/services"),
      "@reducer": path.resolve("src/reducer"),
      "@components": path.resolve("src/components"),
      "@styles": path.resolve("src/styles"),
    },
  },
});
