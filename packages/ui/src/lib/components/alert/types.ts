export type AlertType = 'success' | 'warning' | 'danger' | 'hint';

export interface AlertProps {
  text: string;
  type: AlertType;
}
