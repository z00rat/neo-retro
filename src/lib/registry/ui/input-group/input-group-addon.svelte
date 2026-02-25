<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

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
    "*:is(kbd):rounded-[calc(var(--radius)-5px)] *:is(svg):not([class*='size-']):size-4 flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none group-data-[disabled=true]/input-group:opacity-50",
    align === 'inline-start' && 'order-first ps-3 has-[>button]:ms-[-0.45rem] has-[>kbd]:ms-[-0.35rem]',
    align === 'inline-end' && 'order-last pe-3 has-[>button]:me-[-0.45rem] has-[>kbd]:me-[-0.35rem]',
    align === 'block-start' &&
      'order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5 [.border-b]:pb-3',
    align === 'block-end' &&
      'order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5 [.border-t]:pt-3',
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
