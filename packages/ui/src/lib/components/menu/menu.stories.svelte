<script context="module" lang="ts">
	import { Story, Template } from "@storybook/addon-svelte-csf";
	import { Text } from "#ui";
	
	export const meta = {
		title: "Text",
		component: Text,
		argTypes: {
			size: {
				control: "select",
				options: ["small", "medium", "large"],
			},
			weight: {
				control: "radio",
				options: ["default", "strong"],
			},
			align: {
				control: "radio",
				options: ["left", "center", "right"],
			},
			block: {
				control: "boolean",
			},
			as: {
				control: "select",
				options: ["span", "label", "p", "a"],
			},
		},
	};
	</script>
	
	<Template let:args let:content>
		<div style="display: flex; gap: 16px; flex-direction: column; width: 50%;">
			<Text {...args}>{content}</Text>
		</div>
	</Template>
	
	<Story name="Menu">
		<div data-side="bottom" data-align="center" role="menu" aria-orientation="vertical" data-state="open" data-radix-menu-content="" dir="ltr" id="radix-:r2:" aria-labelledby="radix-:r1:" class="fp-MenuContent" tabindex="-1" data-orientation="vertical" style="outline: none; min-width: 200px; --radix-dropdown-menu-content-transform-origin: var(--radix-popper-transform-origin); --radix-dropdown-menu-content-available-width: var(--radix-popper-available-width); --radix-dropdown-menu-content-available-height: var(--radix-popper-available-height); --radix-dropdown-menu-trigger-width: var(--radix-popper-anchor-width); --radix-dropdown-menu-trigger-height: var(--radix-popper-anchor-height); pointer-events: auto;">
			<div role="menuitem" class="fp-MenuItem" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">Show version history</div>
			<div role="menuitem" class="fp-MenuItem" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">Publish library…</div>
			<div role="menuitem" class="fp-MenuItem" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">Export…</div>
			<div role="separator" aria-orientation="horizontal" class="fp-MenuSeparator"></div>
			<div role="menuitem" class="fp-MenuItem" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">Add to sidebar</div>
			<div role="separator" aria-orientation="horizontal" class="fp-MenuSeparator"></div>
			<div role="menuitem" class="fp-MenuItem" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">Create branch…</div>
			<div role="separator" aria-orientation="horizontal" class="fp-MenuSeparator"></div><div role="menuitem" id="radix-:r2d:" aria-haspopup="menu" aria-expanded="false" aria-controls="radix-:r2c:" data-state="closed" class="fp-MenuItem" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">File color profile...<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fp-Icon fp-size-6 fp-MenuSubtriggerCaret" fill="none"><path stroke="var(--color-icon)" stroke-linecap="round" d="M11.121 14.121L13.243 12L11.12 9.879"></path></svg></div><div role="separator" aria-orientation="horizontal" class="fp-MenuSeparator"></div><div role="menuitem" class="fp-MenuItem" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">Duplicate</div><div role="menuitem" class="fp-MenuItem" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">Rename</div>
			<div role="menuitem" class="fp-MenuItem" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">Move to project…</div>
			<div role="menuitem" class="fp-MenuItem" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">Delete…</div>
			<div role="group">
				<div role="menuitemradio" aria-checked="true" class="fp-MenuItem fp-MenuRadioItem" data-state="checked" tabindex="-1" data-orientation="vertical" data-radix-collection-item=""><span class="fp-MenuItemIndicator" data-state="checked"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="fp-Icon fp-size-4" fill="none"><circle fill="var(--color-icon)" cx="8" cy="8" r="3"></circle></svg></span>This</div><div role="menuitemradio" aria-checked="false" class="fp-MenuItem fp-MenuRadioItem" data-state="unchecked" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">Or this</div><div role="menuitemradio" aria-checked="false" class="fp-MenuItem fp-MenuRadioItem" data-state="unchecked" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">Or this one</div></div><div role="menuitemcheckbox" aria-checked="true" class="fp-MenuItem fp-MenuCheckboxItem" data-state="checked" tabindex="-1" data-orientation="vertical" data-radix-collection-item=""><span class="fp-MenuItemIndicator" data-state="checked"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="fp-Icon fp-size-4" fill="none"><path fill="var(--color-icon)" fill-rule="evenodd" clip-rule="evenodd" d="M11.777 4.08399C11.8873 4.1575 11.9639 4.27178 11.99 4.40172C12.016 4.53167 11.9894 4.66665 11.916 4.77699L7.91602 10.777C7.87506 10.8387 7.82091 10.8905 7.75748 10.9287C7.69405 10.9669 7.62294 10.9905 7.54926 10.9979C7.47559 11.0053 7.40119 10.9962 7.33146 10.9713C7.26172 10.9464 7.19839 10.9063 7.14602 10.854L4.14602 7.85399C4.09953 7.80751 4.06266 7.75232 4.0375 7.69158C4.01234 7.63084 3.99939 7.56574 3.99939 7.49999C3.99939 7.43425 4.01234 7.36915 4.0375 7.30841C4.06266 7.24767 4.09953 7.19248 4.14602 7.14599C4.19251 7.09951 4.2477 7.06263 4.30844 7.03747C4.36918 7.01231 4.43428 6.99936 4.50002 6.99936C4.56577 6.99936 4.63087 7.01231 4.6916 7.03747C4.75234 7.06263 4.80753 7.09951 4.85402 7.14599L7.42202 9.71599L11.084 4.22299C11.1575 4.11271 11.2718 4.03612 11.4018 4.01006C11.5317 3.98399 11.6667 4.01059 11.777 4.08399Z"></path></svg></span>Display P3</div><div role="menuitemcheckbox" aria-checked="false" class="fp-MenuItem fp-MenuCheckboxItem" data-state="unchecked" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">Change to sRGB</div></div>
	</Story>
	
	
	