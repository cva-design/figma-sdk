import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),

    alias: {
      $lib: 'src/lib',
      '$lib/*': 'src/lib/*',
      $ui: 'src/lib/ui',
      '$ui/*': 'src/lib/ui/*',
      '$icons/16': 'src/lib/icons/cfp/size-16/index.ts',
      '#icons/16': 'src/lib/icons/cfp/size-16/index.ts',
      '$icons/16/*': 'src/lib/icons/cfp/size-16/*',
      '$icons/32': 'src/lib/icons/cfp/size-32/index.ts',
      '$icons/32/*': 'src/lib/icons/cfp/size-32/*',
      // BE CAREFULL! ORDER IS IMPORTANT HERE!
      $icons: 'src/lib/icons/index.ts',
      '$icons/*': 'src/lib/icons/*',
    },
  },
};

export default config;
