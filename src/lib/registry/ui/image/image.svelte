<script lang="ts">
  import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import ChevronsLeftIcon from '@lucide/svelte/icons/chevrons-left';
  import ChevronsRightIcon from '@lucide/svelte/icons/chevrons-right';
  import DownloadIcon from '@lucide/svelte/icons/download';
  import EyeIcon from '@lucide/svelte/icons/eye';
  import { parse } from 'marked';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { fly } from 'svelte/transition';
  import { thumbHashToDataURL } from 'thumbhash';

  import { Button, type ButtonProps } from '$lib/registry/ui/button';
  import * as Dialog from '$lib/registry/ui/dialog';
  import * as DropdownMenu from '$lib/registry/ui/dropdown-menu';
  import { cn, type WithElementRef } from '$lib/utils.ts';

  import { panzoom, type PanZoomAPI } from './panzoom';
  import type { ImageMeta } from './types';

  let {
    ref = $bindable(null),
    meta,
    images,
    alt,
    class: className = '',
    color,
    cancelColor,
    resetColor,
    downloadColor,
    edgeColor,
    prevNextColor,
    layout = 'masonry',
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    children?: Snippet;
    meta?: ImageMeta;
    images?: ImageMeta[];
    alt?: string;
    class?: string;
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    cancelColor: ButtonProps['color'];
    resetColor: ButtonProps['color'];
    downloadColor: ButtonProps['color'];
    edgeColor: ButtonProps['color'];
    prevNextColor: ButtonProps['color'];
    layout?: 'masonry' | 'grid' | 'list' | 'single';
  } = $props();

  let allImages = $derived(images ?? (meta ? [meta] : []));
  let isSingle = $derived(!images && !!meta);
  let layoutClass = $derived(
    (
      {
        masonry: 'sm:columns-2 gap-6 lg:columns-3 columns-1 [&>div]:mb-6',
        grid: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-start',
        list: 'gap-4 flex flex-col',
      } as Record<string, string | undefined>
    )[layout],
  );
  let currentIndex = $state(0);
  let slideDir = $state(1);
  let currentImage = $derived(allImages[currentIndex]);
  let currentAlt = $derived(alt ?? currentImage?.name ?? '');

  let isOpen = $state(false);
  let panzoomApi: PanZoomAPI | undefined = $state();

  function swipe(
    node: HTMLElement,
    params: { onSwipeLeft: () => void; onSwipeRight: () => void; isAtDefaultZoom: () => boolean },
  ) {
    let startX = 0;
    let startY = 0;

    function onTouchStart(e: TouchEvent) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }

    function onTouchEnd(e: TouchEvent) {
      if (!params.isAtDefaultZoom()) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const dx = endX - startX;
      const dy = endY - startY;

      if (Math.abs(dx) < 50) return;
      if (Math.abs(dy) > Math.abs(dx) * 0.5) return;

      if (dx > 0) {
        params.onSwipeRight();
      } else {
        params.onSwipeLeft();
      }
    }

    node.addEventListener('touchstart', onTouchStart, { passive: true });
    node.addEventListener('touchend', onTouchEnd, { passive: true });

    return {
      destroy() {
        node.removeEventListener('touchstart', onTouchStart);
        node.removeEventListener('touchend', onTouchEnd);
      },
    };
  }

  function thumbUrl(hash: string): string {
    try {
      const bin = atob(hash);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return thumbHashToDataURL(bytes);
    } catch {
      return '';
    }
  }

  let descHtml = $derived(
    currentImage.description ? (parse(currentImage.description, { async: false }) as string) : '',
  );
  function bindPanzoom(node: HTMLElement) {
    const api = panzoom(node);
    panzoomApi = api;
    return api;
  }

  function prev() {
    if (currentIndex > 0) {
      slideDir = -1;
      currentIndex--;
      panzoomApi?.reset();
    }
  }

  function next() {
    if (currentIndex < allImages.length - 1) {
      slideDir = 1;
      currentIndex++;
      panzoomApi?.reset();
    }
  }

  function openAtIndex(index: number) {
    slideDir = index > currentIndex ? 1 : -1;
    currentIndex = index;
    isOpen = true;
  }

  function downloadUrl(url: string, filename: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  }

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  }

  function handleCardKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      isOpen = true;
    }
  }

  function handleDialogKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    }
  }

  function imgSrcFor(img: ImageMeta): string {
    return img.urls.avif?.url ?? img.urls.webp!.url;
  }
</script>

{#snippet card(img: ImageMeta, index: number)}
  {@const src = imgSrcFor(img)}
  {@const th = thumbUrl(img.thumbhash)}
  <div
    class={cn(
      'neoretro-border neoretro-shadow group rounded relative inline-block w-full cursor-pointer overflow-hidden',
      isSingle ? '' : 'mb-6 break-inside-avoid',
    )}
    role="button"
    tabindex="0"
    onclick={() => openAtIndex(index)}
    onkeydown={handleCardKeydown}
  >
    {#if th}
      <div
        class="inset-0 absolute bg-cover bg-center transition-opacity duration-300"
        style="background-image: url({th})"
      ></div>
    {/if}
    <picture>
      {#if img.urls.avif}
        <source srcset={img.urls.avif.url} type="image/avif" />
      {/if}
      {#if img.urls.webp}
        <source srcset={img.urls.webp.url} type="image/webp" />
      {/if}
      <img {src} alt={alt ?? img.name} class="relative block h-auto w-full" loading="lazy" />
    </picture>
    <div
      class="inset-0 bg-black/40 absolute flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100"
    >
      <div
        class="neoretro-border neoretro-clr p-2 font-bold text-xs gap-1.5 neoretro-shadow flex items-center uppercase select-none"
        data-color={color}
      >
        <EyeIcon class="size-4" /> View Details
      </div>
    </div>
  </div>
{/snippet}

<div bind:this={ref} data-slot="image" data-color={color} class={cn(className)} {...restProps}>
  {#if isSingle || layout === 'single'}
    {@render card(allImages[0], 0)}
  {:else}
    <div class={layoutClass}>
      {#each allImages as img, i (i)}
        {@render card(img, i)}
      {/each}
    </div>
  {/if}

  {@render children?.()}

  <Dialog.Root bind:open={isOpen}>
    <Dialog.Content
      {color}
      onkeydown={handleDialogKeydown}
      class="sm:max-w-[80vw] p-6 flex! h-[85vh] max-h-[85vh] w-[90vw] flex-col! overflow-hidden"
    >
      <Dialog.Header>
        <div class="sm:flex-row sm:items-start sm:justify-between gap-2 flex flex-col">
          <Dialog.Title class="tracking-tight font-black text-lg shrink-0 uppercase italic select-none">
            {currentImage.name}
          </Dialog.Title>

          {#if descHtml}
            <div class="text-xs sm:text-right sm:max-w-md opacity-80 [&_a]:underline [&_a]:hover:opacity-70">
              <!-- eslint-disable-next-line svelte/no-at-html-tags -->
              {@html descHtml}
            </div>
          {/if}
        </div>

        {#if currentImage.kv}
          <div class="gap-1.5 flex flex-wrap">
            {#each Object.entries(currentImage.kv) as [key, value] (key)}
              <span
                class="gap-1 px-2.5 py-0.5 text-xs font-mono neoretro-border neoretro-clr rounded inline-flex items-center"
                data-color={color}
              >
                <span class="font-bold">{key}:</span>
                {value}
              </span>
            {/each}
          </div>
        {/if}
      </Dialog.Header>

      <div class="min-h-0 rounded bg-clr flex-1 overflow-hidden" data-color={color}>
        {#key currentIndex}
          <div
            class="h-full w-full"
            use:bindPanzoom
            use:swipe={{
              onSwipeLeft: next,
              onSwipeRight: prev,
              isAtDefaultZoom: () => (panzoomApi?.getScale() ?? 1) <= 1,
            }}
            in:fly={{ x: 200 * slideDir, duration: 200 }}
            out:fly={{ x: -200 * slideDir, duration: 200 }}
          >
            <img
              src={imgSrcFor(currentImage)}
              alt={currentAlt}
              class="pointer-events-none block h-full w-full object-contain select-none"
              draggable="false"
            />
          </div>
        {/key}
      </div>

      <Dialog.Footer closeColor="red" showCloseButton={false}>
        <div class="sm:flex-row sm:items-center gap-1 flex w-full flex-col">
          <div class="gap-1.5 sm:justify-start sm:w-auto flex w-full items-center justify-center">
            <Button color={cancelColor} class="text-xs" onclick={() => (isOpen = false)}>Cancel</Button>
            <Button
              color={resetColor}
              class="text-xs"
              onclick={() => {
                panzoomApi?.reset();
              }}>Reset</Button
            >

            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button color={downloadColor} class="text-xs"><DownloadIcon /> Download</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content side="top" align="end" color={downloadColor}>
                <DropdownMenu.Item onclick={() => downloadUrl(currentImage.urls.original.url, currentImage.id)}>
                  Original ({formatSize(currentImage.urls.original.size)})
                </DropdownMenu.Item>
                {#if currentImage.urls.webp}
                  {@const w = currentImage.urls.webp}
                  <DropdownMenu.Item onclick={() => downloadUrl(w.url, currentImage.id)}>
                    WebP ({formatSize(w.size)})
                  </DropdownMenu.Item>
                {/if}
                {#if currentImage.urls.avif}
                  {@const a = currentImage.urls.avif}
                  <DropdownMenu.Item onclick={() => downloadUrl(a.url, currentImage.id)}>
                    AVIF ({formatSize(a.size)})
                  </DropdownMenu.Item>
                {/if}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>

          {#if allImages.length > 1}
            <div
              class="gap-2 sm:gap-1 sm:ml-auto sm:justify-end sm:w-auto flex w-full flex-wrap items-center justify-center"
            >
              <Button
                color={edgeColor}
                class="text-xs sm:inline-flex hidden"
                size="icon"
                onclick={() => openAtIndex(0)}
                disabled={currentIndex <= 0}
              >
                <ChevronsLeftIcon class="size-4" />
              </Button>
              <Button
                color={prevNextColor}
                class="text-xs sm:inline-flex hidden"
                size="icon"
                onclick={prev}
                disabled={currentIndex <= 0}
              >
                <ChevronLeftIcon class="size-4" />
              </Button>
              <span class="text-xs font-mono w-10 sm:block hidden text-center select-none"
                >{currentIndex + 1}/{allImages.length}</span
              >
              <Button
                color={prevNextColor}
                class="text-xs sm:inline-flex hidden"
                size="icon"
                onclick={next}
                disabled={currentIndex >= allImages.length - 1}
              >
                <ChevronRightIcon class="size-4" />
              </Button>
              <Button
                color={edgeColor}
                class="text-xs sm:inline-flex hidden"
                size="icon"
                onclick={() => openAtIndex(allImages.length - 1)}
                disabled={currentIndex >= allImages.length - 1}
              >
                <ChevronsRightIcon class="size-4" />
              </Button>
            </div>
          {/if}
        </div>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</div>
