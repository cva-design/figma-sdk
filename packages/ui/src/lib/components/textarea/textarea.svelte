<script lang="ts">
export const id = null;
export const value = null;
export const rows = 2;
export const name = null;
export const disabled = false;
export const placeholder = "Input something here...";
export { className as class };

const className = "";
</script>

<div class="textarea {className}">
	<textarea
		on:input
		on:change
		on:keydown
		on:focus
		on:blur
		{id}
		{name}
		{rows}
		{disabled}
		{placeholder}>{value}</textarea
	>
</div>

<style lang="scss">
.textarea {
  position: relative;
}

textarea {
  font-family: var(--font-family-default);
  font-size: var(--text-body-medium-font-size);
  font-weight: var(--font-weight-default);
  letter-spacing: var(--font-letter-spacing-neg-xsmall);
  line-height: var(--line-height);
  position: relative;
  display: flex;
  overflow: visible;
  align-items: center;
  width: 100%;
  min-height: 62px;
  margin: 1px 0 1px 0;
  padding: 7px 4px 9px 7px;
  color: var(--figma-color-text);
  border: 1px solid var(--figma-color-border);
  border-radius: var(--radius-medium);
  background-color: var(--figma-color-bg);
  resize: none;
  overflow-y: auto;
}
textarea:hover,
textarea:placeholder-shown:hover {
  color: var(--figma-color-text);
  border: 1px solid var(--figma-color-border);
  background-image: none;
}
textarea::selection {
  color: var(--figma-color-text);
  background-color: var(--color-texthighlight);
}
textarea::placeholder {
  color: var(--figma-color-text-tertiary);
  border: 1px solid transparent;
}
textarea:focus:placeholder-shown {
  border: 1px solid var(--figma-color-border-selected);
}
textarea:active,
textarea:focus {
  padding: 7px 4px 9px 7px;

  color: var(--figma-color-text);
  border: 1px solid var(--figma-color-border-selected);
  border-radius: var(--radius-medium);
}
textarea:disabled,
textarea:disabled:hover {
  position: relative;
  color: var(--figma-color-text-disabled);
  border: 1px solid transparent;
}
textarea:disabled:active {
  padding: 7px 4px 9px 7px;
}</style>
