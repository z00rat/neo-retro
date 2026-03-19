<script lang="ts">
  import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
  import { RangeCalendar as RangeCalendarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { buttonVariants } from '$lib/registry/ui/button/index.ts';
  import { cn } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: RangeCalendarPrimitive.PrevButtonProps = $props();

  const getColors = getContext<() => { navColor: any }>('calendarColors');
</script>

{#snippet Fallback()}
  <ChevronLeftIcon class="size-4" />
{/snippet}

<RangeCalendarPrimitive.PrevButton
  bind:ref
  data-pressable
  data-color={getColors().navColor}
  class={cn(
    buttonVariants({ size: 'icon', noShadow: false }),
    'p-0 size-(--cell-size) select-none rtl:rotate-180',
    className,
  )}
  children={children || Fallback}
  {...restProps}
/>
