<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), class: className, ...restProps }: CommandPrimitive.LinkItemProps = $props();

  const getColor = getContext<() => any>('commandColor');
</script>

<CommandPrimitive.LinkItem
  bind:ref
  data-slot="command-item"
  data-hover-color={getColor()}
  class={cn(
    "neoretro-focus gap-2 rounded neoretro-hover px-2 py-1.5 text-sm neoretro-link data-[disabled=true]:neoretro-disable [&_svg:not([class*='size-'])]:size-4 relative flex cursor-pointer items-center select-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
    className,
  )}
  {...restProps}
/>
