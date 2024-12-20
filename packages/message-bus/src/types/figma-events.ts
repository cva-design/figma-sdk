import type { Simplify } from 'type-fest';

/**
 * Figma event types
 */
export const FigmaEventTypes = {
  selectionchange: 'selectionchange',
  currentpagechange: 'currentpagechange',
  close: 'close',
  documentchange: 'documentchange',
  run: 'run',
  viewportchange: 'viewportchange',
} as const;

export type FigmaEvent = (typeof FigmaEventTypes)[keyof typeof FigmaEventTypes];

export interface FigmaCommands {
  HandleTextReview: {
    text: string;
  };
}

/**
 * Figma event map
 */
export interface FigmaEvents {
  SelectionChanged: {
    nodes: Array<{
      id: string;
      type: string;
    }>;
  };

  CurrentPageChanged: {
    page: {
      id: string;
      name: string;
    };
  };

  DocumentChanged: {
    origin: 'local' | 'remote';
    documentChanges: Array<{
      id: string;
      type: string;
      property?: string;
      value?: unknown;
      node?: {
        id: string;
        type: string;
      };
    }>;
  };

  ViewportChanged: {
    center: { x: number; y: number };
    zoom: number;
  };

  PluginRun: {
    command: string;
    parameters?: Record<string, unknown>;
  };

  PluginClose: Record<string, never>;

  Error: {
    error: string;
  };

  TimerStart: {
    id: string;
  };

  TimerStop: {
    id: string;
  };

  TimerPause: {
    id: string;
  };

  TimerResume: {
    id: string;
  };

  UIVisibilityChanged: {
    visible: boolean;
  };

  UIResized: {
    width: number;
    height: number;
  };

  CommandExecuted: {
    command: string;
    parameters: Record<string, unknown>;
  };

  ContextInitialized: {
    viewport: {
      center: { x: number; y: number };
      zoom: number;
    };
    selection: Array<{
      id: string;
      type: string;
    }>;
  };
}

// Export individual event types from the FigmaEventMap
export type SelectionChangedEvent = FigmaEvents['SelectionChanged'];
export type CurrentPageChangedEvent = FigmaEvents['CurrentPageChanged'];
export type DocumentChangedEvent = FigmaEvents['DocumentChanged'];
export type ViewportChangedEvent = FigmaEvents['ViewportChanged'];
export type PluginRunEvent = FigmaEvents['PluginRun'];
export type PluginCloseEvent = FigmaEvents['PluginClose'];
export type ErrorEvent = FigmaEvents['Error'];
export type TimerStartEvent = FigmaEvents['TimerStart'];
export type TimerStopEvent = FigmaEvents['TimerStop'];
export type TimerPauseEvent = FigmaEvents['TimerPause'];
export type TimerResumeEvent = FigmaEvents['TimerResume'];
export type UIVisibilityChangedEvent = FigmaEvents['UIVisibilityChanged'];
export type UIResizedEvent = FigmaEvents['UIResized'];
export type CommandExecutedEvent = FigmaEvents['CommandExecuted'];
export type ContextInitializedEvent = FigmaEvents['ContextInitialized'];

// Export event name type
export type FigmaEventName = Simplify<keyof FigmaEvents>;
