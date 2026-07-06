<script lang="ts">
  import { Tooltip as TooltipPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    child,
    children,
    ...restProps
  }: TooltipPrimitive.TriggerProps = $props();
</script>

<TooltipPrimitive.Trigger
  bind:ref
  data-slot="tooltip-trigger"
  class={cn('neoretro-focus', className)}
  {child}
  {children}
  {...restProps}
/>
