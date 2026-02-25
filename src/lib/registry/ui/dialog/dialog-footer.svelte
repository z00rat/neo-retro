<script lang="ts">
  import { Dialog as DialogPrimitive } from 'bits-ui';
  import type { HTMLAttributes } from 'svelte/elements';

  import { Button } from '$lib/registry/ui/button/index.ts';
  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    showCloseButton = true,
    closeColor,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    showCloseButton?: boolean;
    closeColor?: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();
</script>

<div
  bind:this={ref}
  data-slot="dialog-footer"
  class={cn('flex flex-col gap-2 sm:flex-row sm:justify-end', className)}
  {...restProps}
>
  {#if showCloseButton && closeColor}
    <DialogPrimitive.Close class="w-full sm:w-auto">
      <Button color={closeColor} class="w-full">Cancel</Button>
    </DialogPrimitive.Close>
  {/if}
  {@render children?.()}
</div>
