<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  import { colorMap, type ThemeColor } from '$lib/colors.js';
  import { cn } from '$lib/utils.js';

  export type CommandRootApi = CommandPrimitive.Root;

  let {
    api = $bindable(null),
    ref = $bindable(null),
    value = $bindable(''),
    class: className,
    color,
    hoverColor,
    ...restProps
  }: CommandPrimitive.RootProps & {
    color: ThemeColor;
    hoverColor?: ThemeColor;
    api?: CommandRootApi | null;
  } = $props();

  setContext('commandHoverColor', () => hoverColor);
</script>

<CommandPrimitive.Root
  bind:this={api}
  bind:value
  bind:ref
  data-slot="command"
  class={cn(
    'font-base flex h-full w-full neoretro-shadow flex-col overflow-hidden rounded border-none',
    colorMap[color],
    className,
  )}
  {...restProps}
/>
