<script context="module" lang="ts">
	import { Tooltip } from '$ui';
	import { Story } from '@storybook/addon-svelte-csf';

	export const meta = {
		title: 'Tooltip',
		component: Tooltip,
		argTypes: {
			content: { control: 'text' },
			position: {
				control: { type: 'select' },
				options: ['top', 'right', 'bottom', 'left']
			},
			openDelay: { control: 'number' },
			closeDelay: { control: 'number' },
			disableHoverableContent: { control: 'boolean' },
			defaultOpen: { control: 'boolean' },
			open: { control: 'boolean' },
			closeOnPointerDown: { control: 'boolean' },
			forceMount: { control: 'boolean' }
		}
	};
</script>

<Story name="Default">
	<Tooltip content="This is a tooltip">
		<button>Hover me</button>
	</Tooltip>
</Story>

<Story name="With Custom Delays">
	<Tooltip content="Custom delays" openDelay={500} closeDelay={200}>
		<button>Quick close, slow open</button>
	</Tooltip>
</Story>

<Story name="Force Mounted">
	<Tooltip content="Always in DOM" forceVisible>
		<button>For custom transitions</button>
	</Tooltip>
</Story>

<Story name="Top Position">
	<Tooltip content="Top tooltip" position="top">
		<button>Hover me</button>
	</Tooltip>
</Story>

<Story name="Right Position">
	<Tooltip content="Right tooltip" position="right">
		<button>Hover me</button>
	</Tooltip>
</Story>

<Story name="Bottom Position">
	<Tooltip content="Bottom tooltip" position="bottom">
		<button>Hover me</button>
	</Tooltip>
</Story>

<Story name="Left Position">
	<Tooltip content="Left tooltip" position="left">
		<button>Hover me</button>
	</Tooltip>
</Story>

<Story name="Custom Content">
	<Tooltip content={`<strong>Bold</strong> and <em>italic</em> text`}>
		<button>Hover for HTML content</button>
	</Tooltip>
</Story>
