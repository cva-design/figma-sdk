<script lang="ts">
	import './switch.css';
	export let checked = false;
	export let name = '';
	export let value = '';
	export let disabled = false;
	export { className as class };

	let className = '';
	let uniqueId = `switch--${(Math.random() * 100000000).toFixed(0)}`;
</script>

<div class={`switch ${className}`}>
	<input
		type="checkbox"
		{disabled}
		{name}
		bind:checked
		{value}
		id={uniqueId}
		on:change
		on:focus
		on:blur
		on:mouseover
		on:mouseenter
		on:mouseleave
	/>
	<label for={uniqueId}>
		<span class="switch-track" />
		<span class="switch-thumb" />
		<span class="switch-text"><slot /></span>
	</label>
</div>
