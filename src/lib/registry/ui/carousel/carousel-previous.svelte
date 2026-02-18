<script lang="ts">
  import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
  import ArrowUpIcon from '@lucide/svelte/icons/arrow-up';
  import type { WithoutChildren } from 'bits-ui';

  import { Button, type Props } from '$lib/registry/ui/button/index.ts';

  import { getEmblaContext } from './context.js';

  let { ref = $bindable(null), variant = 'primary', size = 'icon', ...restProps }: WithoutChildren<Props> = $props();

  const emblaCtx = getEmblaContext('<Carousel.Previous/>');
</script>

<Button
  data-slot="carousel-previous"
  {variant}
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
