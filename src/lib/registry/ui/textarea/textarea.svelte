<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';

  import { cn, type Color, type WithElementRef, type WithoutChildren } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    noShadow = false,
    color,
    'data-slot': dataSlot = 'textarea',
    ...restProps
  }: WithoutChildren<WithElementRef<HTMLTextareaAttributes>> & {
    noShadow?: boolean;
    color?: Color;
  } = $props();
</script>

<textarea
  bind:this={ref}
  data-slot={dataSlot}
  data-color={color}
  class={cn(
    'peer rounded neoretro-border p-2 text-sm focus-visible:neoretro-focus disabled:neoretro-disable neoretro-invalid min-h-20 flex w-full placeholder:text-current/50',
    color ? 'neoretro-clr' : 'bg-background text-foreground selection:bg-foreground selection:text-background',
    !noShadow && 'neoretro-shadow',
    className,
  )}
  bind:value
  {...restProps}></textarea>
