<script lang="ts">
  import { cn } from '#lib/utils.ts';
  import { Calendar as CalendarPrimitive } from 'bits-ui';

  let { ref = $bindable(null), class: className, ...restProps }: CalendarPrimitive.CellProps = $props();
</script>

<CalendarPrimitive.Cell
  bind:ref
  class={cn('p-0 relative size-(--cell-size) text-center focus-within:z-20', className)}
  {...restProps}
/>
