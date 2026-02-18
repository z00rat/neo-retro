<script lang="ts" module>
  import { tv, type VariantProps } from 'tailwind-variants';

  export const toggleVariants = tv({
    base: "neoretro-border neoretro-default cursor-pointer data-[state=on]:neoretro-primary focus-visible:neoretro-focus aria-invalid:neoretro-destructive inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium outline-none disabled:neoretro-disable [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    variants: {
      size: {
        default: 'h-9 min-w-9 px-2',
        sm: 'h-8 min-w-8 px-1.5',
        lg: 'h-10 min-w-10 px-2.5',
      },
      noShadow: {
        true: '',
        false: 'neoretro-shadow',
      },
    },
    defaultVariants: {
      size: 'default',
      noShadow: false,
    },
  });

  export type ToggleSize = VariantProps<typeof toggleVariants>['size'];
  export type ToggleVariants = VariantProps<typeof toggleVariants>;
</script>

<script lang="ts">
  import { Toggle as TogglePrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    pressed = $bindable(false),
    class: className,
    noShadow,
    size,
    ...restProps
  }: TogglePrimitive.RootProps & {
    size?: ToggleSize;
    noShadow?: boolean;
  } = $props();
</script>

<TogglePrimitive.Root
  bind:ref
  bind:pressed
  data-slot="toggle"
  data-pressable
  class={cn(toggleVariants({ size, noShadow }), className)}
  {...restProps}
/>
