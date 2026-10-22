<script lang="ts">
  import { cn } from '#lib/utils.ts';
  import { RangeCalendar as RangeCalendarPrimitive } from 'bits-ui';

  let { ref = $bindable(null), class: className, ...restProps }: RangeCalendarPrimitive.HeadCellProps = $props();
</script>

<RangeCalendarPrimitive.HeadCell
  bind:ref
  class={cn('p-0 flex size-(--cell-size) w-full items-center justify-center', className)}
  {...restProps}
/>
