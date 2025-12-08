<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import SearchIcon from '@lucide/svelte/icons/search';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    value = $bindable(''),
    ...restProps
  }: CommandPrimitive.InputProps = $props();
</script>

<div class="flex h-full items-center gap-2 border-b border-border px-3" data-slot="command-input-wrapper">
  <SearchIcon class="size-4 shrink-0 opacity-80" />
  <CommandPrimitive.Input
    data-slot="command-input"
    class={cn(
      'rounded-base flex h-full w-full bg-transparent text-sm placeholder:text-primary-foreground placeholder:opacity-80 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    bind:ref
    {...restProps}
    bind:value
  />
</div>
