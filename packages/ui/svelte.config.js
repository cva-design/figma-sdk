import { preprocessMeltUI } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sequence from 'svelte-sequential-preprocessor';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $actions: 'src/lib/actions',
      '$actions/*': 'src/lib/actions/*',
      $lib: 'src/lib',
      '$lib/*': 'src/lib/*',
      $ui: 'src/lib/components',
      '$ui/*': 'src/lib/components/*',
      '$icons/16': 'src/lib/icons/cfp/size-16/index.ts',
      '$icons/16/*': 'src/lib/icons/cfp/size-16/*',
      '$icons/32': 'src/lib/icons/cfp/size-32/index.ts',
      '$icons/32/*': 'src/lib/icons/cfp/size-32/*',
      // BE CAREFULL! ORDER IS IMPORTANT HERE!
      $icons: 'src/lib/icons/index.ts',
      '$icons/*': 'src/lib/icons/*',
    },
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: [
        __dirname,
        // Adjust this path according to your project structure
        path.resolve(__dirname, '..'),
        path.resolve(__dirname, '..', '..'),
      ],
    },
  },
  preprocess: sequence([vitePreprocess({}), preprocessMeltUI()]),
};

export default config;
