import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],

  addons: [
    '@chromatic-com/storybook',
    '@kemuridama/storybook-addon-github ',
    '@storybook/addon-console',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    '@storybook/addon-svelte-csf',
    'storybook-dark-mode',
  ],

  framework: {
    name: '@storybook/sveltekit',
    options: {},
  },
};

export default config;
