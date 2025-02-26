<script lang="ts">
	export let groupLabel: boolean = false;
</script>

<li class="fps-select-divider">
	<div class="fps-select-divider-line"></div>
	{#if groupLabel}
		<div class="fps-select-divider-group-label"><slot /></div>
	{/if}
</li>

<style lang="scss">
	.fps-select-divider-group-label {
		width: 100%;
		color: var(--color-text-menu-disabled);
		fill: var(--color-icon-menu-disabled);
		line-height: 24px;
		font-weight: 400;
		padding: 0 var(--spacer-2);
		text-decoration: none;
		text-align: left;
		white-space: nowrap;
		font-size: 12px;
		// font-size: var(--text-body-medium-font-size);
		// font-weight: var(--font-weight-default);
		// letter-spacing: var(--font-letter-spacing-neg-small);
		// line-height: var(--line-height);
		// display: flex;
		// align-items: center;
		// height: var(--spacer-3);
		// margin-top: var(--spacer-2);
		// padding: 0 var(--spacer-2) 0 var(--spacer-6);
		// color: var(--color-text-menu-secondary);
		// user-select: none;
	}

	.fps-select-divider:first-child .fps-select-divider-line {
		display: none;
	}

	.fps-select-divider-line {
		width: 100%;
		height: 1px;
		border-top: 1px solid var(--color-border-menu);
		margin: 8px 0;
	}
</style>
