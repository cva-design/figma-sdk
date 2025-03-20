/**
 * API Implementation: Notify
 * 
 * This file implements the notify method of the CodeApi interface.
 * It displays a notification message in the Figma UI.
 * 
 * WHY THIS APPROACH:
 * - Separation: Keeps notification logic separate from other concerns
 * - Simple: Easy to understand and modify
 * - Consistent return value: Always returns "OK" as specified in the interface
 */

export function notify(message: string, options?: NotificationOptions): 'OK' {
  figma.notify(message, options);

  return 'OK';
}
