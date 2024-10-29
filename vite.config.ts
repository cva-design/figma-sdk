import { sveltekit } from '@sveltejs/kit/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { default as tsconfigPaths } from 'vite-tsconfig-paths';
import { type Plugin, defineConfig } from 'vitest/config';
import { svelteWarnings } from './src/lib/config/svelte-warnings/plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
  // define: {
  //   __dirname: 'import.meta.dirname',
  //   __filename: 'import.meta.url',
  // },
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
  optimizeDeps: {
    exclude: ['fsevents'],
  },
  build: {
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
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
