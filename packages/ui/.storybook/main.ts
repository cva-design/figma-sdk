import type { StorybookConfig } from '@storybook/sveltekit';
import type { InlineConfig } from 'vite';

// Simplify paths
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const config: StorybookConfig = {
  stories: [
    {
      directory: '../docs',
      files: '*.mdx',
      titlePrefix: 'Documentation',
    },
    {
      directory: '../docs/packages',
      files: '**/*.mdx',
      titlePrefix: 'SDK Packages',
    },
    {
      directory: '../src/lib/components',
      files: '**/*.@(mdx|stories.@(js|ts|svelte))',
      titlePrefix: 'UI Components',
    },
  ],

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
