<script lang="ts">
  import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
  import { buttonVariants } from '#lib/registry/ui/button/index.ts';
  import { cn } from '#lib/utils.ts';
  import { Calendar as CalendarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  let { ref = $bindable(null), class: className, children, ...restProps }: CalendarPrimitive.PrevButtonProps = $props();

  const getColors = getContext<() => { navColor: string }>('calendarColors');
</script>

{#snippet Fallback()}
  <ChevronLeftIcon class="size-4" />
{/snippet}

<CalendarPrimitive.PrevButton
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
