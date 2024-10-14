import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { svelteWarnings } from './src/lib/config/svelte-warnings/plugin';

const config = defineConfig({
  plugins: [
    sveltekit(),
    svelteWarnings({
      disable: [/a11y*/],
      summary: 'all',
      listAllCodes: true,
    }),
  ],
  build: {
    sourcemap: true,
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
  server: {
    watch: {
      // usePolling: true,
      // interval: 100,
    },
  },
});

console.log(
  `
  ========================================
  Vite Config:
  ----------------------------------------
  ${JSON.stringify(config, null, 2)}
  ========================================
  `,
);

export default config;
