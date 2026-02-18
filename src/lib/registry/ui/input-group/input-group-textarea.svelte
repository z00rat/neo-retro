<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import { Textarea } from '$lib/registry/ui/textarea/index.ts';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    ...props
  }: ComponentProps<typeof Textarea> = $props();
</script>

<Textarea
  bind:ref
  data-slot="input-group-control"
  noShadow={true}
  class={cn('flex-1 resize-none rounded-none border-none bg-transparent py-3 shadow-none', className)}
  bind:value
  {...props}
/>
