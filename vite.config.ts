import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'packages/template/*'],
    setupFiles: './src/test.setup.ts',
    coverage: {
      provider: 'istanbul',
      statements: 89,
      all: true,
      include: ['src/**'],
      exclude: [
        '**/*.{test,spec}.{ts,tsx,js,jsx}',
        '**/*.stories.{ts,tsx,js,jsx}',
        '**/tests/**',
        '**/stories/**',
        'src/main.tsx',
        'src/pages/test/**',
      ],
    },
  },
});
