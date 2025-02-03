<script context="module" lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
  import type { Meta } from '@storybook/svelte';
  import Alert from './alert.svelte';
  import type { SvelteComponent } from 'svelte';


export const meta = {
  title: 'Alert',
  component: Alert,
  argTypes: {
    text: { control: 'text' },
    type: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'hint']
    }
  }
} satisfies Meta<SvelteComponent>;
</script>

<Story
  name="Success"
  args={{
    text: 'This is a success message',
    type: 'success',
  }}
>
  <Alert text="This is a success message" type="success" />
</Story>

<Story
  name="Warning"
  args={{
    text: 'This is a warning message',
    type: 'warning',
  }}
>
  <Alert text="This is a warning message" type="warning" />
</Story>

<Story
  name="Danger"
  args={{
    text: 'This is an danger message',
    type: 'danger',
  }}
>
  <Alert text="This is an danger message" type="danger" />
</Story>

<Story
  name="Hint"
  args={{
    text: 'This is a hint message',
    type: 'hint',
  }}
>
  <Alert text="This is a hint message" type="hint" />
</Story> 
