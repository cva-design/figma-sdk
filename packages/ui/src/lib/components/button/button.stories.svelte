<script context="module" lang="ts">
import { Story } from "@storybook/addon-svelte-csf";
import Button from "./button.svelte";

import type { SvelteComponent } from 'svelte';

export const meta = {
	title: "Button",
	component: Button,
	argTypes: {
		variant: {
			control: "select",
			options: [
				"primary",
				"secondary",
				"inverse",
				"destructive",
				"success",
				"text",
			],
		},
		size: {
			control: "select",
			options: ["small", "medium"],
		},
		fullWidth: { control: "boolean" },
		onClick: { action: "clicked" },
	},
};
</script>

<Story name="Primary">
	<Button variant="primary" on:click>Primary Button</Button>
</Story>

<Story name="Secondary">
	<Button variant="secondary" on:click>Secondary Button</Button>
</Story>

<Story name="Destructive">
	<Button variant="destructive" on:click>Destructive Button</Button>
</Story>

<Story name="Inverse">
	<Button variant="inverse" on:click>Inverse Button</Button>
</Story>

<Story name="Success">
	<Button variant="success" on:click>Success Button</Button>
</Story>

<Story name="Text">
	<Button variant="text" on:click>Text Button</Button>
</Story>

<Story name="Disabled">
	<Button disabled on:click>Disabled Button</Button>
</Story>

<Story name="Full Width">
	<Button fullWidth on:click>Full Width Button</Button>
</Story>

<Story name="Medium Size">
	<Button size="medium" on:click>Medium Button</Button>
</Story>
