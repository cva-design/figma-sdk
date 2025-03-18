/**
 * The type of alert to display.
 * - success: Used for successful operations or positive feedback
 * - warning: Used for warning messages that require attention
 * - danger: Used for error messages or dangerous operations
 * - hint: Used for general hints and tips
 * - info: Used for general informational messages
 */
export type AlertType = 'success' | 'warning' | 'danger' | 'hint' | 'info';

/**
 * The position/layout style of the alert.
 * - toast: Compact layout suitable for notifications, 40px height with horizontal alignment
 * - block: Full-width layout with more padding, suitable for inline messages
 */
export type AlertPosition = 'toast' | 'block';

export interface AlertProps {
  type?: AlertType;
  position?: AlertPosition;
}
