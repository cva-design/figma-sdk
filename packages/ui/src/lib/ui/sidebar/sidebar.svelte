<script lang="ts">
	import './sidebar.css';
	import { Button } from '../button';
	import { Icon } from '../icon';
	import IconButton from '../icon-button/icon-button.svelte';

	export let collapsed: boolean = false;
	export let position: 'left' | 'right' = 'left';
	export let width: string = '240px';
	export let collapsedWidth: string = '48px';
	export { className as class };

	let className = '';
</script>

<aside
	class="sidebar {className}"
	class:collapsed
	class:left={position === 'left'}
	class:right={position === 'right'}
	style="--sidebar-width: {width}; --sidebar-collapsed-width: {collapsedWidth}"
>
	<IconButton
		class="toggle-button"
		on:click={() => (collapsed = !collapsed)}
		aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
	>
		<Icon icon={collapsed ? 'CaretRightSvg' : 'CaretLeftSvg'} color="--figma-color-icon" />
	</IconButton>
	<div class="sidebar-content">
		<slot />
	</div>
</aside>
