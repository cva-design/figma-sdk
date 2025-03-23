<script lang="ts">
	import type { Button, IconButton } from '#ui';

	type AllowedComponents = Button | IconButton;

	const className = '';
	export { className as class };
</script>

<div
	class="action-group {className}"
	style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: nowrap;"
>
	<slot />
</div>

<style lang="scss">
	.action-group {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		flex-wrap: nowrap;
	}

	:global(.action-group > :not(:last-child)) {
		margin-right: -1px;
	}
</style>
