<script lang="ts">
  import ArrowDownIcon from '@lucide/svelte/icons/arrow-down';
  import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
  import { Button, type Props } from '#lib/registry/ui/button/index.ts';
  import type { WithoutChildren } from 'bits-ui';
  import { getContext } from 'svelte';

  import { getEmblaContext } from './context.ts';

  let { ref = $bindable(null), size = 'icon', ...restProps }: Omit<WithoutChildren<Props>, 'color'> = $props();

  const emblaCtx = getEmblaContext('<Carousel.Next/>');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getColor = getContext<() => any>('carouselColor');
</script>

<Button
  data-slot="carousel-next"
  color={getColor()}
  {size}
  disabled={!emblaCtx.canScrollNext}
  onclick={emblaCtx.scrollNext}
  onkeydown={emblaCtx.handleKeyDown}
  bind:ref
  {...restProps}
>
  {#if emblaCtx.orientation === 'horizontal'}
    <ArrowRightIcon class="size-4" />
  {:else}
    <ArrowDownIcon class="size-4" />
  {/if}
  <span class="sr-only">Next slide</span>
</Button>
