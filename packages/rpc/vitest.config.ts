/// <reference types="vitest" />
import { defineProject, mergeConfig } from 'vitest/config';
import configShared from '../../vitest.shared';

export default mergeConfig(
  configShared,
  defineProject({
    test: {
      name: 'rpc',
      setupFiles: ['./tests/setup.ts'],
      include: ['./tests/**/*.test.ts'],
    },
  }),
);
