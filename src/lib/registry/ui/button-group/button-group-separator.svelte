<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import { Separator } from '$lib/registry/ui/separator/index.ts';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    color,
    orientation = 'vertical',
    ...restProps
  }: ComponentProps<typeof Separator> & {
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();
</script>

<Separator
  bind:ref
  data-slot="button-group-separator"
  {orientation}
  {color}
  class={cn('relative m-0! neoretro-shadow self-stretch neoretro-border data-[orientation=vertical]:h-auto', className)}
  {...restProps}
/>
