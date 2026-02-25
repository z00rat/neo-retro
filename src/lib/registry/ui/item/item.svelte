<!-- svelte-ignore state_referenced_locally -->
<script lang="ts" module>
  import { tv, type VariantProps } from 'tailwind-variants';

  export const itemVariants = tv({
    base: 'group/item neoretro-focus flex flex-wrap items-center rounded text-sm outline-none transition-colors duration-100',
    variants: {
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
      size: 'default',
      noShadow: false,
      border: 1,
    },
  });

  export type ItemSize = VariantProps<typeof itemVariants>['size'];
  export type ItemNoshadow = VariantProps<typeof itemVariants>['noShadow'];
  export type ItemBorder = VariantProps<typeof itemVariants>['border'];

  export type ItemProps = {
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    size?: ItemSize;
    noShadow?: ItemNoshadow;
    border?: 0 | 1 | 2;
    outline?: boolean;
    none?: boolean;
    pressable?: boolean;
  };
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    child,
    color,
    size,
    noShadow,
    border,
    outline,
    none,
    pressable,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    child?: Snippet<[{ props: Record<string, unknown> }]>;
  } & ItemProps = $props();

  if (outline) {
    noShadow = true;
    border = 2;
  } else if (none) {
    noShadow = true;
    border = 0;
  }

  const mergedProps = $derived({
    class: cn(itemVariants({ size, noShadow, border }), 'neoretro-clr', className),
    'data-color': color,
    'data-slot': 'item',
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
