<script lang="ts">
  import type { Command as CommandPrimitive, Dialog as DialogPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';

  import * as Dialog from '$lib/registry/ui/dialog/index.ts';
  import type { WithoutChildrenOrChild } from '$lib/utils.ts';

  import Command from './command.svelte';

  let {
    open = $bindable(false),
    ref = $bindable(null),
    value = $bindable(''),
    color,
    title = 'Command Palette',
    description = 'Search for a command to run',
    portalProps,
    children,
    ...restProps
  }: WithoutChildrenOrChild<DialogPrimitive.RootProps> &
    WithoutChildrenOrChild<CommandPrimitive.RootProps> & {
      color: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
      portalProps?: DialogPrimitive.PortalProps;
      children: Snippet;
      title?: string;
      description?: string;
    } = $props();
</script>

<Dialog.Root bind:open {...restProps}>
  <Dialog.Header class="sr-only">
    <Dialog.Title>{title}</Dialog.Title>
    <Dialog.Description>{description}</Dialog.Description>
  </Dialog.Header>
  <Dialog.Content {color} class="neoretro-shadow p-0 overflow-hidden" {portalProps}>
    <Command
      {color}
      class="**:data-command-group:px-2 **:data-command-input:h-12 **:data-command-item:px-2 **:data-command-item:py-3 **:data-[slot=command-input-wrapper]:h-12 [&_[data-command-group]:not([hidden])_~[data-command-group]]:pt-0 [&_[data-command-input-wrapper]_svg]:h-5 [&_[data-command-input-wrapper]_svg]:w-5 [&_[data-command-item]_svg]:h-5 [&_[data-command-item]_svg]:w-5"
      {...restProps}
      bind:value
      bind:ref
      {children}
    />
  </Dialog.Content>
</Dialog.Root>
