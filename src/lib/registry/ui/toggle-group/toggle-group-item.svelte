<script lang="ts">
  import { ToggleGroup as ToggleGroupPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { onColorMap, type ThemeColor } from '$lib/colors.js';
  import { toggleVariants, type ToggleVariants } from '$lib/registry/ui/toggle/index.ts';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    color,
    size,
    ...restProps
  }: ToggleGroupPrimitive.ItemProps & ToggleVariants & { color?: any } = $props();

  const getToggleGroup = getContext<() => any>('toggleGroup');
  let ctx = $derived(getToggleGroup());
  let resolvedColor = $derived(ctx.color || color || 'cyan');
</script>

<ToggleGroupPrimitive.Item
  bind:ref
  data-slot="toggle-group-item"
  data-size={ctx.size || size}
  data-pressable
  class={cn(
    toggleVariants({
      size: ctx.size || size,
      noShadow: ctx.noShadow,
    }),
    onColorMap[resolvedColor as ThemeColor],
    ctx.orientation === 'vertical' && 'w-full',
    className,
  )}
  {value}
  {...restProps}
/>
