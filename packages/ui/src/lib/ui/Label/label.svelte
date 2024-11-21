<script lang="ts">
	import './label.css';
	export { className as class };
	let className = '';
</script>

<div class={className}>
	<slot />
</div>
