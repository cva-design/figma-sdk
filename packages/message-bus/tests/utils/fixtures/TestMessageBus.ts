import type { FigmaCommands, FigmaEvents } from '../../../src/types/figma-events';
import type { EventsDefinition } from '../../../src/types/message-handling';
import { MessageBus } from '../../../src/MessageBus';

export class TestMessageBus<Events extends EventsDefinition<Events>> extends MessageBus<{}, Events> {
  private eventValidators = new Map<keyof Events, (event: Events[keyof Events]) => boolean>();

  mockEventValidation<K extends keyof Events>(
    eventName: K,
    validator: (event: Events[K]) => boolean
  ): void {
    this.eventValidators.set(eventName, validator as (event: Events[keyof Events]) => boolean);
  }

  override publishEvent<K extends keyof Events>(
    name: K,
    payload: Events[K],
    scope?: string
  ): void {
    const validator = this.eventValidators.get(name);
    if (validator) {
      validator(payload);
    }
    super.publishEvent(name, payload, scope);
  }
}

export type { FigmaCommands, FigmaEvents };