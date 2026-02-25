<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    href,
    class: className,
    color,
    children,
    ...restProps
  }: WithElementRef<HTMLAnchorAttributes> & {
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();
</script>

<svelte:element
  this={href ? 'a' : 'span'}
  bind:this={ref}
  data-slot="badge"
  {href}
  data-color={color}
  class={cn(
    'font-base neoretro-focus inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded neoretro-border neoretro-clr px-2.5 py-0.5 text-xs whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</svelte:element>
