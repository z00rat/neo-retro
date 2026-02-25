<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    variant = 'default',
    color,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    variant?: 'default' | 'icon' | 'image';
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();
</script>

<div
  bind:this={ref}
  data-slot="item-media"
  data-variant={variant}
  data-color={color}
  class={cn(
    'flex shrink-0 items-center justify-center gap-2 *:pointer-events-none group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start',
    variant === 'default' && 'bg-transparent',
    variant === 'icon' && '*:not([class*="size-"]):size-4 size-8 rounded neoretro-border',
    variant === 'image' && '*:is(img):size-full *:is(img):object-cover size-10 overflow-hidden rounded neoretro-border',
    color && 'neoretro-clr',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
