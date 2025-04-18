// import { IAssertionResult } from '@code/tests';
import type { AutocompletableString } from './types';
import { serialize } from './utils';

/**
 * Defines the structure for a custom event within the message bus system.
 * @template T - A unique string identifier for the event.
 * @template Message - The type of the message payload associated with the event.
 */
export interface EventDefinition<T extends AutocompletableString, Message> {
  /** The unique identifier for the event. */
  $id: T;
  /** Indicates the type of this definition (always 'event'). */
  $type: 'event';
  /** The type of the message payload for this event. */
  message: Message;
}

/**
 * Defines the structure for a Figma-specific event.
 * @template T - The specific Figma event type.
 * @template Message - The type of the message payload associated with the Figma event.
 */
export interface FigmaEventDefinition<T extends FigmaEvent, Message> {
  /** The specific Figma event identifier. */
  $id: T;
  /** Indicates the type of this definition (always 'figma-event'). */
  $type: 'figma-event';
  /** The type of the message payload for this Figma event. */
  message: Message;
}

// this enum will be filled in by
// @code/events.ts and @ui/events.ts
/**
 * Enumerates standard Figma plugin API events that the message bus can handle directly.
 */
export enum FigmaEvent {
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
  SelectionChanged = 'selectionchange',

  /**
   * This event will trigger when the user navigates to a different page,
   * or when the plugin changes the value of figma.currentPage.
   */
  CurrentPageChanged = 'currentpagechange',

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
   * @see {@link https://go.tokilabs.io/XllWDL|Figma API documentation}
   *
   */
  DocumentChanged = 'documentchange',

  /**
   * This event will trigger when objects outside Figma (such as elements from other browser windows,
   * or files from the local filesystem) are dropped onto the canvas.
   *
   * It can also be triggered by a special pluginDrop message sent from the UI.
   *
   * See the {@link https://go.tokilabs.io/WyOr65|Triggering drop events from the UI} section for more details.
   *
   */
  OnDrop = 'ondrop',

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
  OnClose = 'close',

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
  OnRun = 'run',

  TimerStarted = 'ontimerstarted',
  TimerPaused = 'ontimerpaused',
  TimerStopped = 'ontimerstopped',
  TimerDone = 'ontimerdone',
  TimerResume = 'ontimerresume',
  TimerAdjust = 'ontimeradjust',
}

/**
 * Represents the subset of `FigmaEvent` string literal names that do not have specific arguments
 * in their event handlers (i.e., their handlers are of type `() => void`).
 */
export type ArgFreeEventType =
  | 'selectionchange'
  | 'currentpagechange'
  | 'close'
  | 'timerstart'
  | 'timerpause'
  | 'timerstop'
  | 'timerdone'
  | 'timerresume'
  | 'timeradjust';

/**
 * Represents a registry mapping custom event IDs to their definitions.
 * @template TEventMessageMap - An object type where keys are event IDs (strings)
 *                              and values are the corresponding message payloads.
 */
export type EventRegistry<TEventMessageMap> = {
  // Maps each key K from TEventMessageMap to an EventDefinition.
  // Ensures that the key K is a string.
  [K in keyof TEventMessageMap]: K extends string
    ? EventDefinition<K, TEventMessageMap[K]>
    : never;
};

/**
 * Represents a registry mapping standard Figma event IDs (from `FigmaEvent`) to their `FigmaEventDefinition`.
 * This type extends the basic `EventRegistry` specifically for Figma events.
 */
export type FigmaEventRegistry = EventRegistry<FigmaEvent> & {
  /** Handler for the `selectionchange` Figma event. */
  [FigmaEvent.SelectionChanged]: FigmaEventDefinition<
    FigmaEvent.SelectionChanged,
    () => void
  >;
  [FigmaEvent.CurrentPageChanged]: FigmaEventDefinition<
    FigmaEvent.CurrentPageChanged,
    () => void
  >;
  [FigmaEvent.OnClose]: FigmaEventDefinition<FigmaEvent.OnClose, () => void>;
  [FigmaEvent.TimerStarted]: FigmaEventDefinition<
    FigmaEvent.TimerStarted,
    () => void
  >;
  [FigmaEvent.TimerPaused]: FigmaEventDefinition<
    FigmaEvent.TimerPaused,
    () => void
  >;
  [FigmaEvent.TimerStopped]: FigmaEventDefinition<
    FigmaEvent.TimerStopped,
    () => void
  >;
  [FigmaEvent.TimerDone]: FigmaEventDefinition<
    FigmaEvent.TimerDone,
    () => void
  >;
  [FigmaEvent.TimerResume]: FigmaEventDefinition<
    FigmaEvent.TimerResume,
    () => void
  >;
  [FigmaEvent.TimerAdjust]: FigmaEventDefinition<
    FigmaEvent.TimerAdjust,
    () => void
  >;
  [FigmaEvent.OnRun]: FigmaEventDefinition<FigmaEvent.OnRun, RunEvent>;

  [FigmaEvent.OnDrop]: FigmaEventDefinition<FigmaEvent.OnRun, DropEvent>;

  [FigmaEvent.DocumentChanged]: FigmaEventDefinition<
    FigmaEvent.OnRun,
    DocumentChangeEvent
  >;
};

/** Union type representing the values of the FigmaEvent enum. */
export type FigmaEventName = (typeof FigmaEvent)[keyof typeof FigmaEvent];

/**
 * Checks if a given event name corresponds to a standard Figma event.
 * @param eventName The name of the event to check.
 * @returns `true` if the event name is a standard Figma event name, `false` otherwise.
 * @throws Error if `eventName` is empty or undefined.
 */
export function isFigmaEvent(eventName: string): eventName is FigmaEvent {
  if (!eventName) {
    throw new Error(
      `eventName must be one of the Event enum values:${serialize(FigmaEvent)}`,
    );
  }

  // Figma events don't contain ':event' which is used to namespace custom events.
  return !eventName.includes(':event');
}
