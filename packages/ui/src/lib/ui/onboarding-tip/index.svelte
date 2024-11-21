<script lang="ts">
	import './onboarding-tip.css';
	import { Icon } from '$ui/icon';

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
