<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), class: className, ...restProps }: TabsPrimitive.ListProps = $props();
</script>

<TabsPrimitive.List
  bind:ref
  data-slot="tabs-list"
  class={cn('h-12 neoretro-shadow rounded neoretro-border flex w-full items-center', className)}
  {...restProps}
/>
