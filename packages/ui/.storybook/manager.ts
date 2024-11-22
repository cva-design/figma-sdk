import { addons } from '@storybook/manager-api';
import theme from './theme';

import '../docs/assets/storybook/manager.css';

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
  },
  toolbar: {},
});
