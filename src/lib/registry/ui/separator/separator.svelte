<script lang="ts" module>
  import { Separator as SeparatorPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { tv, type VariantProps } from 'tailwind-variants';

  import { type Color } from '$lib/utils.ts';

  export const separatorVariants = tv({
    base: 'shrink-0 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full',
    variants: {
      thickness: {
        xs: 'data-[orientation=horizontal]:border-t-px data-[orientation=vertical]:border-l-px',
        sm: 'data-[orientation=horizontal]:border-t-[2px] data-[orientation=vertical]:border-l-[2px]',
        md: 'data-[orientation=horizontal]:border-t-[4px] data-[orientation=vertical]:border-l-[4px]',
        lg: 'data-[orientation=horizontal]:border-t-[8px] data-[orientation=vertical]:border-l-[8px]',
      },
      style: {
        solid: 'border-solid',
        dashed: 'border-dashed bg-transparent',
        dotted: 'border-dotted bg-transparent',
      },
    },
    defaultVariants: {
      thickness: 'sm',
      style: 'solid',
    },
  });

  export type SeparatorThickness = VariantProps<typeof separatorVariants>['thickness'];
  export type SeparatorStyle = VariantProps<typeof separatorVariants>['style'];

  export type SeparatorProps = Omit<SeparatorPrimitive.RootProps, 'color'> & {
    color?: 'black' | 'bright-black' | Color;
    thickness?: SeparatorThickness;
    style?: SeparatorStyle;
    children?: Snippet;
  };
</script>

<script lang="ts">
  import { cn } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    color = 'black',
    thickness,
    style = 'solid',
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
  data-color={color}
  class={children
    ? containerClasses
    : cn(separatorVariants({ thickness, style }), color ? 'border-clr' : 'border-border', className)}
  {...restProps}
>
  {#if children}
    <div
      data-color={color}
      class={cn('flex-1', separatorVariants({ thickness, style }), color ? 'border-clr' : 'border-border')}
      data-orientation={orientation}
    ></div>

    <div class="flex shrink-0 items-center justify-center">
      {@render children()}
    </div>

    <div
      data-color={color}
      class={cn('flex-1', separatorVariants({ thickness, style }), color ? 'border-clr' : 'border-border')}
      data-orientation={orientation}
    ></div>
  {/if}
</SeparatorPrimitive.Root>
