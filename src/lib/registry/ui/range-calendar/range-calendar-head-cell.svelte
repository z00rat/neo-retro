<script lang="ts">
  import { RangeCalendar as RangeCalendarPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, ...restProps }: RangeCalendarPrimitive.HeadCellProps = $props();
</script>

<RangeCalendarPrimitive.HeadCell
  bind:ref
  class={cn(
    'text-muted-foreground flex size-(--cell-size) w-full items-center justify-center p-0 text-sm font-normal',
    className,
  )}
  {...restProps}
/>
