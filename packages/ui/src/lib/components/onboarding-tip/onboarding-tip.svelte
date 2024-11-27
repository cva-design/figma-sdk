<script lang="ts">
import { Icon } from "$ui/icon";

export const spin = false;
export const color = "black8";
export const iconName: string | null = null;
export const iconText: string | null = null;
export { className as class };

const className = "";
</script>

<div class="onboarding-tip {className}">
	<div class="icon">
		<Icon icon={iconName} {iconText} {color} {spin} />
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
}</style>
