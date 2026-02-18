<script lang="ts">
  import { Tooltip as TooltipPrimitive } from 'bits-ui';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, ...restProps }: TooltipPrimitive.TriggerProps = $props();
</script>

<TooltipPrimitive.Trigger bind:ref data-slot="tooltip-trigger" class={cn('neoretro-focus', className)} {...restProps} />
