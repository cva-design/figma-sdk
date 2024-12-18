/// <reference types="vitest" />
import { defineProject, mergeConfig } from 'vitest/config';
import configShared from '../../vitest.shared';
import { resolve } from 'node:path';

export default mergeConfig(
  configShared,
  defineProject({
    test: {
      name: 'message-bus',
      setupFiles: ['./tests/setup.ts'],
      include: ['./tests/**/*.test.ts'],
      environment: 'jsdom',
      globals: true,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@figma-plugin-sdk/message-bus': resolve(__dirname, './src'),
        '@figma-plugin-sdk/message-bus/*': resolve(__dirname, './src/*'),
        '@tests': resolve(__dirname, './tests'),
      },
    },
  }),
);
