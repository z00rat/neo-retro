<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type Color, type WithElementRef } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    color,
    noShadow = false,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    color: Color;
    noShadow?: boolean;
  } = $props();
</script>

<div
  bind:this={ref}
  data-slot="alert"
  data-color={color}
  class={cn(
    'gap-y-0.5 rounded neoretro-border neoretro-clr px-4 py-3 has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-1 has-[>svg]:grid-cols-[--spacing(4)_1fr] relative grid w-full grid-cols-[0_1fr] items-start [&>svg]:text-current',
    noShadow ? '' : 'neoretro-shadow',
    className,
  )}
  {...restProps}
  role="alert"
>
  {@render children?.()}
</div>
