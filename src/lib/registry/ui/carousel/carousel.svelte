<script lang="ts">
  import { setContext } from 'svelte';

  import { cn, type WithElementRef } from '$lib/utils.js';

  import { setEmblaContext, type CarouselAPI, type CarouselProps, type EmblaContext } from './context.js';

  let {
    ref = $bindable(null),
    color = 'black',
    opts = {},
    plugins = [],
    setApi = () => {},
    orientation = 'horizontal',
    class: className,
    children,
    ...restProps
  }: WithElementRef<CarouselProps> = $props();

  let carouselState = $state<EmblaContext>({
    get orientation() {
      return orientation;
    },
    get options() {
      return opts;
    },
    get plugins() {
      return plugins;
    },
    api: undefined,
    scrollPrev,
    scrollNext,
    canScrollNext: false,
    canScrollPrev: false,
    handleKeyDown,
    onInit,
    scrollSnaps: [],
    selectedIndex: 0,
    scrollTo,
  });

  setEmblaContext(carouselState);
  setContext('carouselColor', () => color);

  function scrollPrev() {
    carouselState.api?.scrollPrev();
  }

  function scrollNext() {
    carouselState.api?.scrollNext();
  }

  function scrollTo(index: number, jump?: boolean) {
    carouselState.api?.scrollTo(index, jump);
  }

  function onSelect() {
    if (!carouselState.api) return;
    carouselState.selectedIndex = carouselState.api.selectedScrollSnap();
    carouselState.canScrollNext = carouselState.api.canScrollNext();
    carouselState.canScrollPrev = carouselState.api.canScrollPrev();
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollNext();
    }
  }

  function onInit(event: CustomEvent<CarouselAPI>) {
    carouselState.api = event.detail;
    setApi(carouselState.api);

    carouselState.scrollSnaps = carouselState.api.scrollSnapList();
    carouselState.api.on('select', onSelect);
    onSelect();
  }

  $effect(() => {
    return () => {
      carouselState.api?.off('select', onSelect);
    };
  });
</script>

<div
  bind:this={ref}
  data-slot="carousel"
  class={cn(
    'relative w-full',
    carouselState.orientation === 'horizontal' ? 'flex items-center gap-2' : 'flex flex-col items-center gap-2',
    className,
  )}
  role="region"
  aria-roledescription="carousel"
  {...restProps}
>
  {@render children?.()}
</div>
