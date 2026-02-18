<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.js';

  export type CommandRootApi = CommandPrimitive.Root;

  let {
    api = $bindable(null),
    ref = $bindable(null),
    value = $bindable(''),
    class: className,
    ...restProps
  }: CommandPrimitive.RootProps & {
    api?: CommandRootApi | null;
  } = $props();
</script>

<CommandPrimitive.Root
  bind:this={api}
  bind:value
  bind:ref
  data-slot="command"
  class={cn(
    'font-base flex h-full w-full neoretro-shadow flex-col overflow-hidden rounded border-none neoretro-the-default',
    className,
  )}
  {...restProps}
/>
