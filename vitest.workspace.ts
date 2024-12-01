import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'packages/message-bus/vitest.config.ts',
  'packages/rpc/vitest.config.ts',
  'packages/ui/vitest.config.ts',
  // 'packages/ui/vitest.storybook.cts'
]);
