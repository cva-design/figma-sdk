<script context="module" lang="ts">
	import Set from './set.svelte';
	import type { SelectMenuItem } from '#ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	export const meta = {
		title: 'Set',
		component: Set,
		tags: ['autodocs'],
		argTypes: {
			property: { control: 'object' },
			value: { control: 'text' }
		}
	};
</script>

<Template let:args>
	<Set {...args} />
</Template>

<Story
	name="Default"
	args={{
		property: null,
		value: ''
	}}
/>

<Story
	name="Pre-selected"
	args={{
		property: { label: 'Fill', value: 'fill' },
		value: '#fff'
	}}
/>

<style>
	:global(.sb-show-main) {
		padding: 1rem;
	}
</style> 