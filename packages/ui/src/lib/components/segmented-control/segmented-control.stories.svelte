<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import SegmentedControl from './segmented-control.svelte';
	import type { Segment } from './types';

	export const meta = {
		title: 'Segmented Control',
		component: SegmentedControl,
		argTypes: {
			disabled: { control: 'boolean' },
			value: { control: 'text' },
			defaultValue: { control: 'text' },
			required: { control: 'boolean' },
			loop: { control: 'boolean' }
		}
	};

	const alignmentSegments: Segment[] = [
		{
			value: 'left',
			tooltip: 'Align left',
			iconName: 'TextAlignLeftSvg_16',
			size: 'medium'
		},
		{
			value: 'center',
			tooltip: 'Align center',
			iconName: 'TextAlignCenterSvg_16',
			size: 'medium'
		},
		{
			value: 'right',
			tooltip: 'Align right',
			iconName: 'TextAlignRightSvg_16',
			size: 'medium'
		},
		{
			value: 'justify',
			tooltip: 'Align justify',
			iconName: 'TextAlignJustifiedSvg_16',
			size: 'medium'
		}
	];

	const styleSegments: Segment[] = [
		{
			value: 'minimalist',
			text: 'Minimalist'
		},
		{
			value: 'modern',
			text: 'Modern'
		},
		{
			value: 'retro',
			text: 'Retro'
		}
	];
</script>

<Story name="Basic">
	<SegmentedControl segments={alignmentSegments} defaultValue="left" />
</Story>

<Story name="Disabled">
	<SegmentedControl segments={alignmentSegments} defaultValue="left" disabled />
</Story>

<Story name="Text">
	<SegmentedControl segments={styleSegments} defaultValue="minimalist" />
</Story>

<style>
	/* .icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
	} */
</style> 