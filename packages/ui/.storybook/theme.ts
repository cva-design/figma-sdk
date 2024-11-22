import { themes } from '@storybook/theming';
import { create } from '@storybook/theming';

export const theme = create({
  ...themes.dark,
  brandTitle: 'Figma Plugin SDK by CVA Design',
  brandUrl: '/',
  brandImage: '/docs/assets/fps-logotype.png',
  // https://cva.design/public/images/c_do_cva.png
  brandTarget: '_blank',
});

export default theme;
