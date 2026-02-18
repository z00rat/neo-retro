<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import { Separator } from '$lib/registry/ui/separator/index.ts';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    orientation = 'vertical',
    ...restProps
  }: ComponentProps<typeof Separator> = $props();
</script>

<Separator
  bind:ref
  data-slot="button-group-separator"
  {orientation}
  class={cn(
    'relative m-0! neoretro-shadow self-stretch neoretro-border neoretro-default data-[orientation=vertical]:h-auto',
    className,
  )}
  {...restProps}
/>
