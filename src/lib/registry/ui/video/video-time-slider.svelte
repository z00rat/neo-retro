<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { useVideoContext } from './context.svelte.ts';
  import { cn, type WithElementRef } from '$lib/utils.ts';

  import './register.ts';

  let {
    ref = $bindable(null),
    class: className,
    showValue,
    showThumbnail = true,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    showValue?: boolean;
    showThumbnail?: boolean;
  } = $props();

  const video = useVideoContext();
</script>

<media-time-slider
  bind:this={ref}
  data-slot="video-time-slider"
  class={cn('mx-0.5 min-w-0 grow basis-32', className)}
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    <div slot="preview">
      {#if showThumbnail}
        <media-slider-thumbnail></media-slider-thumbnail>
      {/if}
      {#if showValue ?? video.showSliderValue}
        <media-slider-value type="pointer"></media-slider-value>
      {/if}
    </div>
  {/if}
</media-time-slider>
