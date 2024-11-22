<script lang="ts">
	import type Button from '../button/button.svelte';
	import type IconButton from '../button/icon-button.svelte';

	type AllowedComponents = Button | IconButton;

	let className = '';
	export { className as class };
</script>

<div class="action-group {className}" style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: nowrap;">
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

:global(.action-group > *:first-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

:global(.action-group > *:last-child) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
