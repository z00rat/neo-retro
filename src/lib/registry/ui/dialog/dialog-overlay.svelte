<script lang="ts">
  import { cn } from '#lib/utils.ts';
  import { Dialog as DialogPrimitive } from 'bits-ui';

  let { ref = $bindable(null), class: className, ...restProps }: DialogPrimitive.OverlayProps = $props();
</script>

<DialogPrimitive.Overlay bind:ref data-slot="dialog-overlay" class={cn('neoretro-overlay', className)} {...restProps} />
