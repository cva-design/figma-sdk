import { sveltekit } from '@sveltejs/kit/vite';
import path from 'node:path';
import { default as tsconfigPaths } from 'vite-tsconfig-paths';
import { type Plugin, defineConfig } from 'vitest/config';
import { svelteWarnings } from './src/lib/config/svelte-warnings/plugin';
// Debug plugin
const debugResolvePlugin = (): Plugin => ({
  name: 'debug-resolve',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      console.log(`Request URL: ${req.url}`);
      next();
    });
  },
  resolveId(source, importer) {
    console.log(`Resolving: ${source} from ${importer}`);
    return null;
  },
});

const config = defineConfig({
  root: path.resolve(__dirname, '.'),
  plugins: [
    debugResolvePlugin(),
    tsconfigPaths({
      root: path.resolve(__dirname, '.'),
    }) as Plugin,
    sveltekit(),
    svelteWarnings({
      disable: [/a11y*/],
      summary: 'all',
      listAllCodes: true,
    }),
  ],
  build: {
    sourcemap: true,
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
  server: {
    watch: {
      // usePolling: true,
      // interval: 100,
    },
  },
});

console.log(
  `
  ========================================
  Vite Config:
  ----------------------------------------
  ${JSON.stringify(config, null, 2)}
  ========================================
  `,
);

export default config;
