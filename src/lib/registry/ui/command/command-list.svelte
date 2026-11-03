<script lang="ts">
  import { cn } from '#lib/utils.ts';
  import { Command as CommandPrimitive } from 'bits-ui';

  let { ref = $bindable(null), class: className, ...restProps }: CommandPrimitive.ListProps = $props();
</script>

<CommandPrimitive.List
  tabindex={-1}
  bind:ref
  data-slot="command-list"
  class={cn('scroll-py-1 md:max-h-112.5 lg:max-h-150 max-h-75 overflow-x-hidden overflow-y-auto', className)}
  {...restProps}
/>
