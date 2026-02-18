<script lang="ts">
  import { ToggleGroup as ToggleGroupPrimitive } from 'bits-ui';

  import { toggleVariants, type ToggleVariants } from '$lib/registry/ui/toggle/index.ts';
  import { cn } from '$lib/utils.js';

  import { getToggleGroupCtx } from './toggle-group.svelte';

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    size,
    ...restProps
  }: ToggleGroupPrimitive.ItemProps & ToggleVariants = $props();

  const ctx = getToggleGroupCtx();
</script>

<ToggleGroupPrimitive.Item
  bind:ref
  data-slot="toggle-group-item"
  data-size={ctx.size || size}
  data-pressable
  class={cn(
    toggleVariants({
      size: ctx.size || size,
      noShadow: true,
    }),
    'neoretro-focus min-w-0 flex-1 shrink-0 overflow-hidden rounded-none border-none',
    className,
  )}
  {value}
  {...restProps}
/>
