import '@figma/plugin-typings';
import { vi } from 'vitest'

// Extend the existing figma types from @figma/plugin-typings
export declare let figma: {
    ui: {
        postMessage: ReturnType<typeof vi.fn>;
        on: ReturnType<typeof vi.fn>;
    }
} & PluginAPI;

// Initialize the global `figma` object
(global as any).figma = {
    ui: {
        postMessage: vi.fn(),
        on: vi.fn()
    }
};

// Mock parent window
(global as any).parent = {
    postMessage: vi.fn()
} as unknown as Window;

// Mock window.addEventListener
window.addEventListener = vi.fn();