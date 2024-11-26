<script>
	export let checked = false;
	export let mixed = false;
	export let value = '';
	export let disabled = false;
	export let tabindex = 0;

	let className = '';
	export { className as class };

	const uniqueId = `checkbox--${(Math.random() * 10000000).toFixed(0).toString()}`;

	function handleClick(event) {
		event.currentTarget.blur();
	}
</script>

<div class={className}>
	<input
		type="checkbox"
		id={uniqueId}
		indeterminate={mixed}
		bind:checked
		bind:value
		{disabled}
		{tabindex}
		on:click={handleClick}
		on:change
		on:focus
		on:blur
		{...$$restProps}
	/>
	<label for={uniqueId}>
		<slot />
	</label>
</div>

