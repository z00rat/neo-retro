<script>
  // @ts-nocheck
  import { cn } from '$lib/utils';

  let { area, children, class: className, variant } = $props();

  let gridElement;
  let muuriInstance;

  // Initialize Muuri ONLY for this specific cluster
  $effect(() => {
    if (!gridElement) return;

    let m;
    import('muuri').then((module) => {
      const Muuri = module.default;

      m = new Muuri(gridElement, {
        dragEnabled: false,
        layout: {
          fillGaps: true, // This is the Bento magic
          horizontal: false,
          alignRight: false,
          alignBottom: false,
          rounding: false,
        },
        // Auto-resize the container (Cluster) height based on contents
        autoResizeContainer: true,
      });

      muuriInstance = m;
      m.layout();
    });

    return () => {
      if (m) m.destroy();
    };
  });

  // Re-layout when variant changes (cards resize)
  $effect(() => {
    const _v = variant; // Dependency on variant
    if (muuriInstance) {
      // Small delay to allow Cards to update their CSS width first
      setTimeout(() => {
        muuriInstance.refreshItems();
        muuriInstance.layout();
      }, 50);
    }
  });
</script>

<div class={cn('relative h-full w-full', className)} style:grid-area={area} bind:this={gridElement}>
  {@render children()}
</div>
