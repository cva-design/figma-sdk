import { dirname, join } from 'node:path';
import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/lib/ui/**/*.stories.svelte'],

  addons: [
    '@chromatic-com/storybook',
    '@kemuridama/storybook-addon-github',
    '@storybook/addon-console',
    '@storybook/addon-coverage',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    '@storybook/addon-svelte-csf',
    'storybook-dark-mode',
  ],
  framework: '@storybook/sveltekit',
  docs: {},

  // previewBody: (body) => {
  //   const themes = ['light', 'dark'];
  //   const editors = ['design', 'dev-handoff', 'whiteboard'];

  //   const bodyWithThemes = themes.map((theme) => {
  //     return editors.map((editor) => {
  //       return `<div data-preferred-theme="${theme}" data-editor-theme="${editor}">${body}</div>`;
  //     });
  //   });

  //   return bodyWithThemes.join('');
  // },
};

export default config;

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}
