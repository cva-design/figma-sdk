import type { Preview } from '@storybook/svelte';
import { themes } from '@storybook/theming';
import DualTheme from '../docs/docs-ui/decorators/dual-theme.svelte';

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
    // backgrounds: {
    //   default: 'figma-dark',
    //   grid: {
    //     cellSize: 8,
    //     cellAmount: 4,
    //   },
    // },
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
  decorators: [
    (story, { parameters }) =>
      parameters.dualTheme !== false ? (DualTheme as any) : story(),
  ],
  tags: ['autodocs'],
};

export default preview;
