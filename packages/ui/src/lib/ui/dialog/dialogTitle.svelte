<script lang="ts">
    export let weight: 'normal' | 'strong' = 'strong';
  </script>
  
  <h2 class="fp-DialogBaseTitle" class:strong={weight === 'strong'}>
    <slot />
  </h2>
  
  <style>
    .fp-DialogBaseTitle {
      margin: 0 0 16px 0;
      font-size: 16px;
      line-height: 1.4;
    }
  
    .strong {
      font-weight: 600;
    }
  </style>