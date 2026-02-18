<script>
  // @ts-nocheck
  import { cn } from '$lib/utils';

  let { layouts, children, class: className } = $props();
  let windowWidth = $state(0);
  let variant = $state('base');

  // Sync variant for the JS logic/Muuri
  $effect(() => {
    const w = windowWidth;
    if (w >= 1536) variant = 'XXL';
    else if (w >= 1280) variant = 'xl';
    else if (w >= 1024) variant = 'lg';
    else if (w >= 768) variant = 'md';
    else if (w >= 640) variant = 'sm';
    else if (w >= 400) variant = 'xs';
    else variant = 'base';
  });

  const parse = (l) => {
    if (!l) return '""';
    return l
      .map((row) => {
        const rowStr = row
          .split(' ')
          .map((seg) => {
            const [name, span] = seg.split(':');
            return Array(parseInt(span)).fill(name).join(' ');
          })
          .join(' ');
        return `"${rowStr}"`;
      })
      .join(' ');
  };

  const areas = $derived({
    base: parse(layouts.base),
    xs: parse(layouts.xs),
    sm: parse(layouts.sm),
    md: parse(layouts.md),
    lg: parse(layouts.lg),
    xl: parse(layouts.xl),
    xxl: parse(layouts.XXL),
  });
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class={cn('flex min-h-screen w-full justify-center bg-zinc-100', className)}>
  <div class="bp-scale origin-top-left">
    <div
      class={cn(
        'grid w-max auto-rows-min gap-0',

        'grid-cols-[repeat(4,5rem)]',
        'min-[400px]:grid-cols-[repeat(5,5rem)]',
        'sm:grid-cols-[repeat(6,5rem)]',
        'md:grid-cols-[repeat(9,5rem)]',
        'lg:grid-cols-[repeat(12,5rem)]',
        'xl:grid-cols-[repeat(16,5rem)]',
        '2xl:grid-cols-[repeat(19,5rem)]',

        '[grid-template-areas:var(--areas-base)]',
        'min-[400px]:[grid-template-areas:var(--areas-xs)]',
        'sm:[grid-template-areas:var(--areas-sm)]',
        'md:[grid-template-areas:var(--areas-md)]',
        'lg:[grid-template-areas:var(--areas-lg)]',
        'xl:[grid-template-areas:var(--areas-xl)]',
        '2xl:[grid-template-areas:var(--areas-xxl)]',
      )}
      style="
        --areas-base: {areas.base};
        --areas-xs: {areas.xs};
        --areas-sm: {areas.sm};
        --areas-md: {areas.md};
        --areas-lg: {areas.lg};
        --areas-xl: {areas.xl};
        --areas-xxl: {areas.xxl};
      "
    >
      {@render children(variant)}
    </div>
  </div>
</div>
