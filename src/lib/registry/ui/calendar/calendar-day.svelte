<script lang="ts">
  import { Calendar as CalendarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), class: className, ...restProps }: CalendarPrimitive.DayProps = $props();

  const getColors = getContext<() => { selectedColor: string; color: string }>('calendarColors');
</script>

<CalendarPrimitive.Day
  bind:ref
  data-hover-color={getColors().color}
  data-active-color={getColors().selectedColor}
  class={cn(
    // Base
    'rounded p-0 flex size-(--cell-size) w-full cursor-pointer items-center justify-center border-none bg-transparent text-current select-none disabled:pointer-events-none disabled:opacity-50',
    // Selected
    'data-selected:bg-clr-active data-selected:text-on-clr-active',
    // Today
    '[&[data-today]:not([data-selected])]:bg-clr-active [&[data-today]:not([data-selected])]:text-on-clr-active',
    // hover
    'data-selected:hover:bg-on-clr-active data-selected:hover:text-clr-active',
    '[&[data-today]:not([data-selected])]:hover:bg-on-clr-active [&[data-today]:not([data-selected])]:hover:text-clr-active',
    '[&:not([data-selected]):not([data-today])]:hover:bg-on-clr-hover [&:not([data-selected]):not([data-today])]:hover:text-clr-hover',
    // focus
    'neoretro-focus',
    // Outside months
    '[&[data-outside-month]:not([data-selected])]:opacity-60',
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
