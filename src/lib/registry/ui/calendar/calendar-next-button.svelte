<script lang="ts">
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import { Calendar as CalendarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { colorMap, type ThemeColor } from '$lib/colors.js';
  import { buttonVariants } from '$lib/registry/ui/button/index.ts';
  import { cn } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, children, ...restProps }: CalendarPrimitive.NextButtonProps = $props();

  const getColors = getContext<() => { navColor: ThemeColor }>('calendarColors');
  const navColor = $derived(colorMap[getColors().navColor]);
</script>

{#snippet Fallback()}
  <ChevronRightIcon class="size-4" />
{/snippet}

<CalendarPrimitive.NextButton
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
