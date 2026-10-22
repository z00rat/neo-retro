<script lang="ts">
  import { cn, type WithElementRef } from '#lib/utils.ts';
  import type { HTMLAttributes } from 'svelte/elements';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLParagraphElement>> = $props();
</script>

<p
  bind:this={ref}
  data-slot="item-description"
  class={cn('text-sm leading-normal font-normal [&>a]:neoretro-link line-clamp-2', className)}
  {...restProps}
>
  {@render children?.()}
</p>
