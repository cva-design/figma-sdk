import type { Preview } from '@storybook/svelte';

import '../docs/assets/storybook/index.scss';

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
    docs: {
      theme: themes.dark,
    },
    options: {
      storySort: {
        order: ['Intro', 'Get Started', 'Architecture', 'Github Template', '*'],
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
