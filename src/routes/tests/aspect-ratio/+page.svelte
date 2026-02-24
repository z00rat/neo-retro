<script lang="ts">
  import * as AspectRatio from '$lib/registry/ui/aspect-ratio';
</script>

<h1>Aspect Ratio</h1>

<!-- 16:9 -->
<section>
  <h3>16:9</h3>
  <div class="max-w-md neoretro-shadow overflow-hidden rounded neoretro-border">
    <AspectRatio.Root ratio={16 / 9}>
      <img
        src="https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&auto=format&fit=crop"
        alt="16:9 aspect-ratio"
        class="size-full object-cover"
      />
    </AspectRatio.Root>
  </div>
</section>

<!-- 1:1 -->
<section>
  <h3>1:1 (Square)</h3>
  <div class="max-w-xs neoretro-shadow overflow-hidden rounded neoretro-border">
    <AspectRatio.Root ratio={1}>
      <img
        src="https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&auto=format&fit=crop"
        alt="1:1 aspect-ratio"
        class="size-full object-cover"
      />
    </AspectRatio.Root>
  </div>
</section>

<!-- 4:3 -->
<section>
  <h3>4:3</h3>
  <div class="max-w-md neoretro-shadow overflow-hidden rounded neoretro-border">
    <AspectRatio.Root ratio={4 / 3}>
      <img
        src="https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&auto=format&fit=crop"
        alt="4:3 aspect-ratio"
        class="size-full object-cover"
      />
    </AspectRatio.Root>
  </div>
</section>
