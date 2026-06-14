<script lang="ts">
  import ConfirmDialog from '$lib/registry/blocks/confirm-dialog.svelte';
  import { Button } from '$lib/registry/ui/button';

  let open = $state(false);
  let result = $state('');
</script>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-black mb-2 uppercase">Confirm Dialog Block</h1>
    <p>A reusable confirmation dialog block to simplify alert actions.</p>
  </div>

  <div class="gap-4 flex items-center">
    <Button
      onclick={() => {
        open = true;
        result = '';
      }}
      color="red">Delete Account</Button
    >
    {#if result}
      <span class="text-sm font-bold">{result}</span>
    {/if}
  </div>

  <ConfirmDialog
    bind:open
    title="Are you absolutely sure?"
    description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
    confirmText="Yes, delete my account"
    cancelText="No, wait"
    color="white"
    actionColor="red"
    cancelColor="white"
    onConfirm={() => {
      result = 'Account deleted successfully!';
    }}
    onCancel={() => {
      result = 'Action cancelled.';
    }}
  />
</div>
