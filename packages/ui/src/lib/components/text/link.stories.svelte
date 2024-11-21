<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import { Link } from './index';

	export const meta = {
		
		component: Link,
		argTypes: {
			size: {
				control: 'select',
				options: ['small', 'medium', 'large']
			},
			weight: {
				control: 'select',
				options: ['default', 'strong']
			},
			align: {
				control: 'select',
				options: ['start', 'center', 'end']
			},
			block: { control: 'boolean' },
			href: { control: 'text' }
		}
	};
</script>

<Story name="Default">
	<Link href="https://www.figma.com">Default Link</Link>
</Story>

<Story name="Small">
	<Link size="small" href="https://www.figma.com">Small Link</Link>
</Story>

<Story name="Large">
	<Link size="large" href="https://www.figma.com">Large Link</Link>
</Story>

<Story name="Strong">
	<Link weight="strong" href="https://www.figma.com">Strong Link</Link>
</Story>

<Story name="Centered">
	<Link align="center" block href="https://www.figma.com">Centered Link</Link>
</Story>
