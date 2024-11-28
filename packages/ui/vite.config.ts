import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: {
      allow: [
        __dirname,
        path.resolve(__dirname, '..'),
        path.resolve(__dirname, '..', '..'),
      ],
    },
  }
});
