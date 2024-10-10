<script context="module" lang="ts">
	import { Checkbox } from '$ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	export const meta = {
		title: 'ui/Checkbox',
		component: Checkbox,
		argTypes: {
			checked: { control: 'boolean' },
			mixed: { control: 'boolean' },
			disabled: { control: 'boolean' },
			onChange: { action: 'changed' }
		}
	};
</script>

<Template let:args>
	<Checkbox {...args} on:change={args.onChange}>
		{args.children}
	</Checkbox>
</Template>

<Story
	name="Unchecked"
	args={{
		children: 'Unchecked Checkbox'
	}}
/>

<Story
	name="Checked"
	args={{
		children: 'Checked Checkbox',
		checked: true
	}}
/>

<Story
	name="Mixed"
	args={{
		children: 'Mixed Checkbox',
		mixed: true
	}}
/>

<Story
	name="Disabled"
	args={{
		children: 'Disabled Checkbox',
		disabled: true
	}}
/>

<Story
	name="Disabled Checked"
	args={{
		children: 'Disabled Checked Checkbox',
		checked: true,
		disabled: true
	}}
/>
