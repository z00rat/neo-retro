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

<media-volume-slider
  bind:this={ref}
  data-slot="video-volume-slider"
  class={cn('shrink-0 basis-16 grow-0 sm:basis-24', className)}
  {...restProps}
></media-volume-slider>
