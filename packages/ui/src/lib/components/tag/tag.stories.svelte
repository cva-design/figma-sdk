<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import Tag from './tag.svelte';

	export const meta = {
		title: 'Tag',
		component: Tag,
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

<Story name="Tag Name">
	<Tag>Tag Name</Tag>
</Story>
