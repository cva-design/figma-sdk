<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { Section } from './index.ts';

	export const meta = {
		
		component: Section,
		argTypes: {
			class: { control: 'text' }
		}
	} satisfies Meta<typeof Section>;
</script>

<Story name="Default">
	<Section>Default Section</Section>
</Story>

<Story name="WithCustomClass">
	<Section class="custom-section">Section with custom class</Section>
</Story>

<Story name="WithContent">
	<Section>
		<div style="display: flex; align-items: center; gap: 8px;">
			<span>Section with</span>
			<strong>formatted content</strong>
		</div>
	</Section>
</Story>

<Story name="WithLongContent">
	<div style="width: 200px;">
		<Section>
			This is a section header that demonstrates how long content is handled and text wrapping behavior
		</Section>
	</div>
</Story>

<style>
	.custom-section {
		background-color: var(--figma-color-bg-secondary);
	}
</style> 