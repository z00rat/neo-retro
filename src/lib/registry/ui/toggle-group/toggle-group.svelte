<script lang="ts">
  import { ToggleGroup as ToggleGroupPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  import type { ToggleVariants } from '$lib/registry/ui/toggle/index.ts';
  import { cn, type Color } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    color,
    size = 'default',
    orientation = 'horizontal',
    noShadow,
    ...restProps
  }: ToggleGroupPrimitive.RootProps &
    ToggleVariants & {
      color: Color;
      orientation?: 'horizontal' | 'vertical';
      noShadow?: boolean;
    } = $props();

  setContext('toggleGroup', () => ({
    size,
    noShadow: noShadow ?? false,
    color,
    orientation,
  }));
</script>

<ToggleGroupPrimitive.Root
  bind:value={value as never}
  bind:ref
  data-slot="toggle-group"
  data-size={size}
  class={cn(
    'rounded flex w-fit items-center *:relative *:focus-visible:z-20',
    orientation === 'horizontal'
      ? '[&>*:not(:first-child)]:-ml-0.5 [&>*:not(:first-child)]:rounded-s-none [&>*:not(:last-child)]:rounded-e-none'
      : 'flex-col [&>*:not(:first-child)]:-mt-0.5 [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none',
    className,
  )}
  {...restProps}
/>
