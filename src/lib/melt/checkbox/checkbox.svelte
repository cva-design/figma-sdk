<script lang="ts">
	import { CheckboxCheckedSvg_12, CheckboxMixedSvg_12 } from '$icons';
	import { createCheckbox } from '@melt-ui/svelte';

	const {
		elements: { root, input },
		helpers: { isChecked, isIndeterminate }
	} = createCheckbox({
		defaultChecked: 'indeterminate'
	});
</script>

<form>
	<div class="flex items-center justify-center">
		<button
			{...$root}
			use:root
			class="flex size-7 appearance-none items-center justify-center
            rounded-lg bg-white text-magnum-600 shadow hover:opacity-75"
			id="checkbox"
		>
			{#if $isIndeterminate}
				{@html CheckboxMixedSvg_12}
			{:else if $isChecked}
				{@html CheckboxCheckedSvg_12}
			{/if}
			<input {...$input} use:input />
		</button>
		<label class="pl-4 font-medium text-magnum-900" for="checkbox">
			Accept terms and conditions.
		</label>
	</div>
</form>
