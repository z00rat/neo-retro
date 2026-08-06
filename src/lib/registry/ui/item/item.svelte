<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type Color, type WithElementRef } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    child,
    children,
    color,
    size = 'default',
    noShadow = false,
    pressable,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    child?: Snippet<[{ props: Record<string, unknown> }]>;
    color: Color;
    size?: 'default' | 'sm';
    noShadow?: boolean;
    pressable?: boolean;
  } = $props();
</script>

{#if child}
  {@render child({
    props: {
      ...restProps,
      class: cn(
        'group/item neoretro-focus flex flex-wrap items-center rounded text-sm outline-none transition-colors duration-100 neoretro-border neoretro-clr',
        !noShadow && 'neoretro-shadow',
        size === 'default' && 'gap-4 p-4',
        size === 'sm' && 'gap-2.5 px-4 py-3',
        className,
      ),
      'data-color': color,
      'data-slot': 'item',
      'data-size': size,
      ...(pressable ? { 'data-pressable': '' } : {}),
    },
  })}
{:else}
  <div
    bind:this={ref}
    data-color={color}
    data-slot="item"
    data-size={size}
    data-pressable={pressable || undefined}
    class={cn(
      'group/item neoretro-focus rounded neoretro-border neoretro-clr text-sm mb-2 flex flex-wrap items-center transition-colors duration-100 outline-none',
      !noShadow && 'neoretro-shadow',
      size === 'default' && 'gap-4 p-4',
      size === 'sm' && 'gap-2.5 px-4 py-3',
      className,
    )}
    {...restProps}
  >
    {@render children?.()}
  </div>
{/if}
