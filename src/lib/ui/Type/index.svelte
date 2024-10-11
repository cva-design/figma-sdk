<script>
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

<style>
	.type {
		font-family: var(--font-family-default);
		font-size: var(--text-body-medium-font-size);
		font-weight: var(--font-weight-default);
		line-height: var(--font-line-height);
		letter-spacing: var(--font-letter-spacing-pos-xsmall);
	}

	/* sizes */
	.small {
		font-size: var(--text-body-medium-font-size);
		letter-spacing: var(--font-letter-spacing-pos-small);
	}

	.large {
		font-size: var(--text-body-large-font-size);
		line-height: var(--font-line-height-large);
		letter-spacing: var(--font-letter-spacing-pos-large);
	}
	.xlarge {
		font-size: var(--text-heading-medium-font-size);
		line-height: var(--font-line-height-large);
		letter-spacing: var(--font-letter-spacing-pos-xlarge);
	}

	/* weights */
	.medium {
		font-weight: var(--font-weight-default);
	}
	.bold {
		font-weight: var(--font-weight-strong);
	}

	/* letter spacing adjustments based pos/neg application */
	.inverse {
		letter-spacing: var(--font-letter-spacing-neg-xsmall);
	}
	.inverse.small {
		letter-spacing: var(--font-letter-spacing-neg-small);
	}
	.inverse.large {
		letter-spacing: var(--font-letter-spacing-neg-large);
	}
	.inverse.xlarge {
		letter-spacing: var(--font-letter-spacing-neg-xlarge);
	}

	.inline {
		display: inline-block;
	}
</style>
