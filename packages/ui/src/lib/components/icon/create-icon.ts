import type { ComponentType } from 'svelte';
import FkIcon from './fk-icon.svelte';

type Options = {
  path: string;
  displayName?: string;
  viewBox?: string;
};

export function createIcon(options: Options) {
  const { path, viewBox = '0 0 24 24' } = options;

  return {
    component: FkIcon as ComponentType,
    props: {
      path,
      viewBox,
    },
  };
}
