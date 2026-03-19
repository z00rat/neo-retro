<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    children,
    align = 'inline-start',
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    align?: 'inline-start' | 'inline-end' | 'block-start' | 'block-end';
  } = $props();
</script>

<div
  bind:this={ref}
  role="group"
  data-slot="input-group-addon"
  data-align={align}
  class={cn(
    "*:is(kbd):rounded-[calc(var(--radius)-5px)] *:is(svg):not([class*='size-']):size-4 gap-2 py-1.5 text-sm font-medium flex h-auto cursor-text items-center justify-center select-none group-data-[disabled=true]/input-group:opacity-50",
    align === 'inline-start' && 'ps-3 order-first has-[>button]:ms-[-0.45rem] has-[>kbd]:ms-[-0.35rem]',
    align === 'inline-end' && 'pe-3 order-last has-[>button]:me-[-0.45rem] has-[>kbd]:me-[-0.35rem]',
    align === 'block-start' &&
      'px-3 pt-3 group-has-[>input]/input-group:pt-2.5 [.border-b]:pb-3 order-first w-full justify-start',
    align === 'block-end' &&
      'px-3 pb-3 group-has-[>input]/input-group:pb-2.5 [.border-t]:pt-3 order-last w-full justify-start',
    className,
  )}
  onclick={(e) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    e.currentTarget.parentElement?.querySelector('input')?.focus();
  }}
  {...restProps}
>
  {@render children?.()}
</div>
