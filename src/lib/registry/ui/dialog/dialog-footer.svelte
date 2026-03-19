<script lang="ts">
  import { Dialog as DialogPrimitive } from 'bits-ui';
  import type { HTMLAttributes } from 'svelte/elements';

  import { Button } from '$lib/registry/ui/button/index.ts';
  import { cn, type WithElementRef } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    showCloseButton = true,
    closeColor = 'red',
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    showCloseButton?: boolean;
    closeColor?: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();
</script>

<div
  bind:this={ref}
  data-slot="dialog-footer"
  class={cn('gap-2 sm:flex-row sm:justify-end flex flex-col', className)}
  {...restProps}
>
  {#if showCloseButton}
    <DialogPrimitive.Close class="sm:w-auto w-full">
      <Button color={closeColor} class="w-full">Cancel</Button>
    </DialogPrimitive.Close>
  {/if}
  {@render children?.()}
</div>
