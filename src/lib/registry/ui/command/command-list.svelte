<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), class: className, ...restProps }: CommandPrimitive.ListProps = $props();
</script>

<CommandPrimitive.List
  tabindex={-1}
  bind:ref
  data-slot="command-list"
  class={cn('scroll-py-1 max-h-[300px] overflow-x-hidden overflow-y-auto', className)}
  {...restProps}
/>
