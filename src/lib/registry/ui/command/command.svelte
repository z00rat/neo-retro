<script lang="ts">
  import { cn, type Color } from '#lib/utils.ts';
  import { Command as CommandPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  export type CommandRootApi = CommandPrimitive.Root;

  let {
    api = $bindable(null),
    ref = $bindable(null),
    value = $bindable(''),
    class: className,
    color,
    ...restProps
  }: CommandPrimitive.RootProps & {
    color: 'black' | 'bright-black' | Color;
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
  class={cn('rounded neoretro-shadow neoretro-clr flex h-full w-full flex-col overflow-hidden', className)}
  {...restProps}
/>
