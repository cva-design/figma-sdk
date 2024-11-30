import type { Layer } from '../layer';

export interface ITreeNode {
  id: string;
  title: string;
  icon?: string;
  children?: ITreeNode[];
  actions?: Action[];
  data?: object;
  state?: {
    expanded?: boolean;
    [key: string]: unknown;
  };
}

export interface TreeOptions {
  indentationWidth: number;
  expandIcon?: string;
  collapseIcon?: string;
  showLayerIcon: boolean;
  defaultActions: Action[];
}

export interface Action {
  id: string;
  icon: string;
  tooltip: string;
  enabled?: boolean;
  active?: boolean;
  click?: (context: { action: Action; event: Event; layer: Layer }) => void;
}
