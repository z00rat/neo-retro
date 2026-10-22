<script lang="ts">
  import * as AlertDialog from '#lib/registry/ui/alert-dialog/index.js';
  import { Button } from '#lib/registry/ui/button/index.js';
</script>

<h1>Alert Dialog</h1>

<!-- Basic -->
<section>
  <h3>Basic</h3>
  <AlertDialog.Root color="white" cancelColor="white" actionColor="red">
    <AlertDialog.Trigger>
      {#snippet child({ props })}
        <Button {...props} color="red">Delete Account</Button>
      {/snippet}
    </AlertDialog.Trigger>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
        <AlertDialog.Description>
          This action cannot be undone. This will permanently delete your account.
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
        <AlertDialog.Action>Delete</AlertDialog.Action>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
</section>

<!-- Color combos -->
<section>
  <h3>Color Combos</h3>
  <div class="gap-4 flex flex-wrap">
    <AlertDialog.Root color="cyan" cancelColor="white" actionColor="blue">
      <AlertDialog.Trigger>
        {#snippet child({ props })}
          <Button {...props} color="cyan">Cyan dialog</Button>
        {/snippet}
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Information</AlertDialog.Title>
          <AlertDialog.Description>This is an informational alert dialog on a cyan background.</AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Dismiss</AlertDialog.Cancel>
          <AlertDialog.Action>Got it</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>

    <AlertDialog.Root color="yellow" cancelColor="white" actionColor="green">
      <AlertDialog.Trigger>
        {#snippet child({ props })}
          <Button {...props} color="yellow">Yellow dialog</Button>
        {/snippet}
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Warning</AlertDialog.Title>
          <AlertDialog.Description
            >This action may have consequences. Please review before continuing.</AlertDialog.Description
          >
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Go back</AlertDialog.Cancel>
          <AlertDialog.Action>Continue</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>

    <AlertDialog.Root color="magenta" cancelColor="white" actionColor="green">
      <AlertDialog.Trigger>
        {#snippet child({ props })}
          <Button {...props} color="magenta">Magenta dialog</Button>
        {/snippet}
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Confirm</AlertDialog.Title>
          <AlertDialog.Description>Are you sure you want to proceed?</AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>No</AlertDialog.Cancel>
          <AlertDialog.Action>Yes</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  </div>
</section>
