// Core exports
export { MessageBus } from './MessageBus';
export { ValidationManager } from './ValidationManager';

// Integration exports
export { FigmaIntegration } from './integrations/figma';
export { PluginUIIntegration } from './integrations/plugin-ui';

// Type exports
export type { MessageBusOptions } from './MessageBus';
export type { ValidationManager as IValidationManager } from './ValidationManager';
export type {
  Accepted,
  Rejected,
  Handler,
  Listener,
  DeregisterFn,
} from './types/message-handling';
export type {
  ValidationError,
  ValidationResult,
  ValidationSchema,
} from './types/validation';
export type {
  MessageEnvelope,
  MessageId,
  CommandRegistry,
  EventRegistry,
} from './types/messages';
export type {
  FigmaEvent,
  FigmaEventMap,
  SelectionChangedEvent,
  CurrentPageChangedEvent,
  DocumentChangedEvent,
  PluginRunEvent,
  TimerPauseEvent,
  TimerResumeEvent,
  TimerStartEvent,
  TimerStopEvent,
  UIResizedEvent,
  UIVisibilityChangedEvent,
  ViewportChangedEvent,
} from './types/figma-events';
