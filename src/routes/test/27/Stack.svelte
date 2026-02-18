<script lang="ts">
  import { cn } from '$lib/utils';

  export let as: keyof HTMLElementTagNameMap = 'div';
  export let gap: string = 'gap-0';
  export let align: string = '';
  export let justify: string = '';
  export let className = '';
</script>

<svelte:element this={as} class={cn('flex flex-col', gap, align, justify, className)}>
  <slot />
</svelte:element>
