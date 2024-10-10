import type { Preview } from '@storybook/svelte';

// GLOBAL STYLES
import '../src/stories/assets/preview.css';

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
    tags: ['autodocs'],
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
};

export default preview;
