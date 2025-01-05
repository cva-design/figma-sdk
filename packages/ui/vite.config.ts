import { sveltekit } from '@sveltejs/kit/vite';
import { svelteInspector } from '@sveltejs/vite-plugin-svelte-inspector';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    sveltekit(),
    svelteInspector()
  ],
  server: {
    fs: {
      allow: [
        __dirname,
        path.resolve(__dirname, '..'),
        path.resolve(__dirname, '..', '..'),
      ],
    },
  },
});
