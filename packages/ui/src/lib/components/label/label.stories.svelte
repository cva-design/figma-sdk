<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import Label from './label.svelte';

	export const meta = {
		
		component: Label,
		argTypes: {
			class: { control: 'text' }
		}
	} satisfies Meta<typeof Label>;
</script>

<Story name="Default">
	<Label>Default Label</Label>
</Story>

<Story name="WithCustomClass">
	<Label class="custom-label">Label with custom class</Label>
</Story>

<Story name="MultiLine">
	<div style="width: 200px;">
		<Label>This is a label that spans multiple lines to demonstrate text wrapping behavior</Label>
	</div>
</Story>

<Story name="WithContent">
	<Label>
		<span>Label with</span>
		<strong>formatted content</strong>
	</Label>
</Story>

<style>
	.custom-label {
		color: var(--figma-color-text-brand);
	}
</style> 