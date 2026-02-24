<script lang="ts" module>
  import { tv, type VariantProps } from 'tailwind-variants';

  export const buttonGroupVariants = tv({
    base: "rounded flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:relative [&>*]:focus-visible:z-20 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-e [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
    variants: {
      orientation: {
        horizontal:
          '[&>*:not(:first-child)]:-ml-[2px] [&>*:not(:first-child)]:rounded-s-none [&>*:not(:last-child)]:rounded-e-none',
        vertical:
          'flex-col [&>*:not(:first-child)]:-mt-[2px] [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  });

  export type ButtonGroupOrientation = VariantProps<typeof buttonGroupVariants>['orientation'];
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    orientation = 'horizontal',
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    orientation?: ButtonGroupOrientation;
  } = $props();
</script>

<div
  bind:this={ref}
  role="group"
  data-slot="button-group"
  data-orientation={orientation}
  class={cn(buttonGroupVariants({ orientation }), className)}
  {...restProps}
>
  {@render children?.()}
</div>
