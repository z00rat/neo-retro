<script lang="ts">
  import { Accordion as AccordionPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  import type { ThemeColor } from '$lib/colors.js';

  let {
    ref = $bindable(null),
    value = $bindable(),
    triggerColor,
    contentColor,
    ...restProps
  }: AccordionPrimitive.RootProps & {
    triggerColor: ThemeColor;
    contentColor: ThemeColor;
  } = $props();

  setContext('accordionTriggerColor', () => triggerColor);
  setContext('accordionContentColor', () => contentColor);
</script>

<AccordionPrimitive.Root bind:ref bind:value={value as never} data-slot="accordion" {...restProps} />
