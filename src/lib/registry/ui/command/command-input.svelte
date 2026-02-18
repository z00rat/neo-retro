<script lang="ts">
  import SearchIcon from '@lucide/svelte/icons/search';
  import { Command as CommandPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    value = $bindable(''),
    ...restProps
  }: CommandPrimitive.InputProps = $props();
</script>

<div class="flex h-full items-center gap-2 neoretro-border-b px-3" data-slot="command-input-wrapper">
  <SearchIcon class="size-4 shrink-0 opacity-80" />
  <CommandPrimitive.Input
    data-slot="command-input"
    class={cn(
      'flex h-full w-full rounded bg-transparent text-sm neoretro-focus-simple placeholder:opacity-80 data-[disabled=true]:neoretro-disable',
      className,
    )}
    bind:ref
    {...restProps}
    bind:value
  />
</div>
