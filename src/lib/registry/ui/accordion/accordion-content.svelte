<script lang="ts">
  import { Accordion as AccordionPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn, type WithoutChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithoutChild<AccordionPrimitive.ContentProps> = $props();

  const getColor = getContext<() => any>('accordionContentColor');
</script>

<AccordionPrimitive.Content
  bind:ref
  data-slot="accordion-content"
  data-color={getColor()}
  class={cn(
    'overflow-hidden rounded-b-[calc(var(--radius)-2px)] neoretro-clr text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
  )}
  {...restProps}
>
  <div class={cn('p-4', className)}>
    {@render children?.()}
  </div>
</AccordionPrimitive.Content>
