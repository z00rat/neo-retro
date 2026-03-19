<script lang="ts">
  import { Checkbox as CheckboxPrimitive } from 'bits-ui';

  import { cn, type WithoutChildrenOrChild } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    color,
    checked = $bindable(false),
    indeterminate = $bindable(false),
    class: className,
    ...restProps
  }: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> & {
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();
</script>

<CheckboxPrimitive.Root
  bind:ref
  data-slot="checkbox"
  data-color={color}
  class={cn(
    'peer size-4 rounded-sm neoretro-border focus-visible:neoretro-focus disabled:neoretro-disable flex shrink-0 items-center justify-center transition-none',
    checked || indeterminate ? 'bg-clr' : 'bg-background',
    className,
  )}
  bind:checked
  bind:indeterminate
  {...restProps}
>
  {#snippet children({ checked, indeterminate })}
    <div data-slot="checkbox-indicator" class="flex size-full items-center justify-center">
      {#if checked === true}
        <div class="size-2 rounded-sm bg-current"></div>
      {:else if indeterminate}
        <div class="h-1 w-2 rounded-sm bg-current"></div>
      {/if}
    </div>
  {/snippet}
</CheckboxPrimitive.Root>
