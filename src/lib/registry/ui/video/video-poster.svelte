<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { useVideoContext } from './context.svelte.ts';
  import { cn, type WithElementRef } from '$lib/utils.ts';

  import './register.ts';

  let {
    ref = $bindable(null),
    class: className,
    alt,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    alt?: string;
  } = $props();

  const video = useVideoContext();
</script>

<media-poster
  bind:this={ref}
  data-slot="video-poster"
  alt={alt ?? video.meta?.posterAlt ?? video.meta?.title ?? ''}
  class={cn('pointer-events-none absolute inset-0 h-full w-full object-cover', className)}
  {...restProps}
></media-poster>
