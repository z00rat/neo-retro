<script lang="ts">
  import { RangeCalendar as RangeCalendarPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), class: className, ...restProps }: RangeCalendarPrimitive.HeaderProps = $props();
</script>

<RangeCalendarPrimitive.Header
  bind:ref
  class={cn('gap-2 font-medium flex h-(--cell-size) w-full items-center justify-center', className)}
  {...restProps}
/>
