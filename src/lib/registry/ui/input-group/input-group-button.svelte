<script lang="ts" module>
  import { tv, type VariantProps } from 'tailwind-variants';

  const inputGroupButtonVariants = tv({
    base: 'flex items-center gap-2 text-sm z-10',
    variants: {
      size: {
        xs: "h-6 gap-1 px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
        sm: 'h-8 gap-1.5 px-2.5 has-[>svg]:px-2.5',
        'icon-xs': 'size-6 p-0 has-[>svg]:p-0',
        'icon-sm': 'size-8 p-0 has-[>svg]:p-0',
      },
    },
    defaultVariants: {
      size: 'xs',
    },
  });

  export type InputGroupButtonSize = VariantProps<typeof inputGroupButtonVariants>['size'];
</script>

<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import type { ThemeColor } from '$lib/colors.js';
  import { Button } from '$lib/registry/ui/button/index.ts';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    type = 'button',
    color = 'cyan',
    size = 'xs',
    ...restProps
  }: Omit<ComponentProps<typeof Button>, 'href' | 'size'> & {
    size?: InputGroupButtonSize;
    color?: ThemeColor;
  } = $props();
</script>

<Button
  bind:ref
  {type}
  data-size={size}
  {color}
  noShadow
  class={cn(inputGroupButtonVariants({ size }), className)}
  {...restProps}
>
  {@render children?.()}
</Button>
