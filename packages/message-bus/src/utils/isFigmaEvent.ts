import { type FigmaEventName, FigmaEventTypes } from '../types';

export function isFigmaEvent(eventName: string): eventName is FigmaEventName {
  if (!eventName) {
    throw new Error(
      `eventName must be one of the Figma event types: ${Object.values(FigmaEventTypes).join(', ')}`,
    );
  }

  return !eventName.includes(':event');
}
