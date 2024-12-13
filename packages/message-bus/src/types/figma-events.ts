import type { RunEvent } from '@figma/plugin-typings';
import type { Jsonify, Simplify } from 'type-fest';
import type { EventRegistry } from './registries';

/**
 * Core Figma events that handle the main plugin functionality
 */
export type CoreEvents = Jsonify<{
  /**
   * Triggered when the selection changes in the current page
   */
  SelectionChanged: () => void;

  /**
   * Triggered when the user switches to a different page or when 
   * figma.currentPage is changed programmatically
   */
  CurrentPageChanged: () => void;

  /**
   * Triggered when any changes are made to the document
   */
  DocumentChanged: DocumentChangeEvent;

  /**
   * Triggered when external content is dropped onto the canvas
   */
  OnDrop: DropEvent;

  /**
   * Triggered when the plugin is about to close
   */
  OnClose: () => void;

  /**
   * Triggered when the plugin starts
   */
  OnRun: RunEvent;

  /**
   * Triggered when a node is created in the document
   * @since Figma 2.0
   */
  CreateNode: {
    node: SceneNode;
    parent: BaseNode | null;
  };

  /**
   * Triggered when a node is deleted from the document
   * @since Figma 2.0
   */
  DeleteNode: {
    node: SceneNode;
  };

  /**
   * Triggered when the viewport changes (pan/zoom)
   * @since Figma 2.0
   */
  ViewportChanged: {
    viewport: {
      bounds: Rect;
      zoom: number;
    };
  };

  /**
   * Triggered when the user interacts with a plugin menu item
   * @since Figma 2.0
   */
  PluginMenuItemClick: {
    menuId: string;
  };

  /**
   * Triggered when the network status changes
   * @since Figma 2.0
   */
  NetworkStatusChanged: {
    isOnline: boolean;
  };
}>;

/**
 * Timer-related events for managing plugin timing functionality
 */
export type TimerEvents = Jsonify<{
  TimerStarted: () => void;
  TimerPaused: () => void;
  TimerStopped: () => void;
  TimerDone: () => void;
  TimerResume: () => void;
  TimerAdjust: () => void;
}>;

// Combined event names type
export type FigmaEventName = keyof CoreEvents | keyof TimerEvents;

// Combined registry type
export type FigmaEventRegistry = Simplify<
  EventRegistry<CoreEvents, 'figma'> | EventRegistry<TimerEvents, 'timer'>
>;

// Event types that don't take arguments
export type ArgFreeEventType =
  | 'selectionchange'
  | 'currentpagechange'
  | 'close'
  | 'timerstart'
  | 'timerstop'
  | 'timerpause'
  | 'timerresume'
  | 'timeradjust'
  | 'timerdone'
  | 'networkstatuschange';

// Enum for backward compatibility
export enum FigmaEvent {
  SelectionChanged = 'figma:event/selection-changed',
  CurrentPageChanged = 'figma:event/current-page-changed',
  DocumentChanged = 'figma:event/document-changed',
  OnDrop = 'figma:event/on-drop',
  OnClose = 'figma:event/on-close',
  OnRun = 'figma:event/on-run',
  CreateNode = 'figma:event/create-node',
  DeleteNode = 'figma:event/delete-node',
  ViewportChanged = 'figma:event/viewport-changed',
  PluginMenuItemClick = 'figma:event/plugin-menu-item-click',
  NetworkStatusChanged = 'figma:event/network-status-changed',
  TimerStarted = 'timer:event/timer-started',
  TimerPaused = 'timer:event/timer-paused',
  TimerStopped = 'timer:event/timer-stopped',
  TimerDone = 'timer:event/timer-done',
  TimerResume = 'timer:event/timer-resume',
  TimerAdjust = 'timer:event/timer-adjust'
}

// Event definition type (kept for backward compatibility)
export interface FigmaEventDefinition<T extends FigmaEvent, Message> {
  $id: T;
  $type: 'figma-event';
  message: Message;
}
