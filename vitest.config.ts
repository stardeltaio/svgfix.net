import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['lib/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['lib/**/*.ts'],
      exclude: ['lib/**/*.test.ts', 'lib/tests/**'],
      lines: 90,
      functions: 90,
      branches: 90,
      statements: 90,
      clean: true,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@lib': path.resolve(__dirname, './lib'),
    },
  },
});
