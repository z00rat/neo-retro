<script lang="ts">
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import { Accordion as AccordionPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn, type WithoutChild } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    level = 3,
    children,
    ...restProps
  }: WithoutChild<AccordionPrimitive.TriggerProps> & {
    level?: AccordionPrimitive.HeaderProps['level'];
  } = $props();

  const getColor = getContext<() => string>('accordionTriggerColor');
</script>

<AccordionPrimitive.Header {level} class="flex">
  <AccordionPrimitive.Trigger
    bind:ref
    data-slot="accordion-trigger"
    data-color={getColor()}
    class={cn(
      'neoretro-focus neoretro-clr p-4 font-medium aria-disabled:neoretro-disable data-[state=open]:neoretro-border-b flex flex-1 items-center justify-between rounded-none text-left group-first:rounded-t-[calc(var(--radius)-2px)] group-last:data-[state=closed]:rounded-b-[calc(var(--radius)-2px)] [&[data-state=open]>svg]:rotate-180',
      className,
    )}
    {...restProps}
  >
    {@render children?.()}
    <ChevronDownIcon class="size-6 pointer-events-none shrink-0 transition-transform duration-200" />
  </AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
