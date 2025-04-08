import { mock } from 'bun:test';

// Keep type declarations for reference if needed, but don't rely on global assignment
// declare global { ... }

// Create and export mocks instead of assigning to globalThis
export const figmaMock = {
  ui: {
    postMessage: mock<(...args: any[]) => void>(),
    on: mock<(...args: any[]) => void>(),
  },
  on: mock<(...args: any[]) => void>(),
  off: mock<(...args: any[]) => void>(),
};

export const parentMock = {
  postMessage: mock<(...args: any[]) => any>(),
};

// No longer assign to globalThis
// (globalThis as any).figma = figmaMock;
// (globalThis as any).parent = parentMock;
