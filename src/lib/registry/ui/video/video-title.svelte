<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { useVideoContext } from './context.svelte.ts';
  import { cn, type WithElementRef } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> = $props();

  const video = useVideoContext();
</script>

<span
  bind:this={ref}
  data-slot="video-title"
  class={cn('min-w-0 flex-1 truncate text-sm font-bold', className)}
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    {video.meta?.title ?? ''}
  {/if}
</span>
