<script lang="ts">
	import './type.css';
	import { onMount } from 'svelte';

	export let size = 'xsmall';
	export let weight = 'normal';
	export let inverse = false; //this prop uses different letterspacing values for inversed type (light on dark)
	export let color = '--figma-color-text';
	export let inline = false;
	export { className as class };

	let className = '';
	let cssColorVar;

	onMount(async () => {
		if (color === 'black8' && inverse) {
			color = 'white';
		}
	});

	cssColorVar = `var(${color})`;
</script>

<div
	class="type {className} {size} {weight}"
	class:inverse
	class:inline
	style="color: {cssColorVar}"
>
	<slot />
</div>