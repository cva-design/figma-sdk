import type { StorybookConfig } from '@storybook/sveltekit';
import type { InlineConfig } from 'vite';

// Simplify paths
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);

const groups = {
  Actions: ['button', 'icon-button', 'icon-toggle', 'action-group', 'link'],
  Communication: ['tooltip', 'popover'],
  'Data Display': ['tree', 'disclosure'],
  Forms: ['input', 'textarea', 'radio', 'switch', 'select-menu'],
  Navigation: ['tabs', 'sidebar'],
  Visual: ['icon'],
};

const config: StorybookConfig = {
  stories: [
    {
      directory: '../docs',
      files: '*.mdx',
      // titlePrefix: 'Documentation',
    },
    {
      directory: '../docs/packages',
      files: '**/*.mdx',
      titlePrefix: 'SDK Packages',
    },
    ...Object.entries(groups).map(([group, components]) => ({
      titlePrefix: group,
      directory: '../src/lib/components',
      files: `**/@(${components.join('|')}).@(mdx|stories.@(js|ts|svelte))`,
    })),
    // commented out for now, as it's not working
    // {
    //   directory: '../src/lib/components',
    //   files: `**/(!${Object.values(groups).flat().join('|')}).@(mdx|stories.@(js|ts|svelte))`,
    //   titlePrefix: 'Other Components',
    // },
  ],

  addons: [
    '@storybook/addon-svelte-csf',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-mdx-gfm',
    // disabled since we are using dual theme decorator
    // 'storybook-dark-mode',
  ],

  framework: {
    name: '@storybook/sveltekit',
    options: {},
  },

  docs: {},
  // managerHead: (head) => {
  //   console.log(head);
  //   return `
  //   ${head}
  // `;
  // },

  staticDirs: ['../docs/assets', '../static'],

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