import { sveltekit } from '@sveltejs/kit/vite';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const baseUrl = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },

  // resolve: {
  //   alias: [
  //     // tsConfig.compilerOptions.paths,
  //     {
  //       find: /\$(ui|icons)(.*)?/,
  //       replacement: `${baseUrl}/lib/$1$2`,
  //     },
  //   ],
  // },
});
