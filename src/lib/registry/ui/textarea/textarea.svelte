<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';

  import { cn, type WithElementRef, type WithoutChildren } from '$lib/utils.js';

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
    'flex min-h-[80px] w-full rounded neoretro-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-current/50 focus-visible:neoretro-focus disabled:neoretro-disable aria-invalid:border-red aria-invalid:ring-red/20',
    className,
    !noShadow && 'neoretro-shadow',
  )}
  bind:value
  {...restProps}
></textarea>
