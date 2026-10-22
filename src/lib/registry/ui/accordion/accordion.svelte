<script lang="ts">
  import { cn, type Color } from '#lib/utils.ts';
  import { Accordion as AccordionPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    children,
    triggerColor,
    contentColor,
    ...restProps
  }: AccordionPrimitive.RootProps & {
    triggerColor: Color;
    contentColor: Color;
  } = $props();

  setContext('accordionTriggerColor', () => triggerColor);
  setContext('accordionContentColor', () => contentColor);
</script>

<AccordionPrimitive.Root
  bind:ref
  bind:value={value as never}
  data-slot="accordion"
  class={cn('flex flex-col', className)}
  {...restProps}
>
  {@render children?.()}
</AccordionPrimitive.Root>
