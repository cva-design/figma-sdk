<script context="module" lang="ts">
	import { Type } from '$ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	export const meta = {
		title: 'ui/Type',
		component: Type,
		argTypes: {
			size: {
				control: 'select',
				options: ['xsmall', 'small', 'large', 'xlarge']
			},
			weight: {
				control: 'select',
				options: ['normal', 'medium', 'bold']
			},
			inverse: { control: 'boolean' },
			color: { control: 'text' },
			inline: { control: 'boolean' },
			class: { control: 'text' }
		}
	};
</script>

<Template let:args>
	<Type {...args}>
		{args.content || 'Sample Text'}
	</Type>
</Template>

<Story
	name="Default"
	args={{
		content: 'This is the default Type component'
	}}
/>

<Story
	name="Small Bold"
	args={{
		size: 'small',
		weight: 'bold',
		content: 'Small Bold Text'
	}}
/>

<Story
	name="Large Inverse"
	args={{
		size: 'large',
		inverse: true,
		content: 'Large Inverse Text'
	}}
>
	<div slot="wrapper" style="background-color: #333; padding: 10px;">
		<slot name="story" />
	</div>
</Story>

<Story
	name="XLarge Custom Color"
	args={{
		size: 'xlarge',
		color: '--figma-color-text-brand',
		content: 'XLarge Custom Color Text'
	}}
/>

<Story
	name="Inline"
	args={{
		inline: true,
		content: 'This is inline text. '
	}}
>
	<div slot="wrapper">
		<slot name="story" />
		<slot name="story" />
		<span>This text should appear on the same line.</span>
	</div>
</Story>

<style>
	/* Add any global styles for the stories here if needed */
</style>