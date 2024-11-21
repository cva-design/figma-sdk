<script lang="ts">
  import './dialog-title.css';

  export let weight: 'normal' | 'strong' = 'strong';
</script>
  
  <h2 class="fp-DialogBaseTitle" class:strong={weight === 'strong'}>
    <slot />
  </h2>
  