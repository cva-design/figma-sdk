import type { RunEvent } from '@figma/plugin-typings';
import type { Jsonify, Simplify } from 'type-fest';
import type { EventRegistry } from './registries';

/**
 * Core Figma events that handle the main plugin functionality
 */
export type CoreEvents = Jsonify<{
  /**
   * This event will trigger when the selection of the current page changes.
   *
   * Note also that changing the selection via the plugin API,
   * then changing it back to its previous value immediately still triggers the event.
   *
   * @remarks
   * This can happen:
   *  - By user action.
   *  - Due to plugin code.
   *  - When the current page changes
   *    (a "currentpagechange" event always triggers a "selectionchange" event).
   *  - When a selected node is deleted.
   *  - When a selected node becomes the child of another selected node
   *    (in which case it is considered indirectly selected,
   *    and is no longer in figma.currentPage.selection)
   */
  SelectionChanged: () => void;

  /**
   * This event will trigger when the user navigates to a different page,
   * or when the plugin changes the value of figma.currentPage.
   */
  CurrentPageChanged: () => void;

  /**
   * This event will trigger when a change is made to the currently open file.
   *
   * The event will be called when nodes/styles are either added, removed, or changed in a document.
   *
   * @remarks
   * Note that DocumentChangeEvent has a documentChanges property with an array of DocumentChanges.
   * Figma will not call the 'documentchange' callback synchronously and will instead batch the
   * updates and send them to the callback periodically
   *
   * There are many different DocumentChange types. Check the Figma API documentation for more details.
   * @see {@link https://www.figma.com/plugin-docs/api/DocumentChange/|Figma API documentation}
   */
  DocumentChanged: DocumentChangeEvent;

  /**
   * This event will trigger when objects outside Figma (such as elements from other browser windows,
   * or files from the local filesystem) are dropped onto the canvas.
   *
   * It can also be triggered by a special pluginDrop message sent from the UI.
   *
   * See the {@link https://www.figma.com/plugin-docs/creating-ui/#triggering-drop-events-from-the-ui|Triggering drop events from the UI} section for more details.
   */
  OnDrop: DropEvent;

  /**
   * This event will trigger when the plugin is about to close, either from
   * a call to figma closePlugin() or the user closing the plugin via the UI.
   *
   * ! You should use this API only if strictly necessary,
   * ! and run as little code as possible in the callback when doing so.
   *
   * This is a good place to run cleanup actions. For example, some plugins
   * add UI elements in the canvas by creating nodes. These UI elements should
   * be deleted when the plugin is closed.
   *
   * @remarks
   * Note that you don't need to call figma.closePlugin() again in this function.
   *
   * When a user closes a plugin, they expect it to be closed immediately.
   * Having long-running actions in the closing callback prevents the plugin for closing promptly.
   *
   * This is also not the place to run any asynchronous actions (e.g. register callbacks, using
   * await, etc). The plugin execution environment will be destroyed immediately when all the
   * callbacks have returned, and further callbacks will not be called.
   */
  OnClose: () => void;

  /**
   * This event is triggered when a plugin is run.
   *
   * Handling the run event is only required for plugins with parameters.
   *
   * @remarks
   * For all plugins it can still be a convenient spot to put your top level code,
   * since it is called on every plugin run.
   *
   * For plugins with parameters, this happens after all parameters have been enter by the user
   * in the quick action UI. For all other plugins this happens immediately after launch.
   */
  OnRun: RunEvent;
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
declare type ArgFreeEventType =
  | 'selectionchange'
  | 'currentpagechange'
  | 'close'
  | 'timerstart'
  | 'timerstop'
  | 'timerpause'
  | 'timerresume'
  | 'timeradjust'
  | 'timerdone';
// Enum for backward compatibility
export enum FigmaEvent {
  SelectionChanged = 'figma:event/selection-changed',
  CurrentPageChanged = 'figma:event/current-page-changed',
  DocumentChanged = 'figma:event/document-changed',
  OnDrop = 'figma:event/on-drop',
  OnClose = 'figma:event/on-close',
  OnRun = 'figma:event/on-run',
  TimerStarted = 'timer:event/timer-started',
  TimerPaused = 'timer:event/timer-paused',
  TimerStopped = 'timer:event/timer-stopped',
  TimerDone = 'timer:event/timer-done',
  TimerResume = 'timer:event/timer-resume',
  TimerAdjust = 'timer:event/timer-adjust',
}

// Event definition type (kept for backward compatibility)
export interface FigmaEventDefinition<T extends FigmaEvent, Message> {
  $id: T;
  $type: 'figma-event';
  message: Message;
}
