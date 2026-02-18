<script lang="ts" module>
  import { tv, type VariantProps } from 'tailwind-variants';

  export const badgeVariants = tv({
    base: 'inline-flex items-center justify-center rounded neoretro-border neoretro-focus px-2.5 py-0.5 text-xs font-base w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none',
    variants: {
      variant: {
        default: 'neoretro-default',
        primary: 'neoretro-primary',
        secondary: 'neoretro-secondary',
        accent: 'neoretro-accent',
        destructive: 'neoretro-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  });
</script>

<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    href,
    class: className,
    variant = 'default',
    children,
    ...restProps
  }: WithElementRef<HTMLAnchorAttributes> & {
    variant?: VariantProps<typeof badgeVariants>['variant'];
  } = $props();
</script>

<svelte:element
  this={href ? 'a' : 'span'}
  bind:this={ref}
  data-slot="badge"
  {href}
  class={cn(badgeVariants({ variant }), className)}
  {...restProps}
>
  {@render children?.()}
</svelte:element>
