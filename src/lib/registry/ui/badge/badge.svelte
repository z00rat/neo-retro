<script lang="ts" module>
  import { tv } from 'tailwind-variants';

  import type { ThemeColor } from '$lib/colors.js';

  export const badgeVariants = tv({
    base: 'inline-flex items-center justify-center rounded neoretro-border neoretro-focus px-2.5 py-0.5 text-xs font-base w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none',
  });

  export type BadgeProps = {
    color: ThemeColor;
  };
</script>

<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  import { colorMap } from '$lib/colors.js';
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
  class={cn(badgeVariants(), colorMap[color], className)}
  {...restProps}
>
  {@render children?.()}
</svelte:element>
