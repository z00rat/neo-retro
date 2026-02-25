<script lang="ts">
  import { RangeCalendar as RangeCalendarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, ...restProps }: RangeCalendarPrimitive.DayProps = $props();

  const getColors = getContext<() => { selectedColor: any; color: any }>('calendarColors');
  const colors = $derived(getColors());
</script>

<RangeCalendarPrimitive.Day
  bind:ref
  data-hover-color={colors.color}
  data-active-color={colors.selectedColor}
  class={cn(
    // Base
    'cursor-pointer ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50',
    'rounded border-none bg-transparent text-current',
    'flex size-(--cell-size) w-full items-center justify-center p-0 text-sm font-normal select-none',
    // Selected
    'data-selected:bg-clr-active data-selected:text-on-clr-active',
    // Today
    '[&[data-today]:not([data-selected])]:bg-clr-active [&[data-today]:not([data-selected])]:text-on-clr-active',
    // Range shape
    'data-range-middle:rounded-none',
    'data-range-start:rounded-l data-range-start:rounded-r-none',
    'data-range-end:rounded-l-none data-range-end:rounded-r',
    '[&[data-range-start][data-range-end]]:rounded',
    // hover
    'data-selected:hover:bg-on-clr-active data-selected:hover:text-clr-active',
    '[&[data-today]:not([data-selected])]:hover:bg-on-clr-active [&[data-today]:not([data-selected])]:hover:text-clr-active',
    '[&:not([data-selected]):not([data-today])]:hover:bg-on-clr-hover [&:not([data-selected]):not([data-today])]:hover:text-clr-hover',
    // focus
    'neoretro-focus',
    // Outside months
    '[&[data-outside-month]:not([data-selected])]:opacity-40',
    // Disabled
    'data-disabled:neoretro-disable [&[data-today][data-disabled]]:neoretro-disable',
    // Unavailable
    'data-unavailable:line-through',
    // inner spans
    '[&>span]:text-xs',
    className,
  )}
  {...restProps}
/>
