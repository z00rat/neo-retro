<script lang="ts">
  import { type Snippet } from 'svelte';

  import { cn } from '$lib/utils';

  let {
    children,
    units = 0,
    grow = false,
    fill = false,
    class: className,
  }: {
    children: Snippet;
    units?: number;
    grow?: boolean;
    fill?: boolean;
    class?: string;
  } = $props();

  // FIX: Removed 'width: 100%' from the else case.
  // Letting it be empty allows standard block/flex behavior to handle margins correctly.
  let style = $derived(units > 0 ? `width: ${units * 5}rem; flex: none;` : '');
</script>

<div
  class={cn(
    'relative mr-[6px] mb-[6px] transition-all',
    grow && 'min-w-0 flex-1', // min-w-0 fixes flex overflow issues
    className,
  )}
  {style}
>
  <div
    class={cn(
      'box-border w-full border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
      fill ? 'h-full' : 'h-fit',
    )}
  >
    {@render children()}
  </div>
</div>
