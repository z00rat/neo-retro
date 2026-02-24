<script lang="ts">
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import { Accordion as AccordionPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { colorMap, type ThemeColor } from '$lib/colors.js';
  import { cn, type WithoutChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    level = 3,
    children,
    ...restProps
  }: WithoutChild<AccordionPrimitive.TriggerProps> & {
    level?: AccordionPrimitive.HeaderProps['level'];
  } = $props();

  const getColor = getContext<() => ThemeColor>('accordionTriggerColor');
</script>

<AccordionPrimitive.Header {level} class="flex">
  <AccordionPrimitive.Trigger
    data-slot="accordion-trigger"
    bind:ref
    class={cn(
      'neoretro-focus flex flex-1 items-center justify-between rounded p-4 text-left font-medium transition-all aria-disabled:neoretro-disable data-[state=open]:rounded-b-none data-[state=open]:neoretro-border-b [&[data-state=open]>svg]:rotate-180',
      colorMap[getColor()],
      className,
    )}
    {...restProps}
  >
    {@render children?.()}
    <ChevronDownIcon class="pointer-events-none size-4 shrink-0 transition-transform duration-200" />
  </AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
