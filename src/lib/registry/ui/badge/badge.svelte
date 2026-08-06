<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  import { cn, type Color, type WithElementRef } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    href,
    class: className,
    color,
    children,
    ...restProps
  }: WithElementRef<HTMLAnchorAttributes> & {
    color: 'black' | 'bright-black' | Color;
  } = $props();
</script>

<svelte:element
  this={href ? 'a' : 'span'}
  bind:this={ref}
  data-slot="badge"
  {href}
  data-color={color}
  class={cn(
    'neoretro-focus gap-1 rounded neoretro-border neoretro-clr px-2.5 py-0.5 text-xs [&>svg]:size-3 inline-flex w-fit shrink-0 items-center justify-center whitespace-nowrap [&>svg]:pointer-events-none',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</svelte:element>
