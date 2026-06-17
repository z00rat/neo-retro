<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.ts';

  import './register.ts';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<media-buffering-indicator
  bind:this={ref}
  data-slot="video-buffering"
  class={cn('pointer-events-none absolute inset-auto z-20', className)}
  {...restProps}
></media-buffering-indicator>
