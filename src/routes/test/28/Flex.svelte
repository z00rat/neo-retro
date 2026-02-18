<script lang="ts">
  import { type Snippet } from 'svelte';

  import { cn } from '$lib/utils';

  let {
    children,
    units = 0, // Multiples of 5rem
    grow = false, // Flex-grow
    dissolve = false, // If true, applies display: contents (useful for layout shifts)

    // Direction controls (default is col if not specified)
    // layout="row" sets flex-row for all, or use specific breakpoints
    layout = 'col',
    tablet = undefined,
    desktop = undefined,

    class: className,
  }: {
    children: Snippet;
    units?: number;
    grow?: boolean;
    dissolve?: boolean;
    layout?: 'row' | 'col';
    tablet?: 'row' | 'col';
    desktop?: 'row' | 'col';
    class?: string;
  } = $props();

  // Calculate Width Style
  let style = $derived(units > 0 ? `width: ${units * 5}rem; flex: none;` : '');

  // Construct Tailwind classes for direction
  // Default (Mobile/Base)
  let dirClasses = layout === 'row' ? 'flex-row' : 'flex-col';

  // Tablet override
  if (tablet === 'row') dirClasses += ' sm:flex-row';
  if (tablet === 'col') dirClasses += ' sm:flex-col';

  // Desktop override
  if (desktop === 'row') dirClasses += ' lg:flex-row';
  if (desktop === 'col') dirClasses += ' lg:flex-col';

  // Dissolve logic: 'contents' removes the div from the box tree, strictly for visual grouping hacks
  let displayClass = dissolve ? 'contents' : 'flex';
</script>

<div
  class={cn(
    displayClass,
    !dissolve && dirClasses, // Only apply flex dir if not dissolved
    grow && 'min-h-0 min-w-0 flex-1', // min-w/h-0 prevents flex overflow bugs
    className,
  )}
  {style}
>
  {@render children()}
</div>
