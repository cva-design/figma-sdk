<script context="module" lang="ts">
	import { IconButton } from '$ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { imgStarOn } from '../lib/icons/ui2/index.ts';

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
		iconName: imgStarOn,
		iconText: null,
		selected: false,
		spin: false,
		class: ''
	}}
/>

<Story
	name="Selected"
	args={{
		iconName: imgStarOn,
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
		iconName: imgStarOn,
		iconText: null,
		selected: false,
		spin: true,
		class: ''
	}}
/>

<Story
	name="Custom Class"
	args={{
		iconName: imgStarOn,
		iconText: null,
		selected: false,
		spin: false,
		class: 'custom-class'
	}}
/>

