<script context="module" lang="ts">
	import Criteria from './criteria.svelte';
	import type { SelectMenuItem } from '#ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	export const meta = {
		title: 'Criteria',
		component: Criteria,
		tags: ['autodocs'],
		argTypes: {
			rules: { control: 'object' }
		}
	};
</script>

<Template let:args>
	<Criteria {...args} />
</Template>

<Story
	name="Default"
	args={{
		rules: [
			{ variant: null, operator: null, value: null },
			{ variant: null, operator: null, value: null }
		]
	}}
/>

<Story
	name="Pre-selected"
	args={{
		rules: [
			{
				variant: { label: 'Variant', value: 'variant' },
				operator: { label: 'equals', value: 'equals' },
				value: { label: 'Neutral', value: 'neutral' }
			},
			{
				variant: { label: 'State', value: 'state' },
				operator: { label: 'equals', value: 'equals' },
				value: { label: 'Hover', value: 'hover' }
			}
		]
	}}
/>

<style>
	:global(.sb-show-main) {
		padding: 1rem;
	}
</style> 