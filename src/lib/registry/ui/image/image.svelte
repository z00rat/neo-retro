<script lang="ts">
  import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import DownloadIcon from '@lucide/svelte/icons/download';
  import EyeIcon from '@lucide/svelte/icons/eye';
  import RotateCcwIcon from '@lucide/svelte/icons/rotate-ccw';
  import XIcon from '@lucide/svelte/icons/x';
  import { Badge } from '#lib/registry/ui/badge/index.js';
  import { Button, buttonVariants, type ButtonProps } from '#lib/registry/ui/button/index.js';
  import * as Dialog from '#lib/registry/ui/dialog/index.js';
  import * as DropdownMenu from '#lib/registry/ui/dropdown-menu/index.js';
  import { cn, type Color, type WithElementRef } from '#lib/utils.ts';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { MediaQuery, SvelteSet } from 'svelte/reactivity';
  import { fly } from 'svelte/transition';
  import { thumbHashToDataURL } from 'thumbhash';

  import { panzoom, type PanZoomAPI } from './panzoom';
  import type { ImageMeta } from './types';

  type ImageLayout = 'masonry' | 'grid';
  type FeaturedPosition = 'side' | 'bottom';
  type CollectionScope = 'gallery' | 'preview-side' | 'preview-bottom';
  type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  type ResponsiveNumber = number | Partial<Record<Breakpoint, number>>;

  const breakpoints = {
    sm: new MediaQuery('(min-width: 40rem)'),
    md: new MediaQuery('(min-width: 48rem)'),
    lg: new MediaQuery('(min-width: 64rem)'),
    xl: new MediaQuery('(min-width: 80rem)'),
    '2xl': new MediaQuery('(min-width: 96rem)'),
    '3xl': new MediaQuery('(min-width: 120rem)'),
  };
  const breakpointOrder = ['sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;

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
    featuredPosition,
    previewCount,
    columns,
    clickable = true,
    noBorder = false,
    noShadow = false,
    noRounded = false,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    children?: Snippet;
    meta?: ImageMeta;
    images?: ImageMeta[];
    alt?: string;
    class?: string;
    color: 'black' | 'bright-black' | Color;
    cancelColor: ButtonProps['color'];
    resetColor: ButtonProps['color'];
    downloadColor: ButtonProps['color'];
    prevNextColor: ButtonProps['color'];
    layout?: ImageLayout;
    featuredPosition?: FeaturedPosition;
    previewCount?: ResponsiveNumber;
    columns?: ResponsiveNumber;
    clickable?: boolean;
    noBorder?: boolean;
    noShadow?: boolean;
    noRounded?: boolean;
  } = $props();

  let allImages = $derived(images ?? (meta ? [meta] : []));
  let gallery = $derived.by(() => {
    const isSingle = !images && !!meta;
    const isFeatured = featuredPosition !== undefined && allImages.length > 1;
    const previewLimit = Math.max(0, Number(resolveResponsiveNumber(previewCount)) || 0);
    const startIndex = isFeatured ? 1 : 0;
    const visibleImages =
      previewLimit === 0 ? allImages.slice(startIndex) : allImages.slice(startIndex, startIndex + previewLimit);
    const hiddenCount = Math.max(0, allImages.length - startIndex - visibleImages.length);
    const scope: CollectionScope = isFeatured ? `preview-${featuredPosition ?? 'side'}` : 'gallery';
    const columnCount = resolveResponsiveNumber(columns);
    const usesMasonryMoreLayout = hiddenCount > 0 && layout === 'masonry';

    return {
      isSingle,
      isFeatured,
      visibleImages,
      hiddenCount,
      hiddenIndex: visibleImages.length + startIndex,
      usesMasonryMoreLayout,
      collectionClass: collectionClass(layout, scope),
      collectionStyle: collectionStyle(layout, columnCount),
      masonryMoreClass: masonryMoreContainerClass(scope),
      masonryMoreStyle: masonryMoreContainerStyle(columnCount),
      masonryColumns: distributeMasonryImages(visibleImages, resolveMasonryColumnCount(scope, columnCount)),
      featuredClass:
        featuredPosition === 'bottom'
          ? 'gap-2 grid items-start'
          : 'grid items-start gap-2 md:grid-cols-[minmax(0,1fr)_minmax(10rem,18rem)]',
    };
  });
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

  type DescriptionPart = {
    type: 'text' | 'bold' | 'italic' | 'strikethrough' | 'url';
    value: string;
    href?: string;
  };

  function parseDescription(description: string): DescriptionPart[] {
    const parts: DescriptionPart[] = [];
    const pattern =
      /\*\*([^*]+)\*\*|\*([^*]+)\*|~~([^~]+)~~|\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|(https?:\/\/[^\s<]+)/g;
    let lastIndex = 0;

    for (const match of description.matchAll(pattern)) {
      const index = match.index ?? 0;
      if (index > lastIndex) parts.push({ type: 'text', value: description.slice(lastIndex, index) });

      if (match[1]) parts.push({ type: 'bold', value: match[1] });
      else if (match[2]) parts.push({ type: 'italic', value: match[2] });
      else if (match[3]) parts.push({ type: 'strikethrough', value: match[3] });
      else if (match[4] && match[5]) parts.push({ type: 'url', value: match[4], href: match[5] });
      else if (match[6]) {
        const url = match[6].replace(/[.,!?;:)\]]+$/, '');
        parts.push({ type: 'url', value: url });
        if (url.length < match[6].length) parts.push({ type: 'text', value: match[6].slice(url.length) });
      }

      lastIndex = index + match[0].length;
    }

    if (lastIndex < description.length) parts.push({ type: 'text', value: description.slice(lastIndex) });
    return parts;
  }

  let descriptionParts = $derived(currentImage?.description ? parseDescription(currentImage.description) : []);
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
    if (!allImages[index]) return;

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

  function formatRatio(aspectRatio: number): string {
    return aspectRatio >= 1 ? `${aspectRatio.toFixed(2)}:1` : `1:${(1 / aspectRatio).toFixed(2)}`;
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

  function resolveResponsiveNumber(value: ResponsiveNumber | undefined): number | undefined {
    if (typeof value === 'number' || !value) return value;

    let resolved = value.base;
    for (const breakpoint of breakpointOrder) {
      if (breakpoints[breakpoint].current && value[breakpoint] !== undefined) {
        resolved = value[breakpoint];
      }
    }
    return resolved;
  }

  function collectionClass(kind: ImageLayout, scope: CollectionScope) {
    if (kind === 'grid') {
      if (scope === 'preview-side') return 'gap-2 grid grid-cols-2 items-start md:grid-cols-1';
      if (scope === 'preview-bottom') return 'gap-2 grid grid-cols-2 items-start md:grid-cols-4';
      return 'gap-2 grid grid-cols-2 items-start sm:grid-cols-3 lg:grid-cols-4';
    }

    if (scope === 'preview-side') return 'columns-2 gap-2 md:columns-1 [&>div]:mb-2 [&>button]:mb-2';
    if (scope === 'preview-bottom') return 'columns-2 gap-2 md:columns-4 [&>div]:mb-2 [&>button]:mb-2';
    return 'columns-1 gap-2 sm:columns-2 lg:columns-3 [&>div]:mb-2 [&>button]:mb-2';
  }

  function collectionStyle(kind: ImageLayout, value: number | undefined) {
    const count = Math.max(1, Number(value) || 0);
    if (!value || count < 1) return undefined;

    return kind === 'grid' ? `grid-template-columns: repeat(${count}, minmax(0, 1fr));` : `column-count: ${count};`;
  }

  function masonryMoreContainerClass(scope: CollectionScope) {
    if (scope === 'preview-side') return 'gap-2 grid grid-cols-2 items-start md:grid-cols-1';
    if (scope === 'preview-bottom') return 'gap-2 grid grid-cols-2 items-start md:grid-cols-4';
    return 'gap-2 grid grid-cols-1 items-start sm:grid-cols-2 lg:grid-cols-3';
  }

  function masonryMoreContainerStyle(value: number | undefined) {
    const count = Math.max(1, Number(value) || 0);
    if (!value || count < 1) return undefined;

    return `grid-template-columns: repeat(${count}, minmax(0, 1fr));`;
  }

  function resolveMasonryColumnCount(scope: CollectionScope, value: number | undefined) {
    if (value && value > 0) return Math.floor(value);

    if (scope === 'preview-side') return breakpoints.md.current ? 1 : 2;
    if (scope === 'preview-bottom') return breakpoints.md.current ? 4 : 2;
    if (breakpoints.lg.current) return 3;
    if (breakpoints.sm.current) return 2;
    return 1;
  }

  function distributeMasonryImages(images: ImageMeta[], columnCount: number): ImageMeta[][] {
    const columns = Array.from({ length: columnCount }, () => [] as ImageMeta[]);
    const columnHeights = Array.from({ length: columnCount }, () => 0);

    for (const image of images) {
      const columnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      columns[columnIndex].push(image);
      columnHeights[columnIndex] += 1 / Math.max(image.aspectRatio, 0.01);
    }

    return columns;
  }
</script>

{#snippet card(img: ImageMeta, index: number)}
  {@const src = imgSrcFor(img)}
  {@const th = thumbUrl(img.thumbhash)}
  {@const isLoaded = loadedImages[img.id]}
  {#if clickable}
    <button
      type="button"
      class={cn(
        'group relative block w-full cursor-pointer overflow-hidden text-left leading-none',
        !noBorder && 'neoretro-border',
        !noShadow && 'neoretro-shadow',
        !noRounded && 'rounded',
        gallery.isSingle || (gallery.isFeatured && index === 0) ? '' : layout === 'masonry' ? 'break-inside-avoid' : '',
      )}
      data-color={color}
      data-index={index}
      aria-label={`Open ${img.name}`}
      onclick={() => openAtIndex(index)}
    >
      {#if th && !isLoaded}
        <div class="inset-0 absolute bg-cover bg-center" style="background-image: url({th})"></div>
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
          width={img.width}
          height={img.height}
          class="relative block w-full"
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
          onload={() => (loadedImages[img.id] = true)}
        />
      </picture>
      <div
        class="neoretro-overlay inset-0 pointer-events-none absolute! z-0! hidden items-center justify-center group-hover:flex group-focus-visible:flex"
      >
        <div
          class="neoretro-border neoretro-clr neoretro-shadow gap-1.5 rounded px-3 py-2 text-xs font-bold flex items-center uppercase select-none"
          data-color={color}
        >
          <EyeIcon class="size-4" /> View Details
        </div>
      </div>
    </button>
  {:else}
    <div
      class={cn(
        'group relative block w-full cursor-default overflow-hidden leading-none',
        !noBorder && 'neoretro-border',
        !noShadow && 'neoretro-shadow',
        !noRounded && 'rounded',
        gallery.isSingle || (gallery.isFeatured && index === 0) ? '' : layout === 'masonry' ? 'break-inside-avoid' : '',
      )}
      data-color={color}
      data-index={index}
    >
      {#if th && !isLoaded}
        <div class="inset-0 absolute bg-cover bg-center" style="background-image: url({th})"></div>
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
          width={img.width}
          height={img.height}
          class="relative block w-full"
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
          onload={() => (loadedImages[img.id] = true)}
        />
      </picture>
    </div>
  {/if}
{/snippet}

{#snippet hiddenCard(count: number, index: number)}
  <button
    type="button"
    class={cn(
      'neoretro-clr group min-h-36 p-4 relative flex w-full cursor-pointer break-inside-avoid items-center justify-center overflow-hidden text-center',
      !noBorder && 'neoretro-border',
      !noShadow && 'neoretro-shadow',
      !noRounded && 'rounded',
    )}
    data-color={color}
    data-index={index}
    aria-label={`Open ${count} hidden images`}
    onclick={() => openAtIndex(index)}
  >
    <div class="space-y-1 uppercase select-none">
      <div class="text-3xl font-black italic">+{count}</div>
      <div class="font-mono text-xs font-bold italic">More</div>
    </div>
  </button>
{/snippet}

{#snippet masonryMore()}
  <div class={gallery.masonryMoreClass} style={gallery.masonryMoreStyle}>
    {#each gallery.masonryColumns as column, columnIndex (columnIndex)}
      <div class="space-y-2">
        {#each column as img, colImgIndex (colImgIndex)}
          {@render card(img, allImages.indexOf(img))}
        {/each}
        {#if columnIndex === gallery.masonryColumns.length - 1}
          {@render hiddenCard(gallery.hiddenCount, gallery.hiddenIndex)}
        {/if}
      </div>
    {/each}
  </div>
{/snippet}

<div bind:this={ref} data-slot="image" data-color={color} class={cn(className)} {...restProps}>
  {#if gallery.isSingle}
    {@render card(allImages[0], 0)}
  {:else if gallery.isFeatured}
    <div class={gallery.featuredClass}>
      <div>
        {@render card(allImages[0], 0)}
      </div>
      {#if gallery.usesMasonryMoreLayout}
        {@render masonryMore()}
      {:else}
        <div class={gallery.collectionClass} style={gallery.collectionStyle}>
          {#each gallery.visibleImages as img, i (i)}
            {@render card(img, i + 1)}
          {/each}
          {#if gallery.hiddenCount > 0}
            {@render hiddenCard(gallery.hiddenCount, gallery.hiddenIndex)}
          {/if}
        </div>
      {/if}
    </div>
  {:else}
    {#if gallery.usesMasonryMoreLayout}
      {@render masonryMore()}
    {:else}
      <div class={gallery.collectionClass} style={gallery.collectionStyle}>
        {#each gallery.visibleImages as img, i (i)}
          {@render card(img, i)}
        {/each}
        {#if gallery.hiddenCount > 0}
          {@render hiddenCard(gallery.hiddenCount, gallery.hiddenIndex)}
        {/if}
      </div>
    {/if}
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
                  {currentIndex + 1} of {allImages.length}
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
                  width={currentImage.width}
                  height={currentImage.height}
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
          <div
            class="min-h-0 gap-4 p-4 md:grid md:grid-cols-[minmax(0,1fr)_minmax(14rem,24rem)] md:items-start flex flex-col"
          >
            <Dialog.Header class="gap-1 p-0 sm:text-center md:text-left text-center">
              <Dialog.Title class="text-xl font-black tracking-tight md:text-2xl uppercase italic select-none">
                {currentImage.name}
              </Dialog.Title>
              {#if descriptionParts.length}
                <Dialog.Description
                  class="max-h-24 text-sm leading-snug md:max-h-32 overflow-hidden wrap-break-word [&_a]:underline"
                >
                  {#each descriptionParts as part, index (index)}
                    {#if part.type === 'bold'}
                      <strong>{part.value}</strong>
                    {:else if part.type === 'italic'}
                      <em>{part.value}</em>
                    {:else if part.type === 'strikethrough'}
                      <del>{part.value}</del>
                    {:else if part.type === 'url'}
                      <a href={part.href ?? part.value} target="_blank" rel="noopener noreferrer">{part.value}</a>
                    {:else}
                      {part.value}
                    {/if}
                  {/each}
                </Dialog.Description>
              {/if}
            </Dialog.Header>

            <div class="min-w-0 gap-1.5 md:justify-end flex flex-wrap justify-center">
              <Badge {color} class="font-mono">
                <span class="font-bold">Dimensions:</span>
                {currentImage.width} × {currentImage.height}
              </Badge>
              <Badge {color} class="font-mono">
                <span class="font-bold">Size:</span>
                {formatSize(currentImage.urls.original.size)}
              </Badge>
              <Badge {color} class="font-mono">
                <span class="font-bold">Ratio:</span>
                {formatRatio(currentImage.aspectRatio)}
              </Badge>
              {#if currentImage.kv}
                {#each Object.entries(currentImage.kv) as [key, value] (key)}
                  <Badge {color} class="font-mono">
                    <span class="font-bold">{key}:</span>
                    {value}
                  </Badge>
                {/each}
              {/if}
            </div>
          </div>
        </aside>
      </div>
    </Dialog.Content>
  </Dialog.Root>
</div>
