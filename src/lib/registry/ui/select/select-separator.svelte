<script lang="ts">
  import type { Separator as SeparatorPrimitive } from 'bits-ui';

  import { Separator } from '$lib/registry/ui/separator/index.ts';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    color = 'black',
    ...restProps
  }: SeparatorPrimitive.RootProps & {
    color?: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();
</script>

<Separator
  bind:ref
  data-slot="select-separator"
  class={cn('-mx-1 my-1 h-px neoretro-border', className)}
  {color}
  {...restProps}
/>
