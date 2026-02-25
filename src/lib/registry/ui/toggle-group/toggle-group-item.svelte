<script lang="ts">
  import { ToggleGroup as ToggleGroupPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { toggleVariants, type ToggleVariants } from '$lib/registry/ui/toggle/index.ts';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    size,
    ...restProps
  }: ToggleGroupPrimitive.ItemProps & ToggleVariants = $props();

  const getToggleGroup = getContext<() => any>('toggleGroup');
  let ctx = $derived(getToggleGroup());
  let resolvedColor = $derived(ctx.color);
</script>

<ToggleGroupPrimitive.Item
  bind:ref
  data-slot="toggle-group-item"
  data-size={ctx.size || size}
  data-pressable
  data-color={resolvedColor}
  class={cn(
    toggleVariants({
      size: ctx.size || size,
      noShadow: ctx.noShadow,
    }),
    'data-[state=on]:bg-clr data-[state=on]:text-on-clr data-[state=on]:selection:bg-on-clr data-[state=on]:selection:text-clr',
    ctx.orientation === 'vertical' && 'w-full',
    className,
  )}
  {value}
  {...restProps}
/>
