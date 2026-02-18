<script lang="ts">
  import CircleIcon from '@lucide/svelte/icons/circle';
  import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';

  import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithoutChildrenOrChild<RadioGroupPrimitive.ItemProps> = $props();
</script>

<RadioGroupPrimitive.Item
  bind:ref
  data-slot="radio-group-item"
  class={cn(
    'neoretro-focus aspect-square size-4 neoretro-shadow rounded neoretro-border neoretro-primary disabled:neoretro-disable',
    className,
  )}
  {...restProps}
>
  {#snippet children({ checked })}
    <div data-slot="radio-group-indicator" class="flex items-center justify-center">
      {#if checked}
        <CircleIcon class="size-2 fill-current text-current" />
      {/if}
    </div>
  {/snippet}
</RadioGroupPrimitive.Item>
