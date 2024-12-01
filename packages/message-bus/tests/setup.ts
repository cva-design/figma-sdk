import { vi } from 'vitest'

declare global {
  interface Window {
    parent: {
      postMessage: (msg: unknown, targetOrigin: string) => void;
    };
  }
  
  var figma: {
    ui: {
      postMessage: (msg: unknown) => void;
      on: (event: string, callback: (msg: unknown) => void) => void;
      off: (event: string, callback: (msg: unknown) => void) => void;
    };
    on: (event: string, callback: (...args: unknown[]) => void) => void;
    off: (event: string, callback: (...args: unknown[]) => void) => void;
    currentPage: {
      selection: unknown[];
    };
  };
}

// Mock figma global
global.figma = {
  ui: {
    postMessage: vi.fn(),
    on: vi.fn(),
    off: vi.fn()
  },
  on: vi.fn(),
  off: vi.fn(),
  currentPage: {
    selection: []
  }
}

// Mock window.parent
window.parent = {
  postMessage: vi.fn()
}

// Mock window.addEventListener
window.addEventListener = vi.fn() 