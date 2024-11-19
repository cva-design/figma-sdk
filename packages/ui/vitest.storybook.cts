import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import { storybookSveltekitPlugin } from '@storybook/sveltekit/vite-plugin';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [storybookTest(), storybookSveltekitPlugin()],
  // define: {
  //   __dirname: 'JSON.stringify(import.meta.dirname)',
  //   __filename: 'JSON.stringify(import.meta.url)',
  // },
  test: {
    environment: 'jsdom',
    setupFiles: ['./.storybook/vitest.setup.ts'],
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright',
      headless: true,
    },
  },
  optimizeDeps: {
    exclude: ['fsevents'],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
