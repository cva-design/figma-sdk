<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let value: string;

	const { register } = getContext('tabs') as {
		register: (value: string) => { isSelected: Writable<boolean>; select: () => void };
	};
	const { isSelected } = register(value);

	$: isVisible = $isSelected;
</script>

{#if isVisible}
	<div class="fps-TabsContent {$$props.class || ''}" role="tabpanel">
		<slot />
	</div>
{/if}

<style lang="scss">
</style>
