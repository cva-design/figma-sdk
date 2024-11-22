import { themes } from '@storybook/theming';
import { create } from '@storybook/theming';

import fpsLogo from '../docs/assets/fps-logotype.png';

export const theme = create({
  ...themes.dark,
  brandTitle: 'Figma Plugin SDK by CVA Design',
  brandUrl: '/',
  brandImage: fpsLogo,
  brandTarget: '_blank',
});

export default theme;
