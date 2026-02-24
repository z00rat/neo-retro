<script lang="ts" module>
  import { tv, type VariantProps } from 'tailwind-variants';

  import type { ThemeColor } from '$lib/colors.js';

  export const itemMediaVariants = tv({
    base: 'flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none',
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "size-8 rounded neoretro-border [&_svg:not([class*='size-'])]:size-4",
        image: 'size-10 overflow-hidden rounded neoretro-border [&_img]:size-full [&_img]:object-cover',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  });

  export type ItemMediaVariant = VariantProps<typeof itemMediaVariants>['variant'];
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { colorMap } from '$lib/colors.js';
  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    variant = 'default',
    color,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    variant?: ItemMediaVariant;
    color?: ThemeColor;
  } = $props();
</script>

<div
  bind:this={ref}
  data-slot="item-media"
  data-variant={variant}
  class={cn(itemMediaVariants({ variant }), color ? colorMap[color] : '', className)}
  {...restProps}
>
  {@render children?.()}
</div>
