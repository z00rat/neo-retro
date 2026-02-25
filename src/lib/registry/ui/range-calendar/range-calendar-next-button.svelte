<script lang="ts">
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import { RangeCalendar as RangeCalendarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { buttonVariants } from '$lib/registry/ui/button/index.ts';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: RangeCalendarPrimitive.NextButtonProps = $props();

  const getColors = getContext<() => { navColor: any }>('calendarColors');
</script>

{#snippet Fallback()}
  <ChevronRightIcon class="size-4" />
{/snippet}

<RangeCalendarPrimitive.NextButton
  bind:ref
  data-pressable
  data-color={getColors().navColor}
  class={cn(
    buttonVariants({ size: 'icon', noShadow: false }),
    'neoretro-clr',
    'size-(--cell-size) p-0 select-none rtl:rotate-180',
    className,
  )}
  children={children || Fallback}
  {...restProps}
/>
