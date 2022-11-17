import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    exclude: [...configDefaults.exclude, "packages/template/*"],
    setupFiles: "./src/test.setup.ts",
  },
});
