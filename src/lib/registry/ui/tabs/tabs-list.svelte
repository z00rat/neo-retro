<script lang="ts">
  import { cn } from '#lib/utils.ts';
  import { Tabs as TabsPrimitive } from 'bits-ui';

  let { ref = $bindable(null), class: className, ...restProps }: TabsPrimitive.ListProps = $props();
</script>

<TabsPrimitive.List
  bind:ref
  data-slot="tabs-list"
  class={cn(
    'h-12 rounded pr-1 pb-1 [&>*:not(:first-child)]:-ml-0.5 flex w-full items-stretch *:relative *:focus-visible:z-20 [&>*:not(:first-child)]:rounded-s-none [&>*:not(:last-child)]:rounded-e-none',
    className,
  )}
  {...restProps}
/>
