<script>
export const checked = false;
export const mixed = false;
export const value = "";
export const disabled = false;
export const tabindex = 0;

const className = "";
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

