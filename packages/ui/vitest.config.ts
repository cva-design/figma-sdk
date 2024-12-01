/// <reference types="vitest" />
import { defineProject, mergeConfig } from 'vitest/config';
import configShared from '../../vitest.shared';

export default mergeConfig(
  configShared,
  defineProject({
    test: {
      name: 'ui',
      setupFiles: ['./tests/setup.ts'],
      include: ['./src/**/*.test.ts', './tests/**/*.test.ts'],
    },
  }),
);
