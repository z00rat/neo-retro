<script lang="ts">
  import SearchIcon from '@lucide/svelte/icons/search';
  import { cn } from '#lib/utils.ts';
  import { Command as CommandPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  let {
    ref = $bindable(null),
    class: className,
    value = $bindable(''),
    ...restProps
  }: CommandPrimitive.InputProps = $props();
  const getColor = getContext<() => string>('commandColor');
</script>

<div class="gap-2 px-4 flex h-full items-center" data-slot="command-input-wrapper">
  <SearchIcon class="size-4 shrink-0 opacity-90" />
  <CommandPrimitive.Input
    data-slot="command-input"
    data-color={getColor()}
    class={cn(
      'rounded neoretro-clr data-[disabled=true]:neoretro-disable flex h-full w-full border-none outline-none placeholder:opacity-90',
      className,
    )}
    bind:ref
    {...restProps}
    bind:value
  />
</div>
