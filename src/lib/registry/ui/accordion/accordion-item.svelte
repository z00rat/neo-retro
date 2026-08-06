<script lang="ts">
  import { Accordion as AccordionPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), class: className, ...restProps }: AccordionPrimitive.ItemProps = $props();
</script>

<AccordionPrimitive.Item
  bind:ref
  data-slot="accordion-item"
  class={cn(
    'group neoretro-shadow neoretro-border first:rounded-t-sm last:rounded-b-sm relative rounded-none not-first:-mt-0.5',
    className,
  )}
  {...restProps}
/>
