<script>
import { createEventDispatcher, setContext } from "svelte";
import { writable } from "svelte/store";
import { disclosure } from "./disclosure-item.svelte";

const dispatch = createEventDispatcher();
const selected = writable(null);
const className = "";
let disclosureWrapper;

const clickHandler = (itemId) => {
	const currentVal = getValue(selected);
	if (currentVal != itemId) {
		selected.set(itemId);
		dispatch("change", { detail: itemId });
	} else {
		selected.set(null);
		dispatch("change", { detail: null });
	}
};

setContext(disclosure, { clickHandler, selected });

function getValue(store) {
	let $val;
	store.subscribe(($) => ($val = $))();
	return $val;
}
</script>

<ul class={className} bind:this={disclosureWrapper}>
	<slot></slot>
</ul>

<style lang="scss">
ul {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
}</style>
