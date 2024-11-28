<script lang="ts">
export const label: boolean = false;
</script>

{#if label}
	<li class="label"><slot /></li>
{:else}
	<li class="divider"></li>
{/if}

<style lang="scss">
	.label {
		font-size: var(--text-body-medium-font-size);
		font-weight: var(--font-weight-default);
		letter-spacing: var(--font-letter-spacing-neg-small);
		line-height: var(--line-height);
		display: flex;
		align-items: center;
		height: var(--spacer-4);
		margin-top: var(--spacer-2);
		padding: 0 var(--spacer-2) 0 var(--spacer-5);
		color: var(--color-text-menu-secondary);
	}
	.label:first-child {
		border-top: none;
		margin-top: 0;
	}

	.divider {
		background-color: var(--color-border-menu);
		display: block;
		height: 1px;
		outline: 0;
	}

	</style>
