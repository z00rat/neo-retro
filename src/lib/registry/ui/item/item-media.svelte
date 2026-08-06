<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type Color, type WithElementRef } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    children,
    variant = 'default',
    color,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    variant?: 'default' | 'icon' | 'image';
    color: 'black' | 'bright-black' | Color;
  } = $props();
</script>

<div
  bind:this={ref}
  data-slot="item-media"
  data-variant={variant}
  data-color={color}
  class={cn(
    'gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 flex shrink-0 items-center justify-center *:pointer-events-none group-has-data-[slot=item-description]/item:self-start',
    variant === 'default' && 'bg-transparent',
    variant === 'icon' && '*:not([class*="size-"]):size-4 size-8 rounded neoretro-border',
    variant === 'image' && '*:is(img):size-full *:is(img):object-cover size-10 rounded neoretro-border overflow-hidden',
    color && 'neoretro-clr',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
