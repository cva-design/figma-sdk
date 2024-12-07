<script lang="ts">
import type * as icons from "$icons";
import { Icon } from "$ui/icon";
import { createEventDispatcher, onMount } from "svelte";
import ClickOutside from "svelte-click-outside";
import SelectDivider from "./select-divider.svelte";
import SelectItem from "./select-item.svelte";
import type { SelectMenuItem } from "./types";

export let icon: keyof typeof icons | undefined;
export const iconText: string | null = null;
export let disabled: boolean = false;
export const macOSBlink: boolean = false;
export const menuItems: SelectMenuItem[] = []; //pass data in via this prop to generate menu items
export const placeholder: string = "Please make a selection.";
export let value: SelectMenuItem | null | undefined = null; //stores the current selection, note, the value will be an object from your array
export const showGroupLabels: boolean = false; //default prop, true will show option group labels
export { className as class };

const dispatch = createEventDispatcher();
const className = "";
const groups = checkGroups();
let menuWrapper: HTMLDivElement,
	menuButton: HTMLButtonElement,
	menuList: HTMLUListElement;
$: updateSelectedAndIds();

//FUNCTIONS

//assign id's to the input array
onMount(async () => {
	console.clear();
	updateSelectedAndIds();
});

// this function runs everytime the menuItems array os updated
// it will auto assign ids and keep the value var updated
function updateSelectedAndIds() {
	if (menuItems) {
		menuItems.forEach((item, index) => {
			//update id
			item.id = index;
			//update selection
			if (item.selected === true) {
				value = item;
			}
		});
	}
	//set placeholder
	if (menuItems.length <= 0) {
		// placeholder = 'There are no items to select';
		disabled = true;
	} else if (!disabled) {
		// placeholder = 'Please make a selection';
		disabled = false;
	}
}

//determine if option groups are present
function checkGroups() {
	let groupCount = 0;
	if (menuItems) {
		menuItems.forEach((item) => {
			if (item.group != null) {
				groupCount++;
			}
		});
		if (groupCount === menuItems.length) {
			return true;
		} else {
			return false;
		}
	}
	return false;
}

//menu highlight function on the selected menu item
function removeHighlight(event: Event) {
	const items = Array.from((event.target as HTMLElement).parentNode!.children);
	items.forEach((item) => {
		(item as HTMLElement).blur();
		(item as HTMLElement).classList.remove("highlight");
	});
}

//run for all menu click events
//this opens/closes the menu
function menuClick(event: Event) {
	resetMenuProperties();

	if (!event.target) {
		menuList.classList.add("hidden");
	} else if ((event.target as HTMLElement).contains(menuButton)) {
		const topPos: number = 0;

		if (value) {
			//toggle menu
			menuList.classList.remove("hidden");

			const id = value.id!;
			const selectedItem = menuList.querySelector(
				`[itemId="${id}"]`,
			) as HTMLElement;
			selectedItem.focus(); //set focus to the currently selected item

			// calculate distance from top so that we can position the dropdown menu
			const parentTop = menuList.getBoundingClientRect().top;
			const itemTop = selectedItem.getBoundingClientRect().top;
			const topPos = itemTop - parentTop - 3;
			menuList.style.top = `${-Math.abs(topPos)}px`;

			//update size and position based on plugin UI
			resizeAndPosition();
		} else {
			menuList.classList.remove("hidden");
			menuList.style.top = "0px";
			const firstItem = menuList.querySelector('[itemId="0"]') as HTMLElement;
			firstItem.focus();

			//update size and position based on plugin UI
			resizeAndPosition();
		}
	} else if (menuList.contains(event.target as Node)) {
		//find selected item in array
		const itemId = Number.parseInt(
			(event.target as HTMLElement).getAttribute("itemId")!,
		);

		//remove current selection if there is one
		if (value) {
			menuItems[value.id!].selected = false;
		}
		menuItems[itemId].selected = true; //select current item
		value = menuItems[itemId]; // Update the value property
		updateSelectedAndIds();
		dispatch("change", menuItems[itemId]);

		if (macOSBlink) {
			const x: number = 4;
			const interval: number = 70;

			//blink the background
			for (let i = 0; i < x; i++) {
				setTimeout(() => {
					(event.target as HTMLElement).classList.toggle("blink");
				}, i * interval);
			}
			//delay closing the menu
			setTimeout(
				() => {
					menuList.classList.add("hidden"); //hide the menu
				},
				interval * x + 40,
			);
		} else {
			menuList.classList.add("hidden"); //hide the menu
			menuButton.classList.remove("selected"); //remove selected state from button
		}
	}
}

// this function ensures that the select menu
// fits inside the plugin viewport
// if its too big, it will resize it and enable a scrollbar
// if its off screen it will shift the position
function resizeAndPosition() {
	//set the max height of the menu based on plugin/iframe window
	const maxMenuHeight = window.innerHeight - 16;
	const menuHeight = menuList.offsetHeight;
	let menuResized: boolean = false;

	if (menuHeight > maxMenuHeight) {
		menuList.style.height = `${maxMenuHeight}px`;
		menuResized = true;
	}

	//lets adjust the position of the menu if its cut off from viewport
	const bounding = menuList.getBoundingClientRect();
	const parentBounding = menuButton.getBoundingClientRect();

	if (bounding.top < 0) {
		menuList.style.top = `${-Math.abs(parentBounding.top - 8)}px`;
	}
	if (
		bounding.bottom >
		(window.innerHeight || document.documentElement.clientHeight)
	) {
		const minTop = -Math.abs(
			parentBounding.top - (window.innerHeight - menuHeight - 8),
		);
		const newTop = -Math.abs(bounding.bottom - window.innerHeight + 16);
		if (menuResized) {
			menuList.style.top = `${-Math.abs(parentBounding.top - 8)}px`;
		} else if (newTop > minTop) {
			menuList.style.top = `${minTop}px`;
		} else {
			menuList.style.top = `${newTop}px`;
		}
	}
}
function resetMenuProperties() {
	menuList.style.height = "auto";
	menuList.style.top = "0px";
}
</script>

<ClickOutside on:clickoutside={menuClick}>
	<div on:change on:focus on:blur bind:this={menuWrapper} {placeholder} class="wrapper {className}">
		<button bind:this={menuButton} on:click={menuClick} {disabled}>
			{#if icon}
				<span class="icon"><Icon {icon} color="black3" /></span>
			{:else if iconText}
				<span class="icon"><Icon {iconText} color="black3" /></span>
			{/if}

			{#if value}
				<span class="label">{value.label}</span>
			{:else}
				<span class="placeholder">{placeholder}</span>
			{/if}

			{#if !disabled}
				<span class="caret">
					<svg
						width="8"
						height="8"
						viewBox="0 0 8 8"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M3.64645 5.35359L0.646454 2.35359L1.35356 1.64648L4.00001 4.29293L6.64645 1.64648L7.35356 2.35359L4.35356 5.35359L4.00001 5.70714L3.64645 5.35359Z"
							fill="black"
						/>
					</svg>
				</span>
			{/if}
		</button>

		<ul class="menu hidden" bind:this={menuList}>
			{#if menuItems && menuItems.length > 0}
				{#each menuItems as item, i}
					{#if i === 0}
						{#if item.group && showGroupLabels}
							<SelectDivider label>{item.group}</SelectDivider>
						{/if}
					{:else if i > 0 && item.group && menuItems[i - 1].group != item.group}
						{#if showGroupLabels}
							<SelectDivider />
							<SelectDivider label>{item.group}</SelectDivider>
						{:else}
							<SelectDivider />
						{/if}
					{/if}
					<SelectItem
						on:click={menuClick}
						on:mouseenter={removeHighlight}
						itemId={item.id ?? 0}
						bind:selected={item.selected}>{item.label}</SelectItem
					>
				{/each}
			{/if}
		</ul>
	</div>
</ClickOutside>

<style lang="scss">
.wrapper {
  position: relative;
}

.hidden {
  display: none;
}

button {
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  height: 30px;
  width: 100%;
  margin: 1px 0 1px 0;
  padding: 4px var(--spacer-2) 0px var(--spacer-2);
  overflow-y: hidden;
  border-radius: var(--border-radius-small);
  background-color: var(--figma-color-bg);
}
button:hover,
button:active {
  border-color: var(--figma-color-border-onselected-strong);
}
button:hover .placeholder {
  color: var(--figma-color-text);
}
button:hover .caret svg path,
button:focus .caret svg path {
  fill: var(--figma-color-text);
}
button:hover .caret,
button:focus .caret {
  margin-left: auto;
}
button:focus {
  border: 1px solid var(--figma-color-bg-brand);
  outline: 1px solid var(--figma-color-bg-brand);
  outline-offset: -2px;
  padding-left: calc(var(--spacer-2) + 1px);
}
button:focus .placeholder {
  color: var(--figma-color-text);
}
button:disabled .label {
  color: var(--figma-color-text-secondary);
}
button:disabled:hover {
  justify-content: flex-start;
  border-color: transparent;
}
button:disabled:hover .placeholder {
  color: var(--figma-color-text-secondary);
}
button:disabled:hover .caret svg path {
  fill: var(--figma-color-text-secondary);
}
button * {
  pointer-events: none;
}

.label,
.placeholder {
  font-size: var(--text-body-medium-font-size);
  font-weight: var(--font-weight-default);
  letter-spacing: var(--font-letter-spacing-neg-xsmall);
  line-height: var(--line-height);
  color: var(--figma-color-text);
  margin-right: 6px;
  margin-top: -3px;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}

.placeholder {
  color: var(--figma-color-text-tertiary);
}

.caret {
  display: block;
  margin-top: -1px;
}

.caret svg path {
  fill: var(--figma-color-icon-tertiary);
}

.icon {
  margin-left: -8px;
  margin-top: -2px;
  margin-right: 0;
}

.menu {
  position: absolute;
  top: 32px;
  left: 0;
  width: 100%;
  background-color: #000000e5;
  box-shadow: var(--shadow-hud);
  padding: var(--spacer-2) 0 var(--spacer-2) 0;
  border-radius: var(--border-radius-small);
  margin: 0;
  z-index: 50;
  overflow-x: overlay;
  overflow-y: auto;
}
.menu::-webkit-scrollbar {
  width: 12px;
  background-color: transparent;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=);
  background-repeat: repeat;
  background-size: 100% auto;
}
.menu::-webkit-scrollbar-track {
  border: solid 3px transparent;
  -webkit-box-shadow: inset 0 0 10px 10px transparent;
  box-shadow: inset 0 0 10px 10px transparent;
}
.menu::-webkit-scrollbar-thumb {
  border: solid 3px transparent;
  border-radius: 6px;
  -webkit-box-shadow: inset 0 0 10px 10px rgba(255, 255, 255, 0.4);
  box-shadow: inset 0 0 10px 10px rgba(255, 255, 255, 0.4);
}</style>
