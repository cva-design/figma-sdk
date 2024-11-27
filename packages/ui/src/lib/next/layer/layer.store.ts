import { writable } from 'svelte/store';

interface LayerSelection {
  selectedId: string | null;
}

function createLayerSelectionStore() {
  const { subscribe, set, update } = writable<LayerSelection>({
    selectedId: null,
  });

  return {
    subscribe,
    select: (id: string) => update((state) => ({ selectedId: id })),
    deselect: () => update((state) => ({ selectedId: null })),
  };
}

export const layerSelection = createLayerSelectionStore();
