<script lang="ts">
  import { cn } from '#lib/utils.ts';
  import { RangeCalendar as RangeCalendarPrimitive } from 'bits-ui';

  let { ref = $bindable(null), class: className, ...restProps }: RangeCalendarPrimitive.HeadingProps = $props();
</script>

<RangeCalendarPrimitive.Heading bind:ref class={cn('px-(--cell-size)', className)} {...restProps} />
