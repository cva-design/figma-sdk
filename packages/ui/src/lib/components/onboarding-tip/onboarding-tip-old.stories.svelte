<script context="module" lang="ts">
	import { PlusSvg } from '$icons';
	import { OnboardingTip } from '$ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	export const meta = {
		
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
		iconName: PlusSvg,
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
		iconName: PlusSvg,
		spin: true,
		content: 'This OnboardingTip has a spinning icon.'
	}}
/>

<Story
	name="Custom Color"
	args={{
		iconName: PlusSvg,
		color: 'yellow',
		content: 'This OnboardingTip uses a custom color for the icon.'
	}}
/>

<Story
	name="Long Content"
	args={{
		iconName: PlusSvg,
		content:
			'This OnboardingTip has longer content to demonstrate how it wraps. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc.'
	}}
/>
