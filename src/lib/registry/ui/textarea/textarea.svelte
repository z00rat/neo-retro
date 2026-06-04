<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';

  import { cn, type WithElementRef, type WithoutChildren } from '$lib/utils.ts';

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
    color?: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();
</script>

<textarea
  bind:this={ref}
  data-slot={dataSlot}
  data-color={color}
  class={cn(
    'rounded neoretro-border p-2 text-sm focus-visible:neoretro-focus disabled:neoretro-disable aria-invalid:border-red aria-invalid:ring-red flex min-h-[80px] w-full placeholder:text-current/80',
    color ? 'neoretro-clr' : 'bg-background text-foreground',
    !noShadow && 'neoretro-shadow',
    className,
  )}
  bind:value
  {...restProps}
></textarea>
