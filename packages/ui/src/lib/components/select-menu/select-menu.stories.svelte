<script context="module" lang="ts">
	import { SelectMenu } from '$ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	export const meta = {
		title: 'SelectMenu',
		component: SelectMenu,
		argTypes: {
			iconUrl: { control: 'text' },
			iconText: { control: 'text' },
			disabled: { control: 'boolean' },
			macOSBlink: { control: 'boolean' },
			menuItems: { control: 'object' },
			placeholder: { control: 'text' },
			value: { control: 'object' },
			showGroupLabels: { control: 'boolean' },
			class: { control: 'text' }
		}
	};

	const defaultMenuItems = [
		{ label: 'Option 1', group: 'Group 1' },
		{ label: 'Option 2', group: 'Group 1' },
		{ label: 'Option 3', group: 'Group 2' },
		{ label: 'Option 4', group: 'Group 2' }
	];
</script>

<Template let:args>
	<div style="width: 200px;">
		<SelectMenu {...args} />
	</div>
</Template>

<Story
	name="Default"
	args={{
		menuItems: defaultMenuItems,
		placeholder: 'Select an option'
	}}
/>

<Story
	name="Disabled"
	args={{
		menuItems: defaultMenuItems,
		placeholder: 'Select an option',
		disabled: true
	}}
/>

<Story
	name="With Groups (label above options)"
	args={{
		menuItems: defaultMenuItems,
		placeholder: 'Select an option',
		showGroupLabels: true
	}}
/>

<Story
	name="With custom icon"
	args={{
		menuItems: defaultMenuItems,
		placeholder: 'Select an option',
		icon: 'PlusSvg'
	}}
/>
<Story
	name="Pre-selected Value"
	args={{
		menuItems: defaultMenuItems,
		value: defaultMenuItems[1],
		placeholder: 'Select an option'
	}}
/>

<Story
	name="MacOS Blink"
	args={{
		menuItems: defaultMenuItems,
		placeholder: 'Select an option',
		macOSBlink: true
	}}
/>
