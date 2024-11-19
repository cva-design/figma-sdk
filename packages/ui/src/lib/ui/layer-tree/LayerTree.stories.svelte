<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import LayerTree from './LayerTree.svelte';
	import type { LayerTreeData } from './LayerTree.svelte';

	export const meta = {
		title: 'Components/LayerTree',
		component: LayerTree,
		argTypes: {
			initiallyExpanded: { control: 'boolean' },
			data: { control: 'object' }
		}
	} satisfies Meta<typeof LayerTree>;

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
</script>

<Story name="Default">
	<div style="width: 240px;">
		<LayerTree data={sampleData} expandedNodes={new Set()} />
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

<Story name="With Actions">
	<div style="width: 240px;">
		<LayerTree
			data={{
				...sampleData,
				actions: [
					{ icon: 'LockSvg', label: 'Lock' },
					{ icon: 'HideSvg', label: 'Hide' }
				]
			}}
		/>
	</div>
</Story>

<style>
	div {
		padding: 1rem;
		background: var(--figma-color-bg);
	}
</style>
