<script lang="ts">
  import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
  import ArrowUpIcon from '@lucide/svelte/icons/arrow-up';
  import { Button, type Props } from '#lib/registry/ui/button/index.ts';
  import type { WithoutChildren } from 'bits-ui';
  import { getContext } from 'svelte';

  import { getEmblaContext } from './context.ts';

  let { ref = $bindable(null), size = 'icon', ...restProps }: Omit<WithoutChildren<Props>, 'color'> = $props();

  const emblaCtx = getEmblaContext('<Carousel.Previous/>');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getColor = getContext<() => any>('carouselColor');
</script>

<Button
  data-slot="carousel-previous"
  color={getColor()}
  {size}
  disabled={!emblaCtx.canScrollPrev}
  onclick={emblaCtx.scrollPrev}
  onkeydown={emblaCtx.handleKeyDown}
  bind:ref
  {...restProps}
>
  {#if emblaCtx.orientation === 'horizontal'}
    <ArrowLeftIcon class="size-4" />
  {:else}
    <ArrowUpIcon class="size-4" />
  {/if}
  <span class="sr-only">Previous slide</span>
</Button>
