<script context="module" lang="ts">
import { Story } from "@storybook/addon-svelte-csf";
import Label from "./label.svelte";

import type { SvelteComponent } from 'svelte';

export const meta = {
	title: "Label",
	component: Label,
	argTypes: {
		size: {
			control: "select",
			options: ["small", "medium", "large"],
		},
		weight: {
			control: "select",
			options: ["default", "strong"],
		},
		align: {
			control: "select",
			options: ["start", "center", "end"],
		},
		block: { control: "boolean" },
	},
};
</script>

<Story name="Default">
	<Label>Default Label</Label>
</Story>

<Story name="Small">
	<Label size="small">Small Label</Label>
</Story>

<Story name="Large">
	<Label size="large">Large Label</Label>
</Story>

<Story name="Strong">
	<Label weight="strong">Strong Label</Label>
</Story>

<Story name="Centered">
	<Label align="center" block>Centered Label</Label>
</Story>
