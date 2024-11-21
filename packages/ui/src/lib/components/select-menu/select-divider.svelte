<script lang="ts">
	import './select-divider.css';
	export let label = false;
</script>

{#if label === true}
	<li class="label"><slot /></li>
{:else}
	<li class="divider"></li>
{/if}
