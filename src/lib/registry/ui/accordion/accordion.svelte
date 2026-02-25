<script lang="ts">
  import { Accordion as AccordionPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  let {
    ref = $bindable(null),
    value = $bindable(),
    triggerColor,
    contentColor,
    ...restProps
  }: AccordionPrimitive.RootProps & {
    triggerColor: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    contentColor: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();

  setContext('accordionTriggerColor', () => triggerColor);
  setContext('accordionContentColor', () => contentColor);
</script>

<AccordionPrimitive.Root bind:ref bind:value={value as never} data-slot="accordion" {...restProps} />
