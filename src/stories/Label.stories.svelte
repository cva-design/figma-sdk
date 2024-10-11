<script context="module" lang="ts">
	import { Label } from '$ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	export const meta = {
		title: 'ui/Label',
		component: Label,
		argTypes: {
			class: { control: 'text' }
		}
	};
</script>

<Template let:args>
	<Label {...args}>
		{args.content || 'Label Text'}
	</Label>
</Template>

<Story
	name="Default"
	args={{
		content: 'Default Label'
	}}
/>

<Story
	name="Custom Class"
	args={{
		content: 'Custom Styled Label',
		class: 'custom-label'
	}}
/>

<Story
	name="Long Text"
	args={{
		content: 'This is a label with a very long text to demonstrate how it handles overflow'
	}}
/>

<style>
	:global(.custom-label) {
		color: var(--figma-color-text-brand);
		font-weight: var(--font-weight-strong);
	}
</style>
