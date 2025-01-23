<script context="module" lang="ts">
	import Condition from './condition.svelte';
	import type { SelectMenuItem } from '#ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	export const meta = {
		title: 'Condition',
		component: Condition,
		tags: ['autodocs'],
		argTypes: {
			variant: { control: 'object' },
			operator: { control: 'object' },
			value: { control: 'object' }
		}
	};
</script>

<Template let:args>
	<Condition {...args} />
</Template>

<Story
	name="Default"
	args={{
		variant: null,
		operator: null,
		value: null
	}}
/>

<Story
	name="Pre-selected"
	args={{
		variant: { label: 'Primary', value: 'primary' },
		operator: { label: 'equals', value: 'equals' },
		value: { label: 'Success', value: 'success' }
	}}
/>

<style>
	:global(.sb-show-main) {
		padding: 1rem;
	}
</style> 