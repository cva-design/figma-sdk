import type { Preview } from '@storybook/svelte';
import { themes } from '@storybook/theming';

import '../docs/assets/storybook/index.scss';

const preview: Preview = {
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      current: 'dark',
      darkClass: 'figma-dark',
      lightClass: 'figma-light',
      figJamClass: 'figjam',
      classTarget: 'html',
      stylePreview: true,
    },
    docs: {
      theme: themes.dark,
    },
    options: {
      storySort: {
        order: [
          '📦 UI 〉components',
          [
            // ❗❗ IMPORTANT ❗❗
            // if you change this, you MUST COPY AND PASTE it
            // to the `groups` array in `main.ts`
            'Actions',
            ['button', 'icon-button', 'icon-toggle', 'action-group', 'link'],
            'Communication',
            ['tooltip', 'popover'],
            'Data Display',
            ['tree', 'layer-tree', 'layer', 'disclosure'],
            'Forms',
            [
              'checkbox',
              'input',
              'label',
              'radio',
              'select-menu',
              'textarea',
              'switch',
            ],
            'Navigation',
            ['tabs', 'sidebar'],
            'Typography',
            ['heading', 'paragraph', 'text'],
            'Visual',
            ['icon', 'onboarding-tip'],
            '🚧 Next',
            ['sidebar', 'badge'],
          ],
          '📦 UI 〉icons',
          '📦 UI 〉(Svelte) actions',
          '📦 Message Bus 〰️ 🚧 beta',
          [
            'Introduction',
            'Quick Start',
            'Get Started',
            'Basic Concepts',
            'Example',
            'Advanced Usage',
          ],
          '📦 RPC 〰️ 🚧 beta',
          ['*'],
        ],
      },
    },
  },
  decorators: [
    // (story, { parameters }) =>
    //   parameters.dualTheme !== false ? (DualTheme as any) : story(),
  ],
  tags: ['autodocs'],
};

export default preview;
