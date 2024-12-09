<script lang="ts">
  import { type VariantProps, cva } from "class-variance-authority";
  import type { HTMLAttributes } from "svelte/elements";
</script>

<div class="div-LayerTag">
  <div class="LayerTag">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8Z" fill="var(--color-1)"/>
      </svg>
      .icon
  </div>
</div>

<div class="div-LayerTag">
  <div class="LayerTag">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8Z" fill="var(--color-2)"/>
      </svg>
      <span class="disabled">.content</span>
      <button>
      <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 6.94999V14H3V6.94999C4.14112 6.71836 5 5.70948 5 4.5C5 3.29052 4.14112 2.28164 3 2.05001V0H2V2.05001C0.85888 2.28164 0 3.29052 0 4.5C0 5.70948 0.85888 6.71836 2 6.94999ZM4 4.5C4 3.67157 3.32843 3 2.5 3C1.67157 3 1 3.67157 1 4.5C1 5.32843 1.67157 6 2.5 6C3.32843 6 4 5.32843 4 4.5ZM10 0H9V7.05001C7.85888 7.28164 7 8.29052 7 9.5C7 10.7095 7.85888 11.7184 9 11.95V14H10V11.95C11.1411 11.7184 12 10.7095 12 9.5C12 8.29052 11.1411 7.28164 10 7.05001V0ZM11 9.5C11 10.3284 10.3284 11 9.5 11C8.67157 11 8 10.3284 8 9.5C8 8.67157 8.67157 8 9.5 8C10.3284 8 11 8.67157 11 9.5Z" fill="var(--figma-color-icon)" fill-opacity="0.8"/>
        </svg>
      </button>
      <button>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.00049 1V4H6.00049V1H5.00049ZM4 5H1V6H4V5ZM1.89669 9.89645C0.734929 11.0582 0.734931 12.9418 1.89669 14.1036C3.05845 15.2653 4.94204 15.2653 6.1038 14.1036L8.8538 11.3536L8.14669 10.6464L5.39669 13.3964C4.62545 14.1677 3.37503 14.1677 2.6038 13.3964C1.83256 12.6252 1.83256 11.3748 2.6038 10.6036L5.3538 7.85355L4.64669 7.14645L1.89669 9.89645ZM12 11H15V10H12V11ZM11.0007 12V15H10.0007V12H11.0007ZM14.1036 1.89646C12.9418 0.734692 11.0582 0.7347 9.89644 1.89647L7.14653 4.64642L7.85364 5.35352L10.6036 2.60358C11.3748 1.83233 12.6252 1.83233 13.3965 2.60357C14.1677 3.3748 14.1677 4.62521 13.3965 5.39645L10.6465 8.14642L11.3536 8.85352L14.1036 6.10355C15.2653 4.94179 15.2653 3.05821 14.1036 1.89646Z" fill="var(--figma-color-icon)" fill-opacity="0.8"/>
          </svg>
      </button>
  </div>
</div>

<style lang="scss">
  /* LayerTag */
  :root {
    --color-1: #7B61FF;
    --color-2: #1BC47D;
  }

  /* Auto layout */
.LayerTag{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px;
  gap: 8px;
  border: 1px solid #F0F0F0;
  border-radius: 6px;
  color: var(--figma-color-text);
}
/* Inside auto layout */
.div-LayerTag{
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-left: 8px;
}

.disabled{
  color: var(--figma-color-text-disabled);
}
</style>
