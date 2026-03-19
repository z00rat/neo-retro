<script lang="ts">
  import { Calendar as CalendarPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), class: className, ...restProps }: CalendarPrimitive.HeadCellProps = $props();
</script>

<CalendarPrimitive.HeadCell
  bind:ref
  class={cn('p-0 flex size-(--cell-size) w-full items-center justify-center', className)}
  {...restProps}
/>
