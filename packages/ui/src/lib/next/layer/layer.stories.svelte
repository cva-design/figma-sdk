<script context="module" lang="ts">
import { getIconPath } from "$icons/cfp/util";
import { Layer } from "$ui";
import { Story } from "@storybook/addon-svelte-csf";

const IconLayerFrame16 = getIconPath("layer-frame", 16);

import type { SvelteComponent } from 'svelte';

export const meta = {
	component: Layer,
	parameters: {
		fixedWidth: true,
	},
};
</script>

<Story name="Frame">
	<Layer type="FRAME" name="Frame 1" on:change on:valueChange></Layer>
</Story>

<Story name="Component Selected">
	<Layer type="COMPONENT" name="Component 1" component selected on:change on:valueChange></Layer>
</Story>

<Story name="Top-level Layers">
	<Layer type="FRAME" name="Frame 1" bold on:change on:valueChange></Layer>
	<Layer type="SECTION" bold selected name="Section 1" on:change on:valueChange></Layer>
</Story>

<Story name="With Description">
	<Layer
		type="FRAME"
		name="Frame 1"
		description="Description"
		selected={false}
		on:change
		on:valueChange
	></Layer>
</Story>

<Story name="With Children">
	<Layer type="FRAME" name="Frame 1" on:change on:valueChange>
		<Layer type="COMPONENT" name="Component 1" component on:change on:valueChange />
		<Layer type="FRAME" name="Frame 2" on:change on:valueChange />
	</Layer>
</Story>
