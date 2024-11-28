<script context="module" lang="ts">
import { SelectDivider } from "$ui";
import { Story, Template } from "@storybook/addon-svelte-csf";

import type { SvelteComponent } from 'svelte';

export const meta = {
	component: SelectDivider,
	argTypes: {
		label: { control: "boolean" },
		content: { control: "string" },
	},
};
</script>

<Template let:args>
	<div style="width: 200px; border: 1px solid var(--color-border-menu); border-radius: 4px;">
		<ul style="list-style-type: none; padding: 0; margin: 0;">
			<li style="padding: 8px;">Menu item above</li>
			<SelectDivider {...args}>
				{#if args.label}
					<p>{args.content}</p>
				{/if}
			</SelectDivider>
			<li style="padding: 8px;">Menu item below</li>
		</ul>
	</div>
</Template>

<Story
	name="Divider"
	args={{
		label: false
	}}
/>

<Story
	name="Label"
	args={{
		label: true,
		content: 'Section Label'
	}}
/>

<Story
	name="Label with Long Text"
	args={{
		label: true,
		content: 'This is a longer section label to demonstrate text wrapping'
	}}
/>