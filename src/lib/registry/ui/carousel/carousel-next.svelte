<script lang="ts">
  import ArrowDownIcon from '@lucide/svelte/icons/arrow-down';
  import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
  import type { WithoutChildren } from 'bits-ui';

  import { Button, type Props } from '$lib/registry/ui/button/index.ts';

  import { getEmblaContext } from './context.js';

  let { ref = $bindable(null), variant = 'primary', size = 'icon', ...restProps }: WithoutChildren<Props> = $props();

  const emblaCtx = getEmblaContext('<Carousel.Next/>');
</script>

<Button
  data-slot="carousel-next"
  {variant}
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
