<script lang="ts">
  import { cn, type Color, type WithoutChildrenOrChild } from '#lib/utils.ts';
  import { Checkbox as CheckboxPrimitive } from 'bits-ui';

  let {
    ref = $bindable(null),
    color,
    checked = $bindable(false),
    indeterminate = $bindable(false),
    class: className,
    ...restProps
  }: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> & {
    color: 'black' | 'bright-black' | Color;
  } = $props();
</script>

<CheckboxPrimitive.Root
  bind:ref
  data-slot="checkbox"
  data-color={indeterminate ? 'black' : color}
  class={cn(
    'peer size-4 rounded-sm neoretro-border focus-visible:neoretro-focus disabled:neoretro-disable flex shrink-0 cursor-pointer items-center justify-center transition-none',
    checked || indeterminate ? 'bg-clr' : color === 'white' || color === 'black' ? 'bg-transparent' : 'bg-background',
    className,
  )}
  bind:checked
  bind:indeterminate
  {...restProps}
>
  {#snippet children({ indeterminate })}
    <div data-slot="checkbox-indicator" class="flex size-full items-center justify-center">
      {#if indeterminate}
        <div class="h-1 w-2 bg-border"></div>
      {/if}
    </div>
  {/snippet}
</CheckboxPrimitive.Root>
