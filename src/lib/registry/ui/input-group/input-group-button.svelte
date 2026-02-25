<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import { Button } from '$lib/registry/ui/button/index.ts';
  import { cn } from '$lib/utils.js';

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
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();
</script>

<Button
  bind:ref
  {type}
  data-size={size}
  {color}
  noShadow
  class={cn(
    'z-10 flex items-center gap-2 text-sm',
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
