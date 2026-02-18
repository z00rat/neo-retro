<script>
  import { cn } from '$lib/utils';

  let { layouts, content, class: className } = $props();
  let windowWidth = $state(0);

  // 1. Reactive Variant Detection - Fixed closure access
  const variant = $derived.by(() => {
    const w = windowWidth;
    // Map width to viewport names based on standard Tailwind breakpoints
    if (w >= 1280) return 'xl';
    if (w >= 1024) return 'lg';
    if (w >= 768) return 'md';
    return 'sm';
  });

  // 2. CSS Area Parser - Fixed closure access
  const parseLayout = (l) => {
    const rows = l?.[variant] || [];
    return rows.map((row) => `"${row.map(([n, s]) => Array(s).fill(n).join(' ')).join(' ')}"`).join(' ');
  };

  const activeLayout = $derived.by(() => parseLayout(layouts));

  // 3. Scaling Logic (Down Only)
  // Logic: (Cols * 180px) + (Gaps * 20px) + (Margins * 40px)
  const getRequiredWidth = () => {
    const colCount = { sm: 2, md: 4, lg: 6, xl: 10 }[variant];
    return colCount * 180 + 40;
  };

  const scale = $derived.by(() => {
    const req = getRequiredWidth();
    return windowWidth < req ? (windowWidth / req).toFixed(3) : 1;
  });
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class={cn('flex min-h-screen w-full justify-center overflow-hidden bg-zinc-100', className)}>
  <div
    class="h-fit origin-top transition-transform duration-100 ease-out"
    style:transform="scale({scale})"
    style:width="min-content"
  >
    <div
      class={cn(
        'grid auto-rows-min p-5',
        'grid-cols-[repeat(2,180px)] md:grid-cols-[repeat(4,180px)] lg:grid-cols-[repeat(6,180px)] xl:grid-cols-[repeat(10,180px)]',
      )}
      style:grid-template-areas={activeLayout}
    >
      {@render content(variant)}
    </div>
  </div>
</div>
