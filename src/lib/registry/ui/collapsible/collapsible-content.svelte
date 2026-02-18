<script lang="ts">
  import { Collapsible as CollapsiblePrimitive } from 'bits-ui';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: CollapsiblePrimitive.ContentProps & {
    className?: any;
  } = $props();
</script>

<CollapsiblePrimitive.Content
  bind:ref
  data-slot="collapsible-content"
  class={cn(
    'overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
    className,
  )}
  {...restProps}
/>
