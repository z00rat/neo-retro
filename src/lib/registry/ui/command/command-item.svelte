<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { hoverOutlineMap, type ThemeColor } from '$lib/colors.js';
  import { cn } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, ...restProps }: CommandPrimitive.ItemProps = $props();

  const getHoverColor = getContext<(() => ThemeColor) | undefined>('commandHoverColor');
</script>

<CommandPrimitive.Item
  bind:ref
  data-slot="command-item"
  class={cn(
    "neoretro-focus relative flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm select-none data-[disabled=true]:neoretro-disable [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    getHoverColor ? hoverOutlineMap[getHoverColor()] : '',
    className,
  )}
  {...restProps}
/>
