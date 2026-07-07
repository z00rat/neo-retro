<script lang="ts">
  import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn, type WithoutChildrenOrChild } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithoutChildrenOrChild<RadioGroupPrimitive.ItemProps> = $props();

  let getColor = getContext<() => string>('radioGroupColor');
</script>

<RadioGroupPrimitive.Item
  bind:ref
  data-slot="radio-group-item"
  data-color={getColor()}
  class={cn(
    'size-4 neoretro-border text-foreground focus-visible:neoretro-focus disabled:neoretro-disable data-[state=checked]:bg-clr data-[state=checked]:text-on-clr data-[state=checked]:selection:bg-on-clr data-[state=checked]:selection:text-clr aspect-square rounded-full',
    getColor() === 'white' || getColor() === 'black' ? 'bg-transparent' : 'bg-background',
    className,
  )}
  {...restProps}
/>
