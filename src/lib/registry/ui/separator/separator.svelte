<script lang="ts" module>
  import { Separator as SeparatorPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { tv, type VariantProps } from 'tailwind-variants';

  export const separatorVariants = tv({
    base: 'shrink-0 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full',
    variants: {
      variant: {
        default: 'neoretro-default',
        primary: 'neoretro-primary',
        secondary: 'neoretro-secondary',
        accent: 'neoretro-accent',
        destructive: 'neoretro-destructive',
      },
      thickness: {
        xs: 'data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px',
        sm: 'data-[orientation=horizontal]:h-[1.5px] data-[orientation=vertical]:w-[1.5px]',
        md: 'data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5',
        lg: 'data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1',
      },
    },
    defaultVariants: {
      variant: 'primary',
      thickness: 'xs',
    },
  });

  export type SeparatorVariant = VariantProps<typeof separatorVariants>['variant'];
  export type SeparatorThickness = VariantProps<typeof separatorVariants>['thickness'];

  export type SeparatorProps = SeparatorPrimitive.RootProps & {
    variant?: SeparatorVariant;
    thickness?: SeparatorThickness;
    children?: Snippet;
  };
</script>

<script lang="ts">
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    variant,
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
  class={children ? containerClasses : cn(separatorVariants({ variant, thickness }), className)}
  {...restProps}
>
  {#if children}
    <div class={cn('flex-1', separatorVariants({ variant, thickness }))} data-orientation={orientation}></div>

    <div class="flex shrink-0 items-center justify-center">
      {@render children()}
    </div>

    <div class={cn('flex-1', separatorVariants({ variant, thickness }))} data-orientation={orientation}></div>
  {/if}
</SeparatorPrimitive.Root>
