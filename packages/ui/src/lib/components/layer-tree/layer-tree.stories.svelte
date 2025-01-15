<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import type { LayerTreeData } from './layer-tree.svelte';
	import LayerTree from './layer-tree.svelte';

	export const meta = {
		title: 'LayerTree',
		component: LayerTree,
		argTypes: {
			initiallyExpanded: { control: 'boolean' },
			data: { control: 'object' }
		}
	} satisfies Meta<LayerTree>;

	const sampleData: LayerTreeData = {
		id: 'root',
		name: 'Root',
		type: 'FRAME',
		children: [
			{
				id: 'frame1',
				name: 'Frame 1',
				type: 'FRAME',
				children: [
					{
						id: 'rect1',
						name: 'Rectangle 1',
						type: 'RECTANGLE',
						children: []
					},
					{
						id: 'text1',
						name: 'Text Layer',
						type: 'TEXT',
						children: []
					}
				]
			},
			{
				id: 'group1',
				name: 'Group 1',
				type: 'GROUP',
				children: [
					{
						id: 'ellipse1',
						name: 'Ellipse 1',
						type: 'ELLIPSE',
						children: []
					}
				]
			}
		]
	};

	const componentData: LayerTreeData = {
		id: 'component-root',
		name: 'Button Component',
		type: 'COMPONENT',
		component: true,
		children: [
			{
				id: 'bg',
				name: 'Background',
				type: 'RECTANGLE',
				children: []
			},
			{
				id: 'label',
				name: 'Label',
				type: 'TEXT',
				children: []
			}
		]
	};

	const mixedStateData: LayerTreeData = {
		...sampleData,
		mixed: true
	};

	const disabledData: LayerTreeData = {
		...sampleData,
		disabled: true
	};

	const actionsData: LayerTreeData = {
		...sampleData,
		actions: [
			{
				id: 'visible',
				icons: {
					on: { iconName: 'VisibleSvg' },
					off: { iconName: 'HiddenSvg' }
				},
				enabled: true,
				kind: 'toggle',
				tooltip: 'Show/Hide',
				click: () => console.log('visibility click')
			},
			{
				id: 'lock',
				icons: { on: { iconName: 'LockOffSvg' }, off: { iconName: 'LockOnSvg' } },
				enabled: true,
				kind: 'toggle',
				tooltip: 'Lock',
				click: () => console.log('lock click')
			}
		]
	};
</script>

<Story name="Default">
	<div style="width: 240px;">
		<LayerTree data={sampleData} expandedNodes={new Set()} />
	</div>
</Story>

<Story name="Single Select">
	<div style="width: 240px;">
		<LayerTree data={sampleData} singleSelect={true} expandedNodes={new Set()} />
	</div>
</Story>

<Story name="Initially Expanded">
	<div style="width: 240px;">
		<LayerTree data={sampleData} initiallyExpanded={true} expandedNodes={new Set()} />
	</div>
</Story>

<Story name="Component">
	<div style="width: 240px;">
		<LayerTree data={componentData} />
	</div>
</Story>

<Story name="With Actions">
	<div style="width: 240px;">
		<LayerTree data={actionsData} />
	</div>
</Story>

<Story name="Mixed State">
	<div style="width: 240px;">
		<LayerTree data={mixedStateData} />
	</div>
</Story>

<Story name="Disabled">
	<div style="width: 240px;">
		<LayerTree data={disabledData} />
	</div>
</Story>

<style>
	div {
		padding: 1rem;
		background: var(--figma-color-bg);
	}

	:global(.action) {
		visibility: hidden;
		display: flex;
	}

	:global(.layer:hover .action),
	:global(.layer.selected .action) {
		visibility: visible;
	}

	:global(.action[data-id='visible']) {
		margin-right: 12px;
	}

	:global(.icon-component) {
		stroke: none;
	}
</style>
