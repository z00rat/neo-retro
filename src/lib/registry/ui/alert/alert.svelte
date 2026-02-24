<script lang="ts" module>
  import { tv, type VariantProps } from 'tailwind-variants';

  import type { ThemeColor } from '$lib/colors.js';

  export const alertVariants = tv({
    base: 'neoretro-border rounded relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 px-4 py-3 has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-1 [&>svg]:text-current',
    variants: {
      noShadow: {
        false: 'shadow-shadow',
        true: '',
      },
    },
    defaultVariants: {
      noShadow: false,
    },
  });

  export type AlertNoshadow = VariantProps<typeof alertVariants>['noShadow'];

  export type AlertProps = {
    color: ThemeColor;
    noShadow?: AlertNoshadow;
  };
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { colorMap } from '$lib/colors.js';
  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    color,
    noShadow,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & AlertProps = $props();
</script>

<div
  bind:this={ref}
  data-slot="alert"
  class={cn(alertVariants({ noShadow }), colorMap[color], className)}
  {...restProps}
  role="alert"
>
  {@render children?.()}
</div>
