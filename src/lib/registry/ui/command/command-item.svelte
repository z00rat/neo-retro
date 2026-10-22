<script lang="ts">
  import { cn } from '#lib/utils.ts';
  import { Command as CommandPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  let { ref = $bindable(null), class: className, ...restProps }: CommandPrimitive.ItemProps = $props();

  const getColor = getContext<() => string>('commandColor');
</script>

<CommandPrimitive.Item
  bind:ref
  data-slot="command-item"
  data-hover-color={getColor()}
  class={cn(
    "neoretro-focus gap-2 rounded neoretro-hover px-2 py-1.5 text-sm data-[disabled=true]:neoretro-disable [&_svg:not([class*='size-'])]:size-4 relative flex cursor-pointer items-center select-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
    className,
  )}
  {...restProps}
/>
