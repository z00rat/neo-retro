<script lang="ts" module>
  import { tv, type VariantProps } from 'tailwind-variants';

  import type { ToggleVariants } from '$lib/registry/ui/toggle/index.ts';

  export const toggleGroupVariants = tv({
    base: 'rounded flex w-fit items-center [&>*]:relative [&>*]:focus-visible:z-20',
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

  export type ToggleGroupOrientation = VariantProps<typeof toggleGroupVariants>['orientation'];
</script>

<script lang="ts">
  import { ToggleGroup as ToggleGroupPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    color,
    size = 'default',
    orientation = 'horizontal',
    ...restProps
  }: ToggleGroupPrimitive.RootProps &
    ToggleVariants & {
      color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
      orientation?: ToggleGroupOrientation;
    } = $props();

  setContext('toggleGroup', () => ({
    size,
    noShadow: false,
    color,
    orientation,
  }));
</script>

<ToggleGroupPrimitive.Root
  bind:value={value as never}
  bind:ref
  data-slot="toggle-group"
  data-size={size}
  class={cn(toggleGroupVariants({ orientation }), className)}
  {...restProps}
/>
