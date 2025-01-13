import type { ViteFinal } from '@storybook/builder-vite';
import type { StorybookConfig } from '@storybook/sveltekit';
import path, { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}

const DEFAULTS = {
  STORIES_AND_DOCS_REGEX: '**/*.@(mdx|stories.@(js|ts|svelte))',
  STORIES_ONLY_REGEX: '**/*.stories.@(js|ts|svelte)',
  DOCS_ONLY_REGEX: '**/*.mdx',
} as const;

// NOTE TO SMART DEVS:
// Yes, this is DUPLICATED code, COPIED AND PASTED from `preview.ts`
// But Storybook 8 does NOT allow us to do it any other way.
const groups = [
  'Actions',
  ['button', 'icon-button', 'icon-toggle', 'action-group', 'link'],
  'Communication',
  ['tooltip', 'popover'],
  'Data Display',
  ['tree', 'layer-tree', 'layer', 'disclosure'],
  'Forms',
  ['checkbox', 'input', 'label', 'radio', 'select-menu', 'textarea', 'switch'],
  'Navigation',
  ['tabs', 'sidebar'],
  'Typography',
  ['heading', 'paragraph', 'text'],
  'Visual',
  ['icon', 'onboarding-tip'],
  '🚧 Next',
  ['sidebar', 'badge'],
];

const config: StorybookConfig = {
  stories: [
    // Top-level docs
    {
      titlePrefix: '',
      directory: '../../../docs',
      files: DEFAULTS.STORIES_AND_DOCS_REGEX,
    },
    {
      titlePrefix: '',
      directory: '../../../docs',
      files: DEFAULTS.STORIES_AND_DOCS_REGEX,
    },
    ...(groups
      .map((group, index) =>
        index % 2 === 0
          ? {
              titlePrefix: `📦 UI 〉components / ${group}`,
              directory: '../src/lib/components',
              files: `**/@(${(groups[index + 1] as string[]).join('|')}).@(mdx|stories.@(js|ts|svelte))`,
            }
          : null,
      )
      .filter(Boolean) as any[]),
    // UI / Icons
    {
      titlePrefix: '📦 UI 〉icons',
      directory: '../src/lib/icons',
      files: DEFAULTS.STORIES_AND_DOCS_REGEX,
    },
    // Svelte Actions
    {
      titlePrefix: '📦 UI 〉(Svelte) actions',
      directory: '../src/lib/actions',
      files: DEFAULTS.STORIES_AND_DOCS_REGEX,
    },
    // Message Bus
    {
      titlePrefix: '📦 Message Bus 〰️ 🚧 beta',
      directory: '../../message-bus/docs',
      files: DEFAULTS.DOCS_ONLY_REGEX,
    },
    // RPC
    {
      titlePrefix: '📦 RPC 〰️ 🚧 beta',
      directory: '../../rpc/docs',
      files: DEFAULTS.DOCS_ONLY_REGEX,
    },
  ],

  addons: [
    // ‼️ NOTE: This plugin DOES NOT WORK with getAbsolutePath
    '@storybook/addon-svelte-csf', // disabled since we are using dual theme decorator
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@chromatic-com/storybook'),
  ],

  framework: {
    name: '@storybook/sveltekit',
    options: {},
  },

  docs: {},

  staticDirs: ['../docs/assets', '../static'],

  viteFinal: (async (config) => {
    return {
      ...config,
      server: {
        ...config.server,
        fs: {
          ...config.server?.fs,
          allow: [
            ...(config.server?.fs?.allow || []),
            path.resolve(projectRoot, 'docs'),
            path.resolve(projectRoot, '..', 'message-bus', 'docs'),
            path.resolve(projectRoot, '..', 'rpc', 'docs'),
            path.resolve(projectRoot, '..', '..', '..', 'docs'),
          ],
        },
      },
    };
  }) satisfies ViteFinal,
};

export default config;
