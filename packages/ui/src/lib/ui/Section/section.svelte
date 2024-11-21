<script lang="ts">
	import './section.css';
	
	let className = '';
	export { className as class };
</script>

<div class={className}>
	<slot></slot>
</div>