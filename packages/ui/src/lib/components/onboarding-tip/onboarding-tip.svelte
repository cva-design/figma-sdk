<script lang="ts">
	import { Icon, type IconProps } from '#ui';

	type $$Props = IconProps;

	const icon = $$props.icon;
	const iconText = $$props.iconText;
	const color = $$props.color ?? '--figma-color-icon';
	const spin = $$props.spin ?? false;
</script>

<div class="onboarding-tip {$$props.class}">
	<div class="icon">
		<Icon {icon} {iconText} {color} {spin} />
	</div>
	<p>
		<slot></slot>
	</p>
</div>

<style lang="scss">
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
