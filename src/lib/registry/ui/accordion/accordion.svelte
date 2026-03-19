<script lang="ts">
  import { Accordion as AccordionPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  import { cn } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    children,
    triggerColor,
    contentColor,
    ...restProps
  }: AccordionPrimitive.RootProps & {
    triggerColor: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    contentColor: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
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
