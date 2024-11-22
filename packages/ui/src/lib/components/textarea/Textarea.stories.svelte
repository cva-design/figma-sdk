<script context="module" lang="ts">
	import { Textarea } from '$ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	export const meta = {
		title: 'Textarea',
		component: Textarea,
		argTypes: {
			value: { control: 'text' },
			placeholder: { control: 'text' },
			rows: { control: 'number' },
			disabled: { control: 'boolean' },
			class: { control: 'text' }
		}
	};
</script>

<Template let:args>
	<Textarea {...args} />
</Template>

<Story
	name="Default"
	args={{
		value: '',
		placeholder: 'Enter text here...',
		rows: 3
	}}
/>

<Story
	name="With Initial Value"
	args={{
		value: 'This is some initial text in the textarea.',
		placeholder: 'Enter text here...',
		rows: 3
	}}
/>

<Story
	name="Disabled"
	args={{
		value: 'This textarea is disabled',
		placeholder: 'Enter text here...',
		rows: 3,
		disabled: true
	}}
/>

<Story
	name="Custom Rows"
	args={{
		value: '',
		placeholder: 'This textarea has 10 rows',
		rows: 10
	}}
/>
