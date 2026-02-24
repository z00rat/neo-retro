<script lang="ts">
  import { Calendar as CalendarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { hoverOutlineMap, selectedColorMap, todayColorMap, type ThemeColor } from '$lib/colors.js';
  import { cn } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, ...restProps }: CalendarPrimitive.DayProps = $props();

  const getColors = getContext<() => { selectedColor: ThemeColor; todayColor: ThemeColor }>('calendarColors');
  const colors = $derived(getColors());

  const selectedClasses = $derived(selectedColorMap[colors.selectedColor]);
  const todayClasses = $derived(todayColorMap[colors.todayColor]);
  const hoverClasses = $derived(hoverOutlineMap[colors.selectedColor]);
</script>

<CalendarPrimitive.Day
  bind:ref
  class={cn(
    // Base
    'cursor-pointer ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50',
    'rounded border-none bg-transparent text-current',
    'flex size-(--cell-size) w-full items-center justify-center p-0 text-sm font-normal select-none',
    // Selected
    selectedClasses,
    // Today
    todayClasses,
    // hover
    hoverClasses,
    // focus
    'neoretro-focus',
    // Outside months
    '[&[data-outside-month]:not([data-selected])]:text-current/50',
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
