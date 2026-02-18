<script lang="ts">
  import { Checkbox as CheckboxPrimitive } from 'bits-ui';

  import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    checked = $bindable(false),
    indeterminate = $bindable(false),
    class: className,
    ...restProps
  }: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> = $props();
</script>

<CheckboxPrimitive.Root
  bind:ref
  data-slot="checkbox"
  class={cn(
    'peer size-5 shrink-0 neoretro-border focus-visible:neoretro-focus disabled:neoretro-disable',
    checked || indeterminate ? 'neoretro-primary' : 'neoretro-default',
    className,
  )}
  bind:checked
  bind:indeterminate
  {...restProps}
>
  {#snippet children({ checked, indeterminate })}
    <div data-slot="checkbox-indicator" class="flex size-full items-center justify-center">
      {#if checked}
        <div class="size-3 bg-current"></div>
      {:else if indeterminate}
        <div class="h-1 w-3 bg-current"></div>
      {/if}
    </div>
  {/snippet}
</CheckboxPrimitive.Root>
