<script lang="ts">
  import emre from '$lib/assets/meta/emre-153_VPk1NZQ-unsplash.js';
  import jack from '$lib/assets/meta/jack-dong-yJozLVBxNA0-unsplash.js';
  import paul from '$lib/assets/meta/paul-hanaoka-o6RbK3y7mK4-unsplash.js';
  import EnhancedImage from '$lib/registry/ui/image/image.svelte';
  import { ToggleGroup, ToggleGroupItem } from '$lib/registry/ui/toggle-group';

  let layout = $state<'masonry' | 'grid' | 'list' | 'single'>('masonry');
</script>

<div class="px-4 py-16 max-w-6xl container mx-auto">
  <header class="mb-10 space-y-4">
    <h1 class="text-3xl font-black tracking-tight uppercase italic">Image Gallery</h1>
    <p class="text-sm">
      Images with auto-generated WebP/AVIF, thumbhash placeholders. Click any image to open the detail dialog with zoom,
      pan, format download, and prev/next navigation.
    </p>
    <ToggleGroup bind:value={layout} color="magenta" type="single">
      <ToggleGroupItem value="masonry">Masonry</ToggleGroupItem>
      <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      <ToggleGroupItem value="list">List</ToggleGroupItem>
      <ToggleGroupItem value="single">Single</ToggleGroupItem>
    </ToggleGroup>
  </header>

  <EnhancedImage
    images={[emre, jack, paul, paul, emre, jack, emre, jack, paul]}
    color="green"
    {layout}
    cancelColor="red"
    resetColor="yellow"
    downloadColor="white"
    edgeColor="blue"
    prevNextColor="cyan"
  />
</div>
