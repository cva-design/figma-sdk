<script context="module" lang="ts">
	import { Radio } from '$ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	const groupV = 'option2';

	export const meta = {
		title: 'Radio',
		component: Radio,
		argTypes: {
			group: { control: 'text' },
			value: { control: 'text' },
			disabled: { control: 'boolean' },
			tabindex: { control: 'number' },
			className: { control: 'text' }
		}
	};

	// biome-ignore lint/style/useConst: it is used in svelte `bind:group`
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
	<Radio bind:group={groupValue} value="option1">Option 1</Radio>
	<Radio bind:group={groupValue} value="option2">Option 2</Radio>
	<Radio bind:group={groupValue} value="option3">Option 3</Radio>
	<p>Selected value: {groupValue}</p>
</Story>
