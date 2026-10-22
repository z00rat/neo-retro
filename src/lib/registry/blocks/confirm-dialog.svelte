<script lang="ts">
  import * as AlertDialog from '#lib/registry/ui/alert-dialog/index.js';
  import { type Color } from '#lib/utils.ts';
  import type { Snippet } from 'svelte';

  type ButtonColors = Color;

  let {
    open = $bindable(false),
    title = 'Are you sure?',
    description = 'This action cannot be undone.',
    cancelText = 'Cancel',
    confirmText = 'Confirm',
    color,
    actionColor,
    cancelColor,
    onConfirm,
    onCancel,
    children,
  }: {
    open?: boolean;
    title?: string;
    description?: string;
    cancelText?: string;
    confirmText?: string;
    color: ButtonColors;
    actionColor: ButtonColors;
    cancelColor: ButtonColors;
    onConfirm?: () => void;
    onCancel?: () => void;
    children?: Snippet<[{ props: Record<string, unknown> }]>;
  } = $props();
</script>

<AlertDialog.Root bind:open {color} {actionColor} {cancelColor}>
  {#if children}
    <AlertDialog.Trigger>
      {#snippet child({ props })}
        {@render children({ props })}
      {/snippet}
    </AlertDialog.Trigger>
  {/if}
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>{title}</AlertDialog.Title>
      {#if description}
        <AlertDialog.Description>{description}</AlertDialog.Description>
      {/if}
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel
        onclick={() => {
          open = false;
          onCancel?.();
        }}>{cancelText}</AlertDialog.Cancel
      >
      <AlertDialog.Action
        onclick={() => {
          open = false;
          onConfirm?.();
        }}>{confirmText}</AlertDialog.Action
      >
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
