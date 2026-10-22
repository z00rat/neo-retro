<script lang="ts">
  import { buttonVariants } from '#lib/registry/ui/button/index.ts';
  import { cn, type Color } from '#lib/utils.ts';
  import { Dialog as SheetPrimitive } from 'bits-ui';

  let {
    ref = $bindable(null),
    class: className,
    color,
    ...restProps
  }: SheetPrimitive.CloseProps & {
    color: Color;
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
