<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    color,
    child,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    child?: Snippet<[{ props: Record<string, unknown> }]>;
  } = $props();
</script>

{#if child}
  {@render child({
    props: {
      ...restProps,
      class: cn(
        "neoretro-shadow neoretro-border neoretro-clr flex items-center gap-2 px-4 text-sm font-medium [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className,
      ),
      'data-color': color,
    },
  })}
{:else}
  <div
    bind:this={ref}
    data-color={color}
    class={cn(
      "flex neoretro-shadow items-center gap-2 neoretro-border neoretro-clr px-4 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
      className,
    )}
    {...restProps}
  >
    {@render children?.()}
  </div>
{/if}
