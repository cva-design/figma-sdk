<script lang="ts">
	import './radio.css';
	export let group: any = null;
	export let value: any = null;
	export let disabled = false;
	export let tabindex = 0;
	export let className = '';
	export let checked = false;
	let uniqueId = `radio--${(Math.random() * 10000000).toFixed(0).toString()}`;
	$: checked = group === value;

	function handleClick(event: MouseEvent) {
		const target = event.target as HTMLInputElement;
		group = target.value;

		target.blur();
	}
</script>

<div class={className}>
	<input
		type="radio"
		{value}
		{checked}
		{disabled}
		{tabindex}
		id={uniqueId}
		bind:group
		on:click={handleClick}
		on:change
		on:focus
		on:blur
	/>
	<label for={uniqueId}>
		<slot />
	</label>
</div>
