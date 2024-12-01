import '@figma/plugin-typings';
import { vi } from 'vitest'

declare global {
  var parent: {
    postMessage: (msg: unknown, targetOrigin: string) => void;
  };
}

// Mock figma global
global.figma = {
  ui: {
    postMessage: vi.fn(),
    on: vi.fn()
  }
} as any

// Mock parent window
global.parent = {
  postMessage: vi.fn()
}

// Mock window.addEventListener
window.addEventListener = vi.fn() 