<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import Heading from './heading.svelte';

	export const meta = {
		title: 'Heading',
		component: Heading,
		argTypes: {
			size: {
				control: 'select',
				options: ['one', 'two', 'three']
			},
			text: { control: 'text' },
			disabled: { control: 'boolean' },
			editable: { control: 'boolean' }
		}
	};
</script>

<Story name="Level One">
	<Heading level={1} text="Components" />
</Story>

<Story name="Level Two">
	<Heading level={2} text="Button Group" />
</Story>

<Story name="Level Three">
	<Heading level={3} text="Button Variants" />
</Story>

<Story name="Disabled">
	<Heading level={1} text="Disabled Title" disabled={true} />
</Story>

<Story name="Editable">
	<Heading level={1} text="Editable Title" editable={true} />
</Story>

<Story name="Editable and Disabled">
	<Heading level={2} text="Editable Disabled Title" editable={true} disabled={true} />
</Story>
