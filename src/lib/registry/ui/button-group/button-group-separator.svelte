<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import { colorMap, type ThemeColor } from '$lib/colors.js';
  import { Separator } from '$lib/registry/ui/separator/index.ts';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    color,
    orientation = 'vertical',
    ...restProps
  }: ComponentProps<typeof Separator> & { color: ThemeColor } = $props();
</script>

<Separator
  bind:ref
  data-slot="button-group-separator"
  {orientation}
  class={cn(
    'relative m-0! neoretro-shadow self-stretch neoretro-border data-[orientation=vertical]:h-auto',
    colorMap[color as ThemeColor],
    className,
  )}
  {...restProps}
/>
