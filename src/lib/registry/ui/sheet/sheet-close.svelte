<script lang="ts">
  import { Dialog as SheetPrimitive } from 'bits-ui';

  import { colorMap, type ThemeColor } from '$lib/colors.js';
  import { buttonVariants } from '$lib/registry/ui/button/index.ts';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    color,
    ...restProps
  }: SheetPrimitive.CloseProps & { color: ThemeColor } = $props();
</script>

<SheetPrimitive.Close
  bind:ref
  data-slot="sheet-close"
  data-pressable
  class={cn(buttonVariants(), colorMap[color], className)}
  {...restProps}
/>
