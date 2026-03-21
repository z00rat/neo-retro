<script lang="ts">
  import { Collapsible as CollapsiblePrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: CollapsiblePrimitive.ContentProps & { className?: string } = $props();
</script>

<CollapsiblePrimitive.Content
  bind:ref
  data-slot="collapsible-content"
  class={cn(
    'data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden',
    className,
  )}
  {...restProps}
/>
