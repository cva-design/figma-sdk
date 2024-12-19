/// <reference types="bun-types" />
import { vi } from 'vitest';

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
      show: () => void;
      hide: () => void;
      resize: (width: number, height: number) => void;
    };
    on: (event: string, callback: (...args: unknown[]) => void) => void;
    off: (event: string, callback: (...args: unknown[]) => void) => void;
    currentPage: {
      selection: unknown[];
    };
    clientStorage: {
      getAsync: (key: string) => Promise<unknown>;
      setAsync: (key: string, value: unknown) => Promise<void>;
    };
    root: {
      children: unknown[];
    };
    viewport: {
      center: { x: number; y: number };
      zoom: number;
    };
  };
}

// Mock window object
global.window = {
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  parent: {
    postMessage: vi.fn(),
  },
} as any;

// Mock figma object
global.figma = {
  ui: {
    postMessage: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
    show: vi.fn(),
    hide: vi.fn(),
    resize: vi.fn(),
  },
  on: vi.fn(),
  off: vi.fn(),
  currentPage: {
    selection: [],
  },
  clientStorage: {
    getAsync: vi.fn().mockResolvedValue(null),
    setAsync: vi.fn().mockResolvedValue(undefined),
  },
  root: {
    children: [],
  },
  viewport: {
    center: { x: 0, y: 0 },
    zoom: 1,
  },
} as any;

// Reset all mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
  window.addEventListener = vi.fn();
  window.removeEventListener = vi.fn();
  window.parent.postMessage = vi.fn();
  
  // Ensure figma object is properly initialized
  global.figma = {
    ui: {
      postMessage: vi.fn(),
      on: vi.fn(),
      off: vi.fn(),
      show: vi.fn(),
      hide: vi.fn(),
      resize: vi.fn(),
    },
    on: vi.fn(),
    off: vi.fn(),
    currentPage: {
      selection: [],
    },
    clientStorage: {
      getAsync: vi.fn().mockResolvedValue(null),
      setAsync: vi.fn().mockResolvedValue(undefined),
    },
    root: {
      children: [],
    },
    viewport: {
      center: { x: 0, y: 0 },
      zoom: 1,
    },
  } as any;
  
  figma.ui.postMessage = vi.fn();
});
