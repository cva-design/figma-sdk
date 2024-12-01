import { beforeAll } from 'vitest';
// 👇 If you're using Sveltekit, import from @storybook/sveltekit
import { setProjectAnnotations } from '@storybook/svelte';
// 👇 Import the exported annotations, if any, from the addons you're using; otherwise remove this

import * as previewAnnotations from './preview';
 
const annotations = setProjectAnnotations([previewAnnotations]);
 
// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);