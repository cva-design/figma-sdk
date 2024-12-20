import { defineConfig } from 'vitest/config';
import UnpluginTypia from '@ryoppippi/unplugin-typia/vite';

export default defineConfig({
  plugins: [UnpluginTypia()],
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['.moon/**', 'node_modules/**', '.svelte-kit/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.d.ts', 'src/**/types.ts'],
    },
    testTimeout: 2000,
    hookTimeout: 2000,
  },
  resolve: {
    alias: {
      '@figma/plugin-typings': '@figma/plugin-typings/index.d.ts',
    },
  },
}); 