<script lang="ts">
  import type { Separator as SeparatorPrimitive } from 'bits-ui';

  import { Separator } from '$lib/registry/ui/separator/index.ts';
  import { cn } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, ...restProps }: SeparatorPrimitive.RootProps = $props();
</script>

<Separator
  bind:ref
  data-slot="select-separator"
  class={cn('-mx-1 my-1 h-px neoretro-border', className)}
  {...restProps}
/>
