<script context="module" lang="ts">
	import { Radio } from '$ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	let groupV = 'option2';
	export const meta = {
		title: 'ui/components/Radio',
		component: Radio,
		argTypes: {
			group: { control: 'text' },
			value: { control: 'text' },
			disabled: { control: 'boolean' },
			tabindex: { control: 'number' },
			className: { control: 'text' }
		}
	};

	let groupValue = 'option1';
</script>

<Template let:args>
	<Radio {...args} bind:group={groupValue}>
		{args.label}
	</Radio>
</Template>

<Story
	name="Default"
	args={{
		value: 'option1',
		label: 'Option 1'
	}}
/>

<Story
	name="Unchecked"
	args={{
		value: 'option2',
		label: 'Option 2'
	}}
/>

<Story
	name="Disabled"
	args={{
		value: 'option3',
		label: 'Disabled Option',
		disabled: true
	}}
/>

<Story
	name="Custom Class"
	args={{
		value: 'option4',
		label: 'Custom Class Option',
		className: 'custom-radio'
	}}
/>

<Story name="Radio Group">

	<Radio bind:group={groupV} value="option1">Option 1</Radio>
	<Radio bind:group={groupV} value="option2">Option 2</Radio>
	<Radio bind:group={groupV} value="option3">Option 3</Radio>
	<p>Selected value: {groupV}</p>
</Story>