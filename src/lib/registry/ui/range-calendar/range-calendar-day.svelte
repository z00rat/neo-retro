<script lang="ts">
  import { RangeCalendar as RangeCalendarPrimitive } from 'bits-ui';

  import { buttonVariants } from '$lib/registry/ui/button/index.ts';
  import { cn } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, ...restProps }: RangeCalendarPrimitive.DayProps = $props();
</script>

<RangeCalendarPrimitive.Day
  bind:ref
  class={cn(
    buttonVariants({ noShadow: true }),
    'border-none neoretro-none',
    'flex size-(--cell-size) flex-col items-center justify-center gap-1 p-0 leading-none font-normal whitespace-nowrap select-none',
    // Today
    '[&[data-today]:not([data-selected])]:neoretro-secondary [&[data-today]:not([data-selected])]:hover:neoretro-hover [&[data-today][data-disabled]]:neoretro-disable',
    // Selected
    'data-selected:neoretro-primary data-selected:hover:neoretro-hover',
    // Range
    'data-range-end:rounded-l-none data-range-end:rounded-r data-range-middle:rounded-none data-range-start:rounded-l data-range-start:rounded-r-none [&[data-range-start][data-range-end]]:rounded',
    // Outside months
    '[&[data-outside-month]:not([data-selected])]:text-foreground/50 [&[data-outside-month]:not([data-selected])]:hover:neoretro-hover',
    // Disabled
    'data-disabled:neoretro-disable',
    // Unavailable
    'data-unavailable:line-through',
    // hover
    'hover:neoretro-hover',
    // focus
    'neoretro-focus',
    // inner spans
    '[&>span]:text-xs',
    className,
  )}
  {...restProps}
/>
