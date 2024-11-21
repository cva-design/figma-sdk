import type { InlineConfig } from 'vite';
import type { StorybookConfig } from '@storybook/sveltekit';

// Simplify paths
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|ts|svelte)', '../docs/**/*.mdx', '../docs/**/*.stories.@(js|ts|svelte)'],

  addons: [
    '@storybook/addon-svelte-csf',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-mdx-gfm',
  ],

  framework: {
    name: '@storybook/sveltekit',
    options: {},
  },

  docs: {},

  viteFinal: async (config: InlineConfig) => {
    config.server = {
      ...config.server,
      fs: {
        ...config.server?.fs,
        allow: [
          ...(config.server?.fs?.allow || []),
          // Allow serving files from project root and parent directories
          path.resolve(projectRoot, 'docs'),
        ],
      },
    };

    return config;
  },
};
export default config;
