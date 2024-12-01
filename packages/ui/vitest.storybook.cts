import { defineProject, mergeConfig } from 'vitest/config';
import configShared from '../../vitest.shared';
import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import { storybookSveltekitPlugin } from '@storybook/sveltekit/vite-plugin';

export default mergeConfig(
  configShared,
  defineProject({
    plugins: [storybookTest(), storybookSveltekitPlugin()],
    test: {
      name: 'storybook',
      // setupFiles: ['.storybook/vitest.setup.ts'],
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
  }),
);
