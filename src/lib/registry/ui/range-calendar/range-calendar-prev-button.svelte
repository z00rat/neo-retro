<script lang="ts">
  import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
  import { RangeCalendar as RangeCalendarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { colorMap, type ThemeColor } from '$lib/colors.js';
  import { buttonVariants } from '$lib/registry/ui/button/index.ts';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: RangeCalendarPrimitive.PrevButtonProps = $props();

  const getColors = getContext<() => { navColor: ThemeColor }>('calendarColors');
  const navColor = $derived(colorMap[getColors().navColor]);
</script>

{#snippet Fallback()}
  <ChevronLeftIcon class="size-4" />
{/snippet}

<RangeCalendarPrimitive.PrevButton
  bind:ref
  data-pressable
  class={cn(
    buttonVariants({ size: 'icon', noShadow: false }),
    navColor,
    'size-(--cell-size) p-0 select-none rtl:rotate-180',
    className,
  )}
  children={children || Fallback}
  {...restProps}
/>
