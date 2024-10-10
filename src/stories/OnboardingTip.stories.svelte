<script context="module" lang="ts">
	import { OnboardingTip } from '$ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { imgPlus } from '../lib/icons/ui2/index.ts';

	export const meta = {
		title: 'ui/OnboardingTip',
		component: OnboardingTip,
		argTypes: {
			iconName: { control: 'text' },
			iconText: { control: 'text' },
			color: { control: 'text' },
			spin: { control: 'boolean' },
			class: { control: 'text' }
		}
	};
</script>

<Template let:args>
	<OnboardingTip {...args}>
		{args.content}
	</OnboardingTip>
</Template>

<Story
	name="Default"
	args={{
		iconName: imgPlus,
		content: 'This is a default OnboardingTip.'
	}}
/>

<Story
	name="With Icon Text"
	args={{
		iconText: 'i',
		content: 'This OnboardingTip uses icon text instead of an icon name.'
	}}
/>

<Story
	name="Spinning Icon"
	args={{
		iconName: imgPlus,
		spin: true,
		content: 'This OnboardingTip has a spinning icon.'
	}}
/>

<Story
	name="Custom Color"
	args={{
		iconName: imgPlus,
		color: 'yellow',
		content: 'This OnboardingTip uses a custom color for the icon.'
	}}
/>

<Story
	name="Long Content"
	args={{
		iconName: imgPlus,
		content: 'This OnboardingTip has longer content to demonstrate how it wraps. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc.'
	}}
/>