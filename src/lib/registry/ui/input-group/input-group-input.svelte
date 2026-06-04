<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import { Input } from '$lib/registry/ui/input/index.ts';
  import { cn } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    ...props
  }: ComponentProps<typeof Input> = $props();
</script>

<Input
  bind:ref
  data-slot="input-group-control"
  noShadow={true}
  class={cn('rounded flex-1 border-0 bg-transparent shadow-none', className)}
  bind:value
  {...props}
/>
