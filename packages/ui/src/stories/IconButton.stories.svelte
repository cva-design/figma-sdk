<script context="module" lang="ts">
	import { StarOnSvg } from '$icons';
	import { IconButton } from '$ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	export const meta = {
		title: 'ui/IconButton',
		component: IconButton,
		argTypes: {
			iconName: { control: 'text' },
			iconText: { control: 'text' },
			selected: { control: 'boolean' },
			spin: { control: 'boolean' },
			class: { control: 'text' },
			onClick: { action: 'clicked' }
		}
	};
</script>

<Template let:args>
	<IconButton {...args} on:click={args.onClick} />
</Template>

<Story
	name="Default"
	args={{
		iconName: StarOnSvg,
		iconText: null,
		selected: false,
		spin: false,
		class: ''
	}}
/>

<Story
	name="Selected"
	args={{
		iconName: StarOnSvg,
		iconText: null,
		selected: true,
		spin: false,
		class: ''
	}}
/>

<Story
	name="With Text"
	args={{
		iconName: '',
		iconText: 'Aaaa',
		selected: false,
		spin: false,
		class: ''
	}}
/>

<Story
	name="Spinning"
	args={{
		iconName: StarOnSvg,
		iconText: null,
		selected: false,
		spin: true,
		class: ''
	}}
/>

<Story
	name="Custom Class"
	args={{
		iconName: StarOnSvg,
		iconText: null,
		selected: false,
		spin: false,
		class: 'custom-class'
	}}
/>
