<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import SidebarTitle from './sidebarTitle.svelte';

	export const meta = {
		title: 'SidebarTitle',
		component: SidebarTitle,
		argTypes: {
			size: {
				control: 'select',
				options: ['one', 'two', 'three']
			},
			text: { control: 'text' },
			disabled: { control: 'boolean' }
		}
	};
</script>

<Story name="Level One">
	<SidebarTitle size="one" text="Components" />
</Story>

<Story name="Level Two">
	<SidebarTitle size="two" text="Button Group" />
</Story>

<Story name="Level Three">
	<SidebarTitle size="three" text="Button Variants" />
</Story>

<Story name="Disabled">
	<SidebarTitle size="one" text="Disabled Title" disabled={true} />
</Story>

