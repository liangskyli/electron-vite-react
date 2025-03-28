import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['./__test__/**/*.test.{ts,tsx,js}'],
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
    alias: {
      '@': path.join(__dirname, './src'),
    },
    globals: false,
    testTimeout: 1000 * 60,
    coverage: {
      provider: 'v8',
      enabled: true,
      include: [
        'src/components/**/*.{js,jsx,ts,tsx}',
        '!src/components/version-update/index.tsx',
        'src/utils/**/*.{js,jsx,ts,tsx}',
      ],
      thresholds: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,
      },
    },
  },
});
