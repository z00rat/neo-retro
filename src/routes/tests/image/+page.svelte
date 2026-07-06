<script lang="ts">
  import emre from '$lib/assets/meta/emre-153_VPk1NZQ-unsplash.js';
  import jack from '$lib/assets/meta/jack-dong-yJozLVBxNA0-unsplash.js';
  import paul from '$lib/assets/meta/paul-hanaoka-o6RbK3y7mK4-unsplash.js';
  import * as Card from '$lib/registry/ui/card';
  import * as Field from '$lib/registry/ui/field';
  import type { ImageMeta } from '$lib/registry/ui/image';
  import EnhancedImage from '$lib/registry/ui/image/image.svelte';
  import { Input } from '$lib/registry/ui/input';
  import { Switch } from '$lib/registry/ui/switch';
  import { ToggleGroup, ToggleGroupItem } from '$lib/registry/ui/toggle-group';

  type ImageLayout = 'masonry' | 'grid';
  type FeaturedPosition = 'side' | 'bottom';

  let layout = $state<ImageLayout>('masonry');
  let featured = $state(false);
  let featuredPosition = $state<FeaturedPosition>('side');
  let columns = $state(3);
  let previewCount = $state(6);

  $effect(() => {
    if (!layout) layout = 'masonry';
  });

  $effect(() => {
    if (!featuredPosition) featuredPosition = 'side';
  });

  const galleryImages: ImageMeta[] = [emre, jack, paul];

  const repeatedImages = [
    galleryImages[0],
    galleryImages[1],
    galleryImages[2],
    galleryImages[2],
    galleryImages[0],
    galleryImages[1],
    galleryImages[0],
    galleryImages[1],
    galleryImages[2],
  ];
</script>

<div class="max-w-6xl px-4 py-10 md:py-14 container mx-auto">
  <header class="mb-8 gap-4 md:flex-row md:items-end md:justify-between flex flex-col">
    <div class="max-w-2xl space-y-2">
      <h1 class="text-3xl font-black tracking-tight uppercase italic">Image Gallery</h1>
      <p class="text-sm leading-6">
        Gallery layout, progressive image loading, zoomable popup, metadata, downloads, and mobile navigation.
      </p>
    </div>
  </header>

  <Card.Root class="mb-8" color="white">
    <Card.Content class="gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-4 grid">
      <Field.Field class="space-y-1.5">
        <Field.Label class="text-xs font-bold tracking-wider uppercase">Layout Style</Field.Label>
        <ToggleGroup bind:value={layout} color="magenta" type="single" class="justify-start">
          <ToggleGroupItem value="masonry">Masonry</ToggleGroupItem>
          <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
        </ToggleGroup>
      </Field.Field>

      <Field.Field class="space-y-1.5">
        <Field.Label for="image-columns" class="text-xs font-bold tracking-wider uppercase">Columns</Field.Label>
        <Input id="image-columns" bind:value={columns} color="yellow" type="number" min="1" max="8" />
      </Field.Field>

      <Field.Field class="space-y-1.5">
        <Field.Label for="image-preview-count" class="text-xs font-bold tracking-wider uppercase">
          Preview Count
        </Field.Label>
        <Input id="image-preview-count" bind:value={previewCount} color="cyan" type="number" min="0" max="12" />
      </Field.Field>

      <Field.Field class="space-y-1.5">
        <Field.Label for="image-featured" class="text-xs font-bold tracking-wider cursor-pointer uppercase">
          Featured Hero
        </Field.Label>
        <div>
          <Switch id="image-featured" bind:checked={featured} color="green" />
        </div>
      </Field.Field>

      <Field.Field class="space-y-1.5">
        <Field.Label class="text-xs font-bold tracking-wider uppercase">Featured Position</Field.Label>
        <ToggleGroup
          bind:value={featuredPosition}
          disabled={!featured}
          color="cyan"
          type="single"
          class="justify-start"
        >
          <ToggleGroupItem value="side">Side</ToggleGroupItem>
          <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
        </ToggleGroup>
      </Field.Field>
    </Card.Content>
  </Card.Root>

  <section class="space-y-4">
    <div class="gap-3 flex items-center justify-between">
      <h2 class="text-lg font-black uppercase italic">Gallery</h2>
      <span class="font-mono text-xs">{repeatedImages.length} images</span>
    </div>

    <EnhancedImage
      images={repeatedImages}
      color="green"
      {layout}
      {featured}
      {featuredPosition}
      {columns}
      {previewCount}
      cancelColor="red"
      resetColor="yellow"
      downloadColor="white"
      prevNextColor="cyan"
    />
  </section>
</div>
