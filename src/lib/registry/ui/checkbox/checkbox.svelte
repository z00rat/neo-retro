<script lang="ts">
  // import CheckIcon from '@lucide/svelte/icons/check';
  // import MinusIcon from '@lucide/svelte/icons/minus';
  import { Checkbox as CheckboxPrimitive } from 'bits-ui';

  import { colorMap, type ThemeColor } from '$lib/colors.js';
  import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    color = 'cyan',
    checked = $bindable(false),
    indeterminate = $bindable(false),
    class: className,
    ...restProps
  }: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> & {
    color?: ThemeColor;
  } = $props();
</script>

<CheckboxPrimitive.Root
  bind:ref
  data-slot="checkbox"
  class={cn(
    'peer flex size-5 shrink-0 items-center justify-center rounded-sm neoretro-border transition-none focus-visible:neoretro-focus disabled:neoretro-disable',
    checked || indeterminate ? colorMap[color] : 'bg-background',
    className,
  )}
  bind:checked
  bind:indeterminate
  {...restProps}
>
  {#snippet children({ checked, indeterminate })}
    <div data-slot="checkbox-indicator" class="flex size-full items-center justify-center">
      {#if checked}
        <!-- <CheckIcon class="size-3.5" /> -->
        <div class="size-2.5 rounded-sm bg-current"></div>
      {:else if indeterminate}
        <!-- <MinusIcon class="size-3.5" /> -->
        <div class="h-1 w-2.5 rounded-sm bg-current"></div>
      {/if}
    </div>
  {/snippet}
</CheckboxPrimitive.Root>
