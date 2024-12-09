<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import Title from './title.svelte';

	export const meta = {
		title: 'Title',
		component: Title,
		argTypes: {
			level: {
				control: 'select',
				options: ['one', 'two', 'three']
			},
			kind: {
				control: 'select',
				options: ['select', 'text']
			},
			disabled: {
				control: 'boolean'
			}
		}
	};
</script>

<Story name="LevelOne">
	<Title>Level One Title</Title>
</Story>

<Story name="LevelTwo">
	<Title>Level Two Title</Title>
</Story>

<Story name="LevelThree">
	<Title>Level Three Title</Title>
</Story>

