<script lang="ts">
  import CircleIcon from '@lucide/svelte/icons/circle';
  import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithoutChildrenOrChild<RadioGroupPrimitive.ItemProps> = $props();

  let colorFn = getContext<() => any>('radioGroupColor');
  let color = $derived(colorFn ? colorFn() : 'cyan');
</script>

<RadioGroupPrimitive.Item
  bind:ref
  data-slot="radio-group-item"
  data-color={color}
  class={cn(
    'aspect-square size-4 rounded neoretro-border bg-background text-foreground focus-visible:neoretro-focus disabled:neoretro-disable',
    'data-[state=checked]:bg-clr data-[state=checked]:text-on-clr data-[state=checked]:selection:bg-on-clr data-[state=checked]:selection:text-clr',
    className,
  )}
  {...restProps}
>
  {#snippet children({ checked })}
    <div data-slot="radio-group-indicator" class="flex items-center justify-center">
      {#if checked}
        <CircleIcon class="size-1.5 fill-current text-current" />
      {/if}
    </div>
  {/snippet}
</RadioGroupPrimitive.Item>
