<script lang="ts">
  import * as AlertDialog from '$lib/registry/ui/alert-dialog';
  import { Button } from '$lib/registry/ui/button';
</script>

<h1>Alert Dialog</h1>

<!-- Basic -->
<section>
  <h3>Basic</h3>
  <AlertDialog.Root color="white" cancleColor="white" actionColor="red">
    <AlertDialog.Trigger>
      <Button color="red">Delete Account</Button>
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
    <AlertDialog.Root color="cyan" cancleColor="white" actionColor="blue">
      <AlertDialog.Trigger>
        <Button color="cyan">Cyan dialog</Button>
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

    <AlertDialog.Root color="yellow" cancleColor="white" actionColor="green">
      <AlertDialog.Trigger>
        <Button color="yellow">Yellow dialog</Button>
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

    <AlertDialog.Root color="magenta" cancleColor="white" actionColor="green">
      <AlertDialog.Trigger>
        <Button color="magenta">Magenta dialog</Button>
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
