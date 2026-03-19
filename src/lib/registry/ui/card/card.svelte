<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    color,
    noShadow = false,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    noShadow?: boolean;
  } = $props();
</script>

<div
  bind:this={ref}
  data-slot="card"
  data-color={color}
  class={cn(
    'gap-4 rounded neoretro-border neoretro-clr py-4 flex flex-col',
    noShadow ? '' : 'neoretro-shadow',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
