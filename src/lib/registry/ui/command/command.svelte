<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  import { cn } from '$lib/utils.js';

  export type CommandRootApi = CommandPrimitive.Root;

  let {
    api = $bindable(null),
    ref = $bindable(null),
    value = $bindable(''),
    class: className,
    color,
    ...restProps
  }: CommandPrimitive.RootProps & {
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    api?: CommandRootApi | null;
  } = $props();

  setContext('commandColor', () => color);
</script>

<CommandPrimitive.Root
  bind:this={api}
  bind:value
  bind:ref
  data-slot="command"
  data-color={color}
  class={cn(
    'font-base flex h-full w-full neoretro-shadow flex-col overflow-hidden rounded border-none neoretro-clr',
    className,
  )}
  {...restProps}
/>
