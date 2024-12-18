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

/**
 * Figma event map
 */
export interface FigmaEventMap {
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
export type SelectionChangedEvent = FigmaEventMap['SelectionChanged'];
export type CurrentPageChangedEvent = FigmaEventMap['CurrentPageChanged'];
export type DocumentChangedEvent = FigmaEventMap['DocumentChanged'];
export type ViewportChangedEvent = FigmaEventMap['ViewportChanged'];
export type PluginRunEvent = FigmaEventMap['PluginRun'];
export type PluginCloseEvent = FigmaEventMap['PluginClose'];
export type ErrorEvent = FigmaEventMap['Error'];
export type TimerStartEvent = FigmaEventMap['TimerStart'];
export type TimerStopEvent = FigmaEventMap['TimerStop'];
export type TimerPauseEvent = FigmaEventMap['TimerPause'];
export type TimerResumeEvent = FigmaEventMap['TimerResume'];
export type UIVisibilityChangedEvent = FigmaEventMap['UIVisibilityChanged'];
export type UIResizedEvent = FigmaEventMap['UIResized'];
export type CommandExecutedEvent = FigmaEventMap['CommandExecuted'];
export type ContextInitializedEvent = FigmaEventMap['ContextInitialized'];

// Export event name type
export type FigmaEventName = keyof FigmaEventMap;
