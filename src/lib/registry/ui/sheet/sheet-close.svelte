<script lang="ts">
  import { Dialog as SheetPrimitive } from 'bits-ui';

  import { buttonVariants } from '$lib/registry/ui/button/index.ts';
  import { cn } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    color,
    ...restProps
  }: SheetPrimitive.CloseProps & {
    color: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();
</script>

<SheetPrimitive.Close
  bind:ref
  data-slot="sheet-close"
  data-pressable
  data-color={color}
  class={cn(buttonVariants(), 'neoretro-clr', className)}
  {...restProps}
/>
