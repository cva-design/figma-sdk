import { writable } from 'svelte/store';

export const selectedNodeStore = writable<string | null>('');
