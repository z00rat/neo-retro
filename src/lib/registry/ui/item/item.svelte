<!-- svelte-ignore state_referenced_locally -->
<script lang="ts" module>
  import { tv, type VariantProps } from 'tailwind-variants';

  export const itemVariants = tv({
    base: 'group/item neoretro-focus flex flex-wrap items-center rounded text-sm outline-none transition-colors duration-100',
    variants: {
      variant: {
        default: 'neoretro-default [a]:hover:neoretro-primary',
        primary: 'neoretro-primary [a]:hover:neoretro-accent',
        secondary: 'neoretro-secondary [a]:hover:neoretro-primary',
        accent: 'neoretro-accent [a]:hover:neoretro-primary',
        destructive: 'neoretro-destructive [a]:hover:neoretro-primary',
        none: '[a]:hover:neoretro-primary',
      },
      size: {
        default: 'gap-4 p-4',
        sm: 'gap-2.5 px-4 py-3',
      },
      noShadow: {
        true: 'shadow-none',
        false: 'neoretro-shadow',
      },
      border: {
        0: 'border-none',
        1: 'neoretro-border',
        2: 'neoretro-border border-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      noShadow: false,
      border: 1,
    },
  });

  export type ItemSize = VariantProps<typeof itemVariants>['size'];
  export type ItemVariant = VariantProps<typeof itemVariants>['variant'];
  export type ItemNoshadow = VariantProps<typeof itemVariants>['noShadow'];
  export type ItemBorder = VariantProps<typeof itemVariants>['border'];
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    child,
    variant,
    size,
    noShadow,
    border,
    outline,
    none,
    pressable,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    child?: Snippet<[{ props: Record<string, unknown> }]>;
    variant?: ItemVariant;
    size?: ItemSize;
    noShadow?: ItemNoshadow;
    outline?: boolean;
    none?: boolean;
    border?: 0 | 1 | 2;
    pressable?: boolean;
  } = $props();

  if (outline) {
    noShadow = true;
    border = 2;
    variant ??= 'none';
  } else if (none) {
    noShadow = true;
    border = 0;
    variant ??= 'none';
  }

  const mergedProps = $derived({
    class: cn(itemVariants({ variant, size, noShadow, border }), className),
    'data-slot': 'item',
    'data-variant': variant,
    'data-size': size,
    ...(pressable ? { 'data-pressable': '' } : {}),
    ...restProps,
  });
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <div bind:this={ref} {...mergedProps}>
    {@render mergedProps.children?.()}
  </div>
{/if}
