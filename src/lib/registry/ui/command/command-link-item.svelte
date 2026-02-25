<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, ...restProps }: CommandPrimitive.LinkItemProps = $props();

  const getColor = getContext<() => any>('commandColor');
</script>

<CommandPrimitive.LinkItem
  bind:ref
  data-slot="command-item"
  data-hover-color={getColor()}
  class={cn(
    "neoretro-focus relative flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm neoretro-link select-none data-[disabled=true]:neoretro-disable [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    'neoretro-hover',
    className,
  )}
  {...restProps}
/>
