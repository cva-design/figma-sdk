<script lang="ts">
	import './textarea.css';

	export let id = null;
	export let value = null;
	export let rows = 2;
	export let name = null;
	export let disabled = false;
	export let placeholder = 'Input something here...';
	export { className as class };

	let className = '';
</script>

<div class="textarea {className}">
	<textarea
		on:input
		on:change
		on:keydown
		on:focus
		on:blur
		{id}
		{name}
		{rows}
		{disabled}
		{placeholder}>{value}</textarea
	>
</div>
