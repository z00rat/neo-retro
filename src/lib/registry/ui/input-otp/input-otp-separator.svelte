<script lang="ts">
  import MinusIcon from '@lucide/svelte/icons/minus';
  import { type WithElementRef } from '#lib/utils.ts';
  import type { HTMLAttributes } from 'svelte/elements';

  let { ref = $bindable(null), children, ...restProps }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div bind:this={ref} data-slot="input-otp-separator" role="separator" {...restProps}>
  {#if children}
    {@render children?.()}
  {:else}
    <MinusIcon class="size-4" />
  {/if}
</div>
