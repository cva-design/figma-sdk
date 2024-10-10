<script context="module" lang="ts">
	import { Icon } from '$ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	// You'll need to import some SVG icons to use in the stories
	import { imgStarOn } from '../lib/icons/ui2/index.ts';
	import { imgPlus } from '../lib/icons/ui2/index.ts';

	export const meta = {
		title: 'ui/Icon',
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
		iconUrl: imgStarOn
	}}
/>

<Story
	name="Spinning Icon"
	args={{
		iconUrl: imgPlus,
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
		iconUrl: imgPlus,
		color: '--figma-color-text'
	}}
/>

<Story
	name="Custom Class"
	args={{
		iconUrl: imgStarOn,
		class: 'custom-icon-class'
	}}
/>
