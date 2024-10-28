<script context="module" lang="ts">
	import {
		LockLockedSvg_16,
		LockUnlockedSvg_16,
		VisibilityHiddenSvg_16,
		VisibilityVisibleSvg_16
	} from '$icons';
	import { Story } from '@storybook/addon-svelte-csf';
	import type { Layer } from '../layer';
	import type { Action } from '../tree/types';
	import LayerTree from './LayerTree.svelte';

	export const meta = {
		title: 'Components/LayerTree',
		component: LayerTree,
		parameters: {
			layout: 'padded'
		}
	};

	const toggleVisibility: Action = {
		id: 'toggleVisibility',
		icon: VisibilityVisibleSvg_16,
		tooltip: 'Show/Hide Layer',
		enabled: true,
		click: ({ action }: { action: Action; event: Event; layer: Layer }) => {
			console.log('toggle visibility');
			action.icon =
				action.icon == VisibilityVisibleSvg_16 ? VisibilityHiddenSvg_16 : VisibilityVisibleSvg_16;
		}
	};

	const defaultActions = [
		{ id: 'visible', icon: VisibilityVisibleSvg_16, tooltip: 'Show/Hide Layer', enabled: true },
		{ id: 'lock', icon: LockUnlockedSvg_16, tooltip: 'Lock/Unlock Layer', enabled: true }
	];

	const hiddenActions = [
		{ id: 'visible', icon: VisibilityHiddenSvg_16, tooltip: 'Show/Hide Layer', enabled: true },
		{ id: 'lock', icon: LockUnlockedSvg_16, tooltip: 'Lock/Unlock Layer', enabled: true }
	];

	const lockedActions = [
		{ id: 'visible', icon: VisibilityVisibleSvg_16, tooltip: 'Show/Hide Layer', enabled: true },
		{ id: 'lock', icon: LockLockedSvg_16, tooltip: 'Lock/Unlock Layer', enabled: true }
	];
</script>

<Story name="Default State">
	<LayerTree type="FRAME" name="Frame 3" actions={defaultActions} expanded>
		<LayerTree type="FRAME" name="Frame 4" actions={defaultActions} depth={1} />
		<LayerTree type="FRAME" name="Frame 1" actions={defaultActions} depth={1} expanded>
			<LayerTree
				type="COMPONENT"
				name="Component 1"
				component
				selected
				actions={defaultActions}
				depth={2}
				expanded
			>
				<LayerTree type="POLYGON" name="layer-polygon-12" actions={defaultActions} depth={3} />
				<LayerTree type="RECTANGLE" name="Rectangle 1" actions={defaultActions} depth={3} />
				<LayerTree type="FRAME" name="Frame 2" actions={defaultActions} depth={3} />
			</LayerTree>
		</LayerTree>
		<LayerTree type="STAR" name="layer-star-12" actions={defaultActions} depth={1}>
			<LayerTree type="STAR" name="Star 1" actions={defaultActions} depth={2} />
		</LayerTree>
		<LayerTree type="STAR" name="layer-star-16" actions={defaultActions} depth={1}>
			<LayerTree type="STAR" name="layer-star-16" actions={defaultActions} depth={2} />
		</LayerTree>
		<LayerTree type="STAR" name="layer-star-32" actions={lockedActions} depth={1}>
			<LayerTree type="STAR" name="Star 1" actions={defaultActions} depth={2} />
		</LayerTree>
		<LayerTree type="POLYGON" name="layer-polygon-32" actions={hiddenActions} depth={1}>
			<LayerTree type="POLYGON" name="layer-polygon-12" actions={defaultActions} depth={2} />
			<LayerTree type="RECTANGLE" name="Rectangle 3" actions={defaultActions} depth={2} />
		</LayerTree>
		<LayerTree type="RECTANGLE" name="Rectangle 4" actions={defaultActions} depth={1} />
		<LayerTree type="POLYGON" name="layer-polygon-12" actions={defaultActions} depth={1} />
		<LayerTree type="POLYGON" name="layer-polygon-16" actions={defaultActions} depth={1} />
	</LayerTree>
</Story>

<Story name="Layer States">
	<div class="states-grid">
		<LayerTree type="FRAME" name="Default Frame" actions={defaultActions} />
		<LayerTree type="FRAME" name="Selected Frame" selected actions={defaultActions} />
		<LayerTree type="FRAME" name="Expanded Frame" expanded actions={defaultActions}>
			<LayerTree type="RECTANGLE" name="Child Layer" actions={defaultActions} depth={1} />
		</LayerTree>
		<LayerTree type="FRAME" name="Hidden Frame" actions={hiddenActions} />
		<LayerTree type="FRAME" name="Locked Frame" actions={lockedActions} />
		<LayerTree type="COMPONENT" name="Component" component actions={defaultActions} />
		<LayerTree
			type="COMPONENT"
			name="Selected Component"
			component
			selected
			actions={defaultActions}
		/>
	</div>
</Story>

<style>
	.states-grid {
		display: grid;
		gap: 8px;
	}
</style>
