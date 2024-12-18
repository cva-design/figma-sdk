<script lang="ts">
	export let text = '';
	export let color = '';
	export let disabled = false;
	export let showActions = true;
</script>

<div class="div-LayerTag">
	<div class="LayerTag">
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8Z"
				fill={color}
			/>
		</svg>
		<span class:disabled>{text}</span>
		{#if showActions}
			<slot name="actions">
				<!-- Ações padrão -->
				<slot />
			</slot>
		{/if}
	</div>
</div>

<style lang="scss">
	.LayerTag {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 6px;
		gap: 8px;
		border: 1px solid #f0f0f0;
		border-radius: 6px;
		color: var(--figma-color-text);
		font-family: var(--font-family-default);
		font-size: x-small;
	}

	.div-LayerTag {
		flex: none;
		order: 0;
		flex-grow: 0;
		margin-left: 8px;
	}

	.disabled {
		color: var(--figma-color-text-disabled);
	}
</style>
