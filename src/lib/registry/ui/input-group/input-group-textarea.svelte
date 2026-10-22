<script lang="ts">
  import { Textarea } from '#lib/registry/ui/textarea/index.ts';
  import { cn } from '#lib/utils.ts';
  import type { ComponentProps } from 'svelte';

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
  class={cn('py-3 flex-1 resize-none border-none bg-transparent shadow-none', className)}
  bind:value
  {...props}
/>
