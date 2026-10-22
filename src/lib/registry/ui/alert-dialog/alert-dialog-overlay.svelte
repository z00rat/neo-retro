<script lang="ts">
  import { cn } from '#lib/utils.ts';
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';

  let { ref = $bindable(null), class: className, ...restProps }: AlertDialogPrimitive.OverlayProps = $props();
</script>

<AlertDialogPrimitive.Overlay
  bind:ref
  data-slot="alert-dialog-overlay"
  class={cn('neoretro-overlay', className)}
  {...restProps}
/>
