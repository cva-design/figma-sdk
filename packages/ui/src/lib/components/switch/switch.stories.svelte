<script context="module" lang="ts">
	import { Switch } from '#ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	export const meta = {
		title: 'Switch',
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
		label: 'Switch Label',
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
