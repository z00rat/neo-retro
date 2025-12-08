<script lang="ts">
  import { cn, type WithElementRef } from '$lib/utils.js';
  import type { HTMLAttributes } from 'svelte/elements';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Dialog as SheetPrimitive } from 'bits-ui';
  import XIcon from '@lucide/svelte/icons/x';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div bind:this={ref} data-slot="sheet-footer" class={cn('mt-auto flex flex-col gap-3 p-4', className)} {...restProps}>
  <SheetPrimitive.Close>
    <Button variant="destructive" class="w-full">Cancel</Button>
  </SheetPrimitive.Close>
  {@render children?.()}
</div>
