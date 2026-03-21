<script lang="ts">
  import { Accordion as AccordionPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn, type WithoutChild } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithoutChild<AccordionPrimitive.ContentProps> = $props();

  const getColor = getContext<() => string>('accordionContentColor');
</script>

<AccordionPrimitive.Content
  bind:ref
  data-slot="accordion-content"
  data-color={getColor()}
  class={cn(
    'neoretro-clr text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden rounded-none group-last:rounded-b-[calc(var(--radius)-2px)]',
  )}
  {...restProps}
>
  <div class={cn('p-4', className)}>{@render children?.()}</div>
</AccordionPrimitive.Content>
