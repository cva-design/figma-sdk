<script context="module" lang="ts">
	import { Section } from '$ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	export const meta = {
		title: 'ui/Section',
		component: Section,
		argTypes: {
			class: { control: 'text' }
		}
	};
</script>

<Template let:args>
	<Section {...args}>
		{args.content}
	</Section>
</Template>

<Story
	name="Default"
	args={{
		content: 'Default Section'
	}}
/>

<Story
	name="With Custom Class"
	args={{
		content: 'Section with custom class',
		class: 'custom-section'
	}}
/>

<Story
	name="With Long Content"
	args={{
		content: 'This is a section with longer content to demonstrate how it handles text wrapping and alignment. It should maintain its height and properly align the text.'
	}}
/>

<Story
	name="Empty Section"
	args={{
		content: ''
	}}
/>

<style>
	:global(.custom-section) {
		background-color: var(--figma-color-bg-secondary);
	}
</style>