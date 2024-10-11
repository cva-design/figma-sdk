<script lang="ts">
	import Icon from './../Icon/index.svelte';

	export let spin = false;
	export let color = 'black8';
	export let iconName: string | null = null;
	export let iconText: string | null = null;
	export { className as class };

	let className = '';
</script>

<div class="onboarding-tip {className}">
	<div class="icon">
		<Icon iconUrl={iconName} {iconText} {color} {spin} />
	</div>
	<p>
		<slot></slot>
	</p>
</div>

<style>
	.onboarding-tip {
		display: flex;
		align-items: top;
		padding: 0 var(--spacer-3) 0 0;
	}

	.icon {
		width: var(--spacer-5);
		height: var(--spacer-5);
		margin-right: var(--spacer-2);
	}

	p {
		padding: var(--spacer-2) 0 var(--spacer-2) 0;
		font-size: var(--text-body-medium-font-size);
		font-weight: var(--font-weight-default);
		letter-spacing: var(--font-letter-spacing-pos-xsmall);
		line-height: var(--line-height);
		color: var(--figma-color-text);
		margin: 0;
	}
</style>
