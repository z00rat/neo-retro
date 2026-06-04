<script lang="ts">
  import { Dialog as SheetPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), class: className, ...restProps }: SheetPrimitive.OverlayProps = $props();
</script>

<SheetPrimitive.Overlay bind:ref data-slot="sheet-overlay" class={cn('neoretro-overlay', className)} {...restProps} />
