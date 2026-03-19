<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';

  import { cn, type WithElementRef, type WithoutChildren } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    noShadow = false,
    'data-slot': dataSlot = 'textarea',
    ...restProps
  }: WithoutChildren<WithElementRef<HTMLTextareaAttributes>> & {
    noShadow?: boolean;
  } = $props();
</script>

<textarea
  bind:this={ref}
  data-slot={dataSlot}
  class={cn(
    'rounded neoretro-border bg-background p-2 text-sm text-foreground focus-visible:neoretro-focus disabled:neoretro-disable aria-invalid:border-red aria-invalid:ring-red flex min-h-[80px] w-full placeholder:text-current/50',
    !noShadow && 'neoretro-shadow',
    className,
  )}
  bind:value
  {...restProps}
></textarea>
