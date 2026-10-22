<script lang="ts">
  import { cn, type WithElementRef } from '#lib/utils.ts';
  import type { HTMLAttributes } from 'svelte/elements';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="field-title"
  class={cn(
    'gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:neoretro-disable flex w-fit items-center',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
