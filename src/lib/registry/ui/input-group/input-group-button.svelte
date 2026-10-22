<script lang="ts">
  import { Button } from '#lib/registry/ui/button/index.ts';
  import { cn, type Color } from '#lib/utils.ts';
  import type { ComponentProps } from 'svelte';

  let {
    ref = $bindable(null),
    class: className,
    children,
    type = 'button',
    color,
    size = 'xs',
    ...restProps
  }: Omit<ComponentProps<typeof Button>, 'href' | 'size'> & {
    size?: 'xs' | 'sm' | 'icon-xs' | 'icon-sm';
    color: Color;
  } = $props();
</script>

<Button
  bind:ref
  {type}
  data-size={size}
  {color}
  noShadow
  class={cn(
    'gap-2 text-sm z-10 flex items-center',
    size === 'xs' && "*:not([class*='size-']):has-[svg]:size-3.5 h-6 gap-1 px-2 has-[>svg]:px-2",
    size === 'sm' && 'h-8 gap-1.5 px-2.5 has-[>svg]:px-2.5',
    size === 'icon-xs' && 'size-6 p-0 has-[>svg]:p-0',
    size === 'icon-sm' && 'size-8 p-0 has-[>svg]:p-0',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</Button>
