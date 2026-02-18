<script>
  // @ts-nocheck

  import { cn } from '$lib/utils';

  let { layouts, content, class: className } = $props();

  // Layout + cols are CSS-driven.
  let variant = $state('base');
  let windowWidth = $state(0);

  // keep it dirt-simple: derive variant from width
  // Blueprint.svelte logic
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

  // Generate each layout string once (only re-runs if `layouts` changes)
  const parseLayout = (layoutArray) => {
    if (!layoutArray) return '';
    return layoutArray
      .map((row) => {
        const columns = row.split(' ').map((segment) => {
          const [name, span] = segment.split(':');
          return Array(parseInt(span)).fill(name).join(' ');
        });
        return `"${columns.join(' ')}"`;
      })
      .join(' ');
  };

  const areas = $derived.by(() => ({
    base: parseLayout(layouts.base),
    xs: parseLayout(layouts.xs),
    sm: parseLayout(layouts.sm),
    md: parseLayout(layouts.md),
    lg: parseLayout(layouts.lg),
    xl: parseLayout(layouts.xl),
    xxl: parseLayout(layouts.XXL),
  }));
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div
  class={cn(
    'flex min-h-screen w-full overflow-x-hidden bg-zinc-100',
    'justify-center max-[20rem]:justify-start',
    className,
  )}
>
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
      {@render content(variant)}
    </div>
  </div>
</div>

<style>
  @media (max-width: 20rem) {
    .bp-scale {
      /* Locked to 20rem because 4 cols * 5rem = 20rem */
      width: 20rem;
      transform: scale(calc(100vw / 20rem));
      height: max-content;
    }
  }
</style>
