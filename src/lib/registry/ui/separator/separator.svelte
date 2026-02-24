<script lang="ts" module>
  import { Separator as SeparatorPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { tv, type VariantProps } from 'tailwind-variants';

  import type { ThemeColor } from '$lib/colors.js';

  export const separatorVariants = tv({
    base: 'shrink-0 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full',
    variants: {
      thickness: {
        xs: 'data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px',
        sm: 'data-[orientation=horizontal]:h-[2px] data-[orientation=vertical]:w-[2px]',
        md: 'data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1',
        lg: 'data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2',
      },
    },
    defaultVariants: {
      thickness: 'sm',
    },
  });

  export type SeparatorThickness = VariantProps<typeof separatorVariants>['thickness'];

  export type SeparatorProps = Omit<SeparatorPrimitive.RootProps, 'color'> & {
    color?: ThemeColor | any;
    thickness?: SeparatorThickness;
    children?: Snippet;
  };
</script>

<script lang="ts">
  import { bgColorMap } from '$lib/colors.js';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    color,
    thickness,
    orientation = 'horizontal',
    children,
    'data-slot': dataSlot = 'separator',
    ...restProps
  }: SeparatorProps = $props();

  const containerClasses = $derived(
    cn(
      'flex items-center justify-center w-full h-full',
      orientation === 'horizontal' ? 'flex-row gap-2' : 'flex-col gap-2',
      className,
    ),
  );
</script>

<SeparatorPrimitive.Root
  bind:ref
  {orientation}
  data-slot={dataSlot}
  class={children
    ? containerClasses
    : cn(separatorVariants({ thickness }), color ? bgColorMap[color as ThemeColor] : 'bg-border', className)}
  {...restProps}
>
  {#if children}
    <div
      class={cn('flex-1', separatorVariants({ thickness }), color ? bgColorMap[color as ThemeColor] : 'bg-border')}
      data-orientation={orientation}
    ></div>

    <div class="flex shrink-0 items-center justify-center">
      {@render children()}
    </div>

    <div
      class={cn('flex-1', separatorVariants({ thickness }), color ? bgColorMap[color as ThemeColor] : 'bg-border')}
      data-orientation={orientation}
    ></div>
  {/if}
</SeparatorPrimitive.Root>
