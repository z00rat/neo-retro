<script lang="ts">
  import { cn } from '#lib/utils.ts';
  import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';

  let { ref = $bindable(null), class: className, ...restProps }: ContextMenuPrimitive.SeparatorProps = $props();
</script>

<ContextMenuPrimitive.Separator
  bind:ref
  data-slot="context-menu-separator"
  class={cn('-mx-1 my-1 bg-border h-px', className)}
  {...restProps}
/>
