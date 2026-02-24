<script lang="ts">
  import { Accordion as AccordionPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { colorMap, type ThemeColor } from '$lib/colors.js';
  import { cn, type WithoutChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithoutChild<AccordionPrimitive.ContentProps> = $props();

  const getColor = getContext<() => ThemeColor>('accordionContentColor');
</script>

<AccordionPrimitive.Content
  bind:ref
  data-slot="accordion-content"
  class={cn(
    'overflow-hidden rounded text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
    colorMap[getColor()],
  )}
  {...restProps}
>
  <div class={cn('p-4', className)}>
    {@render children?.()}
  </div>
</AccordionPrimitive.Content>
