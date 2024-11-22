import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

import '../docs/assets/storybook/manager.css';

addons.setConfig({
  theme: themes.dark,
  sidebar: {
    showRoots: true,
  },
  toolbar: {},
});
