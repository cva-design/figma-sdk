<script lang="ts">
	import './action-group.css';
	import type { ComponentProps } from 'svelte';
	import type Button from '../button/button.svelte';
	import type IconButton from '../button/icon-button.svelte';

	type AllowedComponents = Button | IconButton;

	let className = '';
	export { className as class };
</script>

<div class="action-group {className}" style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: nowrap;">
	<slot />
</div>
