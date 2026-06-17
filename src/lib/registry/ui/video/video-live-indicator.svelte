<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { useVideoContext } from './context.svelte.ts';
  import { cn, type WithElementRef } from '$lib/utils.ts';

  import './register.ts';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> = $props();

  const video = useVideoContext();
</script>

<media-live-indicator
  bind:this={ref}
  data-slot="video-live-indicator"
  data-color={video.color}
  class={cn('neoretro-border neoretro-shadow rounded px-2 text-[11px] font-bold uppercase', className)}
  {...restProps}
></media-live-indicator>
