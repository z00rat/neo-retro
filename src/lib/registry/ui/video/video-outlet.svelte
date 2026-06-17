<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.ts';

  import './register.ts';

  let {
    ref = $bindable(null),
    class: className,
    preload = 'metadata',
    playsinline = true,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    preload?: 'none' | 'metadata' | 'auto';
    playsinline?: boolean;
  } = $props();
</script>

<media-outlet bind:this={ref} data-slot="video-outlet" class={cn('h-full w-full', className)} {...restProps}>
  {#if children}
    {@render children?.()}
  {:else}
    <video {preload} {playsinline}></video>
  {/if}
</media-outlet>
