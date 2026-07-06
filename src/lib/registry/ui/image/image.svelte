<script lang="ts">
  import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import DownloadIcon from '@lucide/svelte/icons/download';
  import EyeIcon from '@lucide/svelte/icons/eye';
  import RotateCcwIcon from '@lucide/svelte/icons/rotate-ccw';
  import XIcon from '@lucide/svelte/icons/x';
  import { parse } from 'marked';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { SvelteSet } from 'svelte/reactivity';
  import { fly } from 'svelte/transition';
  import { thumbHashToDataURL } from 'thumbhash';

  import { Button, buttonVariants, type ButtonProps } from '$lib/registry/ui/button';
  import * as Dialog from '$lib/registry/ui/dialog';
  import * as DropdownMenu from '$lib/registry/ui/dropdown-menu';
  import { cn, type WithElementRef } from '$lib/utils.ts';

  import { panzoom, type PanZoomAPI } from './panzoom';
  import type { ImageMeta } from './types';

  type ImageLayout = 'masonry' | 'grid';
  type FeaturedPosition = 'side' | 'bottom';

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
    prevNextColor,
    layout = 'masonry',
    featured = false,
    featuredPosition = 'side',
    previewCount = 4,
    columns,
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
    prevNextColor: ButtonProps['color'];
    layout?: ImageLayout;
    featured?: boolean;
    featuredPosition?: FeaturedPosition;
    previewCount?: number;
    columns?: number;
  } = $props();

  let allImages = $derived(images ?? (meta ? [meta] : []));
  let isSingle = $derived(!images && !!meta);
  let hasFeaturedLayout = $derived(featured && allImages.length > 1);
  let normalizedPreviewCount = $derived(Math.max(0, Number(previewCount) || 0));
  let previewImages = $derived(allImages.slice(1, normalizedPreviewCount + 1));
  let hiddenPreviewCount = $derived(hasFeaturedLayout ? Math.max(0, allImages.length - 1 - previewImages.length) : 0);
  let hiddenPreviewIndex = $derived(previewImages.length + 1);
  let galleryClass = $derived(collectionClass(layout, 'gallery'));
  let galleryStyle = $derived(collectionStyle(layout, columns));
  let previewClass = $derived(collectionClass(layout, `preview-${featuredPosition}`));
  let previewStyle = $derived(collectionStyle(layout, columns));
  let featuredClass = $derived(
    featuredPosition === 'bottom'
      ? 'gap-4 grid items-start'
      : 'grid items-start gap-4 md:grid-cols-[minmax(0,1fr)_minmax(10rem,18rem)]',
  );
  let currentIndex = $state(0);
  let slideDir = $state(1);
  let currentImage = $derived(allImages[currentIndex]);
  let currentAlt = $derived(alt ?? currentImage?.name ?? '');
  let loadedImages = $state<Record<string, boolean>>({});

  let isOpen = $state(false);
  let downloadOpen = $state(false);
  let panzoomApi: PanZoomAPI | undefined = $state();
  let currentScale = $state(1);

  function swipe(
    node: HTMLElement,
    params: { onSwipeLeft: () => void; onSwipeRight: () => void; isAtDefaultZoom: () => boolean },
  ) {
    let startX = 0;
    let startY = 0;
    const activePointers = new SvelteSet<number>();
    let isMultiTouch = false;

    function onPointerDown(e: PointerEvent) {
      if (e.pointerType === 'touch') {
        activePointers.add(e.pointerId);
        if (activePointers.size > 1) {
          isMultiTouch = true;
        }
        if (activePointers.size === 1) {
          startX = e.clientX;
          startY = e.clientY;
          isMultiTouch = false;
        }
      }
    }

    function onPointerUp(e: PointerEvent) {
      if (e.pointerType === 'touch') {
        activePointers.delete(e.pointerId);

        if (activePointers.size === 0) {
          if (!isMultiTouch && params.isAtDefaultZoom()) {
            const endX = e.clientX;
            const endY = e.clientY;
            const dx = endX - startX;
            const dy = endY - startY;

            if (Math.abs(dx) >= 50 && Math.abs(dy) <= Math.abs(dx) * 0.5) {
              if (dx > 0) {
                params.onSwipeRight();
              } else {
                params.onSwipeLeft();
              }
            }
          }
          isMultiTouch = false;
        }
      }
    }

    node.addEventListener('pointerdown', onPointerDown, { passive: true });
    node.addEventListener('pointerup', onPointerUp, { passive: true });
    node.addEventListener('pointercancel', onPointerUp, { passive: true });

    return {
      destroy() {
        node.removeEventListener('pointerdown', onPointerDown);
        node.removeEventListener('pointerup', onPointerUp);
        node.removeEventListener('pointercancel', onPointerUp);
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
    const api = panzoom(node, {
      onScaleChange: (scale) => {
        currentScale = scale;
      },
    });
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

  function close() {
    isOpen = false;
    downloadOpen = false;
    panzoomApi?.reset();
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

  function formatMegapixels(width: number, height: number): string {
    return `${((width * height) / 1_000_000).toFixed(1)}MP`;
  }

  function formatRatio(aspectRatio: number): string {
    return aspectRatio >= 1 ? `${aspectRatio.toFixed(2)}:1` : `1:${(1 / aspectRatio).toFixed(2)}`;
  }

  function handleCardKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const index = Number((event.currentTarget as HTMLElement).dataset.index ?? 0);
      openAtIndex(index);
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
    return img.urls.avif?.url ?? img.urls.webp?.url ?? img.urls.original.url;
  }

  function collectionClass(kind: ImageLayout, scope: 'gallery' | 'preview-side' | 'preview-bottom') {
    if (kind === 'grid') {
      if (scope === 'preview-side') return 'gap-4 grid grid-cols-2 items-start md:grid-cols-1';
      if (scope === 'preview-bottom') return 'gap-4 grid grid-cols-2 items-start md:grid-cols-4';
      return 'gap-4 grid grid-cols-2 items-start sm:grid-cols-3 lg:grid-cols-4';
    }

    if (scope === 'preview-side') return 'columns-2 gap-4 md:columns-1 [&>div]:mb-4';
    if (scope === 'preview-bottom') return 'columns-2 gap-4 md:columns-4 [&>div]:mb-4';
    return 'columns-1 gap-6 sm:columns-2 lg:columns-3 [&>div]:mb-6';
  }

  function collectionStyle(kind: ImageLayout, value: number | undefined) {
    const count = Math.max(1, Number(value) || 0);
    if (!value || count < 1) return undefined;

    return kind === 'grid' ? `grid-template-columns: repeat(${count}, minmax(0, 1fr));` : `column-count: ${count};`;
  }
</script>

{#snippet card(img: ImageMeta, index: number)}
  {@const src = imgSrcFor(img)}
  {@const th = thumbUrl(img.thumbhash)}
  {@const isLoaded = loadedImages[img.id]}
  <div
    class={cn(
      'neoretro-border neoretro-shadow group rounded relative block w-full cursor-pointer overflow-hidden leading-none',
      isSingle || (hasFeaturedLayout && index === 0) ? '' : layout === 'masonry' ? 'break-inside-avoid' : '',
    )}
    data-color={color}
    data-index={index}
    role="button"
    tabindex="0"
    aria-label="Open {img.name}"
    onclick={() => openAtIndex(index)}
    onkeydown={handleCardKeydown}
  >
    {#if th}
      <div
        class={cn(
          'inset-0 absolute bg-cover bg-center transition-opacity duration-500',
          isLoaded ? 'opacity-0' : 'opacity-100',
        )}
        style="background-image: url({th})"
      ></div>
    {/if}
    <picture class="block leading-none">
      {#if img.urls.avif}
        <source srcset={img.urls.avif.url} type="image/avif" />
      {/if}
      {#if img.urls.webp}
        <source srcset={img.urls.webp.url} type="image/webp" />
      {/if}
      <img
        {src}
        alt={alt ?? img.name}
        class={cn('relative block w-full transition-opacity duration-500', isLoaded ? 'opacity-100' : 'opacity-0')}
        loading={index < 2 ? 'eager' : 'lazy'}
        decoding="async"
        onload={() => (loadedImages[img.id] = true)}
      />
    </picture>
    <div
      class={cn(
        'inset-0 bg-black/45 pointer-events-none absolute opacity-0 transition-opacity duration-200 group-hover:opacity-100',
        'flex items-center justify-center',
      )}
    >
      <div
        class="neoretro-border neoretro-clr neoretro-shadow gap-1.5 rounded px-3 py-2 text-xs font-bold flex items-center uppercase select-none"
        data-color={color}
      >
        <EyeIcon class="size-4" /> View Details
      </div>
    </div>
  </div>
{/snippet}

{#snippet hiddenCard(count: number, index: number)}
  <div
    class="neoretro-border neoretro-clr neoretro-shadow group rounded min-h-36 p-4 relative flex w-full cursor-pointer break-inside-avoid items-center justify-center overflow-hidden text-center"
    data-color={color}
    data-index={index}
    role="button"
    tabindex="0"
    aria-label="Open {count} hidden images"
    onclick={() => openAtIndex(index)}
    onkeydown={handleCardKeydown}
  >
    <div class="space-y-1 uppercase select-none">
      <div class="text-3xl font-black italic">+{count}</div>
      <div class="font-mono text-xs font-bold italic">More</div>
    </div>
    <div
      class="inset-0 bg-black/10 pointer-events-none absolute opacity-0 transition-opacity duration-200 group-hover:opacity-100"
    ></div>
  </div>
{/snippet}

<div bind:this={ref} data-slot="image" data-color={color} class={cn(className)} {...restProps}>
  {#if isSingle}
    {@render card(allImages[0], 0)}
  {:else if hasFeaturedLayout}
    <div class={featuredClass}>
      <div>
        {@render card(allImages[0], 0)}
      </div>
      <div class={previewClass} style={previewStyle}>
        {#each previewImages as img, i (i)}
          {@render card(img, i + 1)}
        {/each}
        {#if hiddenPreviewCount > 0}
          {@render hiddenCard(hiddenPreviewCount, hiddenPreviewIndex)}
        {/if}
      </div>
    </div>
  {:else}
    <div class={galleryClass} style={galleryStyle}>
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
      class="gap-0 p-0! md:h-[95dvh] md:w-[95vw] md:max-w-[95vw]! md:rounded flex! h-dvh w-screen max-w-screen! flex-col! overflow-hidden rounded-none"
    >
      <div class="min-h-0 bg-clr flex flex-1 flex-col" data-color={color}>
        <section class="min-h-0 bg-black relative flex flex-1 flex-col">
          <div class="top-3 right-3 left-3 gap-2 absolute z-10 flex items-center justify-between">
            {#if allImages.length > 1 || currentScale > 1.01}
              <span
                class="neoretro-border neoretro-clr neoretro-shadow rounded px-2.5 py-1 text-xs font-mono font-bold select-none"
                data-color={color}
              >
                {#if allImages.length > 1}
                  {currentIndex + 1}/{allImages.length}
                {/if}
                {#if currentScale > 1.01}
                  &nbsp;({currentScale.toFixed(2)}x)
                {/if}
              </span>
            {:else}
              <span></span>
            {/if}

            <div class="gap-1.5 flex items-center">
              {#if currentScale > 1.01}
                <Button
                  color={resetColor}
                  size="icon-sm"
                  aria-label="Reset zoom"
                  title="Reset zoom"
                  onclick={() => panzoomApi?.reset()}
                >
                  <RotateCcwIcon />
                </Button>
              {/if}
              <DropdownMenu.Root bind:open={downloadOpen}>
                <DropdownMenu.Trigger
                  class={cn(buttonVariants({ size: 'icon-sm', noShadow: false }))}
                  data-slot="button"
                  data-color={downloadColor}
                  data-pressable
                  aria-label="Download image"
                  title="Download image"
                >
                  <DownloadIcon />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                  side="bottom"
                  align="end"
                  color={downloadColor}
                  onInteractOutside={() => (downloadOpen = false)}
                >
                  <DropdownMenu.Item
                    onclick={() => {
                      downloadUrl(currentImage.urls.original.url, currentImage.id);
                      downloadOpen = false;
                    }}
                  >
                    Original ({formatSize(currentImage.urls.original.size)})
                  </DropdownMenu.Item>
                  {#if currentImage.urls.webp}
                    {@const w = currentImage.urls.webp}
                    <DropdownMenu.Item
                      onclick={() => {
                        downloadUrl(w.url, currentImage.id);
                        downloadOpen = false;
                      }}
                    >
                      WebP ({formatSize(w.size)})
                    </DropdownMenu.Item>
                  {/if}
                  {#if currentImage.urls.avif}
                    {@const a = currentImage.urls.avif}
                    <DropdownMenu.Item
                      onclick={() => {
                        downloadUrl(a.url, currentImage.id);
                        downloadOpen = false;
                      }}
                    >
                      AVIF ({formatSize(a.size)})
                    </DropdownMenu.Item>
                  {/if}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
              <Button color={cancelColor} size="icon-sm" aria-label="Close image" title="Close image" onclick={close}>
                <XIcon />
              </Button>
            </div>
          </div>

          <div class="min-h-0 relative flex-1 overflow-hidden">
            {#key currentIndex}
              <div
                class="h-full w-full touch-none"
                use:bindPanzoom
                use:swipe={{
                  onSwipeLeft: next,
                  onSwipeRight: prev,
                  isAtDefaultZoom: () => currentScale <= 1.01,
                }}
                in:fly={{ x: 160 * slideDir, duration: 180 }}
                out:fly={{ x: -160 * slideDir, duration: 180 }}
              >
                <img
                  src={imgSrcFor(currentImage)}
                  alt={currentAlt}
                  class="pointer-events-none block h-full w-full object-contain select-none"
                  draggable="false"
                />
              </div>
            {/key}

            {#if allImages.length > 1}
              <Button
                color={prevNextColor}
                class="left-3 md:inline-flex absolute top-1/2 hidden"
                size="icon"
                aria-label="Previous image"
                title="Previous image"
                onclick={prev}
                disabled={currentIndex <= 0}
              >
                <ChevronLeftIcon class="size-5" />
              </Button>
              <Button
                color={prevNextColor}
                class="right-3 md:inline-flex absolute top-1/2 hidden"
                size="icon"
                aria-label="Next image"
                title="Next image"
                onclick={next}
                disabled={currentIndex >= allImages.length - 1}
              >
                <ChevronRightIcon class="size-5" />
              </Button>
            {/if}
          </div>
        </section>

        <aside class="min-h-0 border-black md:max-h-[30dvh] flex max-h-[38dvh] flex-col border-t-2">
          <Dialog.Header class="gap-3 p-4">
            <div class="min-w-0">
              <Dialog.Title class="text-xl font-black tracking-tight md:text-2xl uppercase italic select-none">
                {currentImage.name}
              </Dialog.Title>
              <Dialog.Description class="mt-1 font-mono text-xs opacity-70">
                {currentImage.width} x {currentImage.height} - {formatMegapixels(
                  currentImage.width,
                  currentImage.height,
                )}
              </Dialog.Description>
            </div>
          </Dialog.Header>

          <div class="min-h-0 space-y-4 px-4 pb-4 flex-1 overflow-hidden">
            {#if descHtml}
              <div
                class="max-h-24 text-sm leading-snug md:max-h-32 overflow-hidden opacity-85 [&_a]:underline [&_a]:hover:opacity-70"
              >
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                {@html descHtml}
              </div>
            {/if}

            <div class="gap-1.5 flex flex-wrap">
              <span
                class="neoretro-border neoretro-clr gap-1 rounded px-2.5 py-1 text-xs font-mono inline-flex items-center"
                data-color={color}
              >
                <span class="font-bold">Size:</span>
                {formatSize(currentImage.urls.original.size)}
              </span>
              <span
                class="neoretro-border neoretro-clr gap-1 rounded px-2.5 py-1 text-xs font-mono inline-flex items-center"
                data-color={color}
              >
                <span class="font-bold">Ratio:</span>
                {formatRatio(currentImage.aspectRatio)}
              </span>
              {#if currentImage.kv}
                {#each Object.entries(currentImage.kv) as [key, value] (key)}
                  <span
                    class="neoretro-border neoretro-clr gap-1 rounded px-2.5 py-1 text-xs font-mono inline-flex items-center"
                    data-color={color}
                  >
                    <span class="font-bold">{key}:</span>
                    {value}
                  </span>
                {/each}
              {/if}
            </div>
          </div>
        </aside>
      </div>
    </Dialog.Content>
  </Dialog.Root>
</div>
