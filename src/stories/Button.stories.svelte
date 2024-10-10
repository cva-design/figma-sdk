<script context="module" lang="ts">
	import { Button } from '$ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	export const meta = {
		title: 'ui/Button',
		component: Button,
		argTypes: {
			variant: {
				control: 'select',
				options: ['primary', 'secondary', 'tertiary']
			},
			disabled: { control: 'boolean' },
			destructive: { control: 'boolean' },
			onClick: { action: 'clicked' }
		}
	};
</script>

<Template let:args>
	<Button {...args} on:click={args.onClick}>
		{args.children}
	</Button>
</Template>

<Story
	name="Primary"
	args={{
		children: 'Primary Button',
		variant: 'primary'
	}}
/>

<Story
	name="Secondary"
	args={{
		children: 'Secondary Button',
		variant: 'secondary'
	}}
/>

<Story
	name="Tertiary"
	args={{
		children: 'Tertiary Button',
		variant: 'tertiary'
	}}
/>

<Story
	name="Disabled"
	args={{
		children: 'Disabled Button',
		disabled: true
	}}
/>

<Story
	name="Destructive"
	args={{
		children: 'Destructive Button',
		destructive: true
	}}
/>

<Story
	name="Destructive Secondary"
	args={{
		children: 'Destructive Secondary Button',
		variant: 'secondary',
		destructive: true
	}}
/>
