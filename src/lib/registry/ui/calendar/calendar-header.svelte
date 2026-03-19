<script lang="ts">
  import { Calendar as CalendarPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), class: className, ...restProps }: CalendarPrimitive.HeaderProps = $props();
</script>

<CalendarPrimitive.Header
  bind:ref
  class={cn('gap-2 font-medium flex h-(--cell-size) w-full items-center justify-center', className)}
  {...restProps}
/>
