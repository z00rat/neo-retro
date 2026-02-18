<script lang="ts" module>
  import { tv, type VariantProps } from 'tailwind-variants';

  export const alertVariants = tv({
    base: 'neoretro-border rounded relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 px-4 py-3 has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-1 [&>svg]:text-current',
    variants: {
      variant: {
        default: 'neoretro-default',
        primary: 'neoretro-primary',
        secondary: 'neoretro-secondary',
        accent: 'neoretro-accent',
        destructive: 'neoretro-destructive',
      },
      noShadow: {
        false: 'shadow-shadow',
        true: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      noShadow: false,
    },
  });

  export type AlertVariant = VariantProps<typeof alertVariants>['variant'];
  export type AlertNoshadow = VariantProps<typeof alertVariants>['noShadow'];
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    variant = 'default',
    noShadow,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    variant?: AlertVariant;
    noShadow?: AlertNoshadow;
  } = $props();
</script>

<div
  bind:this={ref}
  data-slot="alert"
  class={cn(alertVariants({ variant, noShadow }), className)}
  {...restProps}
  role="alert"
>
  {@render children?.()}
</div>
