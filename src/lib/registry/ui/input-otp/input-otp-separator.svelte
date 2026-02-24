<script lang="ts">
  import MinusIcon from '@lucide/svelte/icons/minus';
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div bind:this={ref} data-slot="input-otp-separator" role="separator" class={cn('', className)} {...restProps}>
  {#if children}
    {@render children?.()}
  {:else}
    <MinusIcon class="size-4" />
  {/if}
</div>
