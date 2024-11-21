<script context="module" lang="ts">
	import { Switch } from '$ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	export const meta = {
		title: 'ui/components/Switch',
		component: Switch,
		argTypes: {
			checked: { control: 'boolean' },
			name: { control: 'text' },
			value: { control: 'text' },
			disabled: { control: 'boolean' },
			class: { control: 'text' }
		}
	};
</script>

<Template let:args>
	<Switch {...args}>
		{args.label}
	</Switch>
</Template>

<Story
	name="Default"
	args={{
		label: 'Default Switch'
	}}
/>

<Story
	name="Checked"
	args={{
		label: 'Checked Switch',
		checked: true
	}}
/>

<Story
	name="Disabled"
	args={{
		label: 'Disabled Switch',
		disabled: true
	}}
/>

<Story
	name="Checked and Disabled"
	args={{
		label: 'Checked and Disabled Switch',
		checked: true,
		disabled: true
	}}
/>

<Story
	name="With Name and Value"
	args={{
		label: 'Switch with Name and Value',
		name: 'exampleSwitch',
		value: 'exampleValue'
	}}
/>

<Story
	name="With Custom Class"
	args={{
		label: 'Switch with Custom Class',
		class: 'custom-switch'
	}}
/>

<style>
	:global(.custom-switch) {
		margin-top: 10px;
		padding: 5px;
		background-color: var(--figma-color-bg-secondary);
		border-radius: var(--border-radius-small);
	}
</style>