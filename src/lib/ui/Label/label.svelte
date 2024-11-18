<script lang="ts">
	export { className as class };
	let className = '';
</script>

<div class={className}>
	<slot />
</div>

<style>
	div {
		font-size: var(--text-body-medium-font-size);
		font-weight: var(--font-weight-default);
		letter-spacing: var(--font-letter-spacing-pos-xsmall);
		line-height: var(--line-height);
		color: var(--figma-color-text-secondary);
		height: var(--spacer-5);
		width: 100%;
		display: flex;
		align-items: center;
		cursor: default;
		user-select: none;
		padding: 0 calc(var(--spacer-2) / 2) 0 var(--spacer-2);
	}
</style>
