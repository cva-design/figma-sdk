<script context="module" lang="ts">
	import { Icon } from '$ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	// You'll need to import some SVG icons to use in the stories
	import { PlusSvg, StarOnSvg } from '$icons';

	export const meta = {
		
		component: Icon,
		argTypes: {
			iconUrl: { control: 'text' },
			spin: { control: 'boolean' },
			iconText: { control: 'text' },
			color: { control: 'text' },
			class: { control: 'text' }
		}
	};
</script>

<Template let:args>
	<Icon {...args} />
</Template>

<Story
	name="Default Icon"
	args={{
		iconUrl: StarOnSvg
	}}
/>

<Story
	name="Spinning Icon"
	args={{
		iconUrl: PlusSvg,
		spin: true
	}}
/>

<Story
	name="Text Icon"
	args={{
		iconText: 'A'
	}}
/>

<Story
	name="Colored Icon"
	args={{
		iconUrl: PlusSvg,
		color: '--figma-color-text'
	}}
/>

<Story
	name="Custom Class"
	args={{
		iconUrl: StarOnSvg,
		class: 'custom-icon-class'
	}}
/>
