<script lang="ts">
  import { cn } from '#lib/utils.ts';
  import { Dialog as SheetPrimitive } from 'bits-ui';

  let { ref = $bindable(null), class: className, ...restProps }: SheetPrimitive.TitleProps = $props();
</script>

<SheetPrimitive.Title bind:ref data-slot="sheet-title" class={cn('text-lg font-black', className)} {...restProps} />
