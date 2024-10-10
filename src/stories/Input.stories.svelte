<script context="module" lang="ts">
	import { Input } from '$ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	export const meta = {
		title: 'ui/Input',
		component: Input,
		argTypes: {
			value: { control: 'text' },
			placeholder: { control: 'text' },
			iconName: { control: 'text' },
			iconText: { control: 'text' },
			borders: { control: 'boolean' },
			disabled: { control: 'boolean' },
			spin: { control: 'boolean' },
			type: { control: 'select', options: ['text', 'password', 'email', 'number'] },
			invalid: { control: 'boolean' },
			errorMessage: { control: 'text' },
			class: { control: 'text' }
		}
	};
</script>

<Template let:args>
	<Input {...args} />
</Template>

<Story 
	name="Default" 
	args={{
		placeholder: 'Enter text...'
	}} 
/>

<Story 
	name="With Icon" 
	args={{
		placeholder: 'Search...',
		iconName: 'search'
	}} 
/>

<Story 
	name="With Borders" 
	args={{
		placeholder: 'Enter text...',
		borders: true
	}} 
/>

<Story 
	name="Disabled" 
	args={{
		placeholder: 'Disabled input',
		disabled: true
	}} 
/>

<Story 
	name="Invalid" 
	args={{
		placeholder: 'Enter email',
		invalid: true,
		errorMessage: 'Please enter a valid email address'
	}} 
/>

<Story 
	name="Password Input" 
	args={{
		type: 'password',
		placeholder: 'Enter password'
	}} 
/>

<Story 
	name="With Icon Text" 
	args={{
		placeholder: 'Enter text...',
		iconText: 'A'
	}} 
/>

<style>
	/* Add any global styles for the stories here if needed */
</style>