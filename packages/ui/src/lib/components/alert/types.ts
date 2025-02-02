export type AlertType = 'success' | 'warning' | 'error' | 'hint';

export interface AlertProps {
  text: string;
  type: AlertType;
} 