import type { Preview } from '@storybook/svelte';

// GLOBAL STYLES
import '../docs/assets/preview.css';
import './storybook-reset.css';

import { themes } from '@storybook/theming';

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
    backgrounds: {
      default: 'figma-dark',
      grid: {
        cellSize: 8,
        cellAmount: 4,
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.dark,
    },
    darkMode: {
      current: 'dark',
      // dark: { ...themes.dark },
      // light: { ...themes.normal },
      darkClass: 'figma-dark',
      lightClass: 'figma-light',
      figJamClass: 'figjam',
      classTarget: 'html',
      stylePreview: true,
    },
  },
  tags: ['autodocs', 'autodocs'],
};

export default preview;
