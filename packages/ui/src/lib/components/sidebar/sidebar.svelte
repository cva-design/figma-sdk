<script lang="ts">
	import IconButton from '../icon-button/icon-button.svelte';

	export let collapsed: boolean = false;
	export let position: 'left' | 'right' = 'left';
	export let width: string = '240px';
	export let collapsedWidth: string = '48px';
	export { className as class };

	const className = '';
</script>

<aside
	class="sidebar {className}"
	class:collapsed
	class:left={position === 'left'}
	class:right={position === 'right'}
	style="--sidebar-width: {width}; --sidebar-collapsed-width: {collapsedWidth}"
>
	<IconButton
		iconName={collapsed ? 'CaretRightSvg' : 'CaretLeftSvg'}
		color="--figma-color-icon"
		class="toggle-button"
		on:click={() => (collapsed = !collapsed)}
		aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
	/>
	<div class="sidebar-content">
		<slot />
	</div>
</aside>

<style lang="scss">
	.sidebar {
		position: relative;
		width: var(--sidebar-width);
		height: 100%;
		background: var(--figma-color-bg);
		border-right: 1px solid var(--figma-color-border);
		transition: width 0.2s ease-in-out;
		overflow: hidden;
	}

	.sidebar.collapsed {
		width: var(--sidebar-collapsed-width);
	}

	.sidebar.right {
		border-right: none;
		border-left: 1px solid var(--figma-color-border);
	}

	.sidebar-content {
		height: 100%;
		width: var(--sidebar-width);
		overflow-y: auto;
		overflow-x: hidden;
	}

	.toggle-button {
		position: absolute;
		bottom: var(--spacer-2);
		right: var(--spacer-2);
		width: var(--spacer-6);
		height: var(--spacer-6);
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--border-radius-small);
	}

	.right .toggle-button {
		right: unset;
		left: var(--spacer-2);
	}
</style>
