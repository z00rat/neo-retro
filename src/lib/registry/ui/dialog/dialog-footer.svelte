<script lang="ts">
  import { Dialog as DialogPrimitive } from 'bits-ui';
  import type { HTMLAttributes } from 'svelte/elements';

  import { Button } from '$lib/registry/ui/button/index.ts';
  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    showCloseButton = true,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    showCloseButton?: boolean;
  } = $props();
</script>

<div
  bind:this={ref}
  data-slot="dialog-footer"
  class={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
  {...restProps}
>
  {#if showCloseButton}
    <DialogPrimitive.Close>
      <Button variant="destructive" class="w-full">Cancel</Button>
    </DialogPrimitive.Close>
  {/if}
  {@render children?.()}
</div>
