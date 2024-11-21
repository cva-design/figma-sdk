<script context="module" lang="ts">
	import { Tree } from '$ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	export const meta = {
		
		component: Tree,
		argTypes: {
			nodes: { control: 'object' },
			options: { control: 'object' }
		}
	};
</script>

<Template let:args>
	<Tree {...args} on:nodeAction={(event) => console.log('Node action:', event.detail)} />
</Template>

<Story
	name="Default"
	args={{
		nodes: [
			{
				id: '1',
				title: 'Root',
				children: [
					{
						id: '1.1',
						title: 'Child 1',
						icon: '📁',
						children: [
							{ id: '1.1.1', title: 'Grandchild 1', icon: '📄' },
							{ id: '1.1.2', title: 'Grandchild 2', icon: '📄' }
						]
					},
					{ id: '1.2', title: 'Child 2', icon: '📁' }
				],
				actions: [
					{ id: 'edit', icon: '✏️', tooltip: 'Edit' },
					{ id: 'delete', icon: '🗑️', tooltip: 'Delete', enabled: false }
				]
			}
		],
		options: {
			indentationWidth: 20,
			showLayerIcon: true,
			defaultActions: [{ id: 'info', icon: 'ℹ️', tooltip: 'Info' }]
		}
	}}
/>

<Story
	name="Custom Icons"
	args={{
		nodes: [
			{
				id: '1',
				title: 'Root',
				children: [
					{ id: '1.1', title: 'Child 1', icon: '🌟' },
					{ id: '1.2', title: 'Child 2', icon: '🌙' }
				]
			}
		],
		options: {
			indentationWidth: 30,
			expandIcon: '+',
			collapseIcon: '-',
			showLayerIcon: true,
			defaultActions: []
		}
	}}
/>

<Story
	name="With Actions"
	args={{
		nodes: [
			{
				id: '1',
				title: 'Root',
				children: [
					{
						id: '1.1',
						title: 'Child 1',
						actions: [{ id: 'custom', icon: '🔧', tooltip: 'Custom Action' }]
					},
					{ id: '1.2', title: 'Child 2' }
				],
				actions: [
					{ id: 'edit', icon: '✏️', tooltip: 'Edit' },
					{ id: 'delete', icon: '🗑️', tooltip: 'Delete' }
				]
			}
		],
		options: {
			indentationWidth: 20,
			expandIcon: '▶',
			collapseIcon: '▼',
			showLayerIcon: false,
			defaultActions: [{ id: 'info', icon: 'ℹ️', tooltip: 'Info' }]
		}
	}}
/>
