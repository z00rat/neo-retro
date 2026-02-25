<script lang="ts" module>
  import { tv } from 'tailwind-variants';

  export const badgeVariants = tv({
    base: 'neoretro-clr inline-flex items-center justify-center rounded neoretro-border neoretro-focus px-2.5 py-0.5 text-xs font-base w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none',
  });

  export type BadgeProps = {
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  };
</script>

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
  }: WithElementRef<HTMLAnchorAttributes> & BadgeProps = $props();
</script>

<svelte:element
  this={href ? 'a' : 'span'}
  bind:this={ref}
  data-slot="badge"
  {href}
  data-color={color}
  class={cn(badgeVariants(), className)}
  {...restProps}
>
  {@render children?.()}
</svelte:element>
