import type { ComponentType } from 'svelte';
import Icon from './icon.svelte';

type Options = {
  path: string;
  displayName?: string;
  viewBox?: string;
};

export function createIcon(options: Options) {
  const { path, viewBox = '0 0 24 24' } = options;

  return {
    component: Icon as ComponentType,
    props: {
      path,
      viewBox,
    },
  };
}
