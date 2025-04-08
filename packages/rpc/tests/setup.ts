import { Mock, mock } from 'bun:test';

declare global {
  // Extend the global scope for Node.js environment if needed
  namespace NodeJS {
    interface Global {
      figma: {
        ui: {
          postMessage: Mock<any>;
          on: Mock<any>;
        };
      };
    }
  }
  // Extend the Window interface for browser-like environments (jsdom)
  interface Window {
     figma: {
        ui: {
          postMessage: Mock<any>;
          on: Mock<any>;
        };
      };
  }
}

// It's generally safer to set these up in a beforeEach/setup function within tests
// rather than globally in setup.ts, especially if tests might modify them.
// However, if they are constant mocks needed everywhere, this can be okay.

// Mock figma global using explicit cast
(globalThis as any).figma = {
  ui: {
    postMessage: mock(),
    on: mock()
  }
};

// Mock parent window using explicit cast
(globalThis as any).parent = {
  postMessage: mock()
};

// Mock window.addEventListener
window.addEventListener = mock();