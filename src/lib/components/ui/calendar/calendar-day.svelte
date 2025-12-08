<script lang="ts">
  import { buttonVariants } from '$lib/components/ui/button/index.js';
  import { cn } from '$lib/utils.js';
  import { Calendar as CalendarPrimitive } from 'bits-ui';

  let { ref = $bindable(null), class: className, ...restProps }: CalendarPrimitive.DayProps = $props();
</script>

<CalendarPrimitive.Day
  bind:ref
  class={cn(
    buttonVariants({ noshadow: true }),
    'flex size-(--cell-size) flex-col items-center justify-center gap-1 p-0 leading-none font-normal whitespace-nowrap select-none',
    '[&[data-today]:not([data-selected])]:bg-secondary [&[data-today]:not([data-selected])]:text-foreground [&[data-today]:not([data-selected])]:hover:bg-accent [&[data-today]:not([data-selected])]:hover:text-accent-foreground [&[data-today][data-disabled]]:text-foreground/50',
    'data-selected:bg-primary data-selected:text-primary-foreground data-selected:hover:bg-accent data-selected:hover:text-accent-foreground',
    // Outside months
    '[&[data-outside-month]:not([data-selected])]:text-foreground/50 [&[data-outside-month]:not([data-selected])]:hover:text-accent-foreground',
    // Disabled
    'data-disabled:pointer-events-none data-disabled:text-foreground/50 data-disabled:opacity-50',
    // Unavailable
    'data-unavailable:text-foreground/50 data-unavailable:line-through',
    // hover
    'hover:bg-accent hover:text-accent-foreground',
    // focus
    'focus:relative focus:border-ring focus:ring-ring/50',
    // inner spans
    '[&>span]:text-xs [&>span]:opacity-70',
    className,
  )}
  {...restProps}
/>
