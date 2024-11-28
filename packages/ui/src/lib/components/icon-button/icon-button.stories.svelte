<script context="module" lang="ts">
import { Icon } from "$ui/icon";
import { Story } from "@storybook/addon-svelte-csf";
import IconButton from "./icon-button.svelte";

import type { SvelteComponent } from 'svelte';

export const meta = {
	title: "IconButton",
	component: IconButton,
	argTypes: {
		size: {
			control: "select",
			options: ["small", "medium"],
		},
		activeAppearance: {
			control: "select",
			options: ["subtle", "solid"],
		},
		disableTooltip: {
			control: "boolean",
		},
	},
};
</script>

<Story name="Default">
	<IconButton aria-label="Star" on:click={() => alert('clicked')}>
		<Icon icon="AlertSvg"  />
	</IconButton>
</Story>

<Story name="Medium">
	<IconButton aria-label="Star" size="medium" on:click={() => alert('clicked')}>
		<Icon icon="StylesSvg" />
	</IconButton>
</Story>

<Story name="Solid">
	<IconButton aria-label="Star" activeAppearance="solid" on:click={() => alert('clicked')}>
		<Icon icon="StylesSvg" />
	</IconButton>
</Story>

<Story name="Custom Tooltip">
	<IconButton aria-label="Star" tooltipContent="Add to favorites" on:click={() => alert('clicked')}>
		<Icon icon="StylesSvg" />
	</IconButton>
</Story>

<Story name="Disabled">
	<IconButton aria-label="Star" disabled on:click={() => alert('clicked')}>
		<Icon icon="StylesSvg" />
	</IconButton>
</Story>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-2);
	}

	.section {
		padding: var(--space-2);
	}
</style>
