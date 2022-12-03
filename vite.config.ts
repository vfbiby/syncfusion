import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxImportSource: '@welldone-software/why-did-you-render'
  })],
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'packages/template/*'],
    setupFiles: './src/test.setup.ts',
    css: true,
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
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
      },
    },
  },
});
