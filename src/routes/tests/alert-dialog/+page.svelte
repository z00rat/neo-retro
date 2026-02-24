<script lang="ts">
  import * as AlertDialog from '$lib/registry/ui/alert-dialog';
  import { Button } from '$lib/registry/ui/button';
</script>

<h1>Alert Dialog</h1>

<!-- Basic -->
<section>
  <h3>Basic</h3>
  <AlertDialog.Root>
    <AlertDialog.Trigger>
      <Button color="red">Delete Account</Button>
    </AlertDialog.Trigger>
    <AlertDialog.Content color="white">
      <AlertDialog.Header>
        <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
        <AlertDialog.Description>
          This action cannot be undone. This will permanently delete your account.
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel color="white">Cancel</AlertDialog.Cancel>
        <AlertDialog.Action color="red">Delete</AlertDialog.Action>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
</section>

<!-- Color combos -->
<section>
  <h3>Color Combos</h3>
  <div class="flex flex-wrap gap-4">
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="cyan">Cyan dialog</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content color="cyan">
        <AlertDialog.Header>
          <AlertDialog.Title>Information</AlertDialog.Title>
          <AlertDialog.Description>This is an informational alert dialog on a cyan background.</AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel color="white">Dismiss</AlertDialog.Cancel>
          <AlertDialog.Action color="blue">Got it</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>

    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="yellow">Yellow dialog</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content color="yellow">
        <AlertDialog.Header>
          <AlertDialog.Title>Warning</AlertDialog.Title>
          <AlertDialog.Description
            >This action may have consequences. Please review before continuing.</AlertDialog.Description
          >
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel color="white">Go back</AlertDialog.Cancel>
          <AlertDialog.Action color="green">Continue</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>

    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="black">Black dialog</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content color="black">
        <AlertDialog.Header>
          <AlertDialog.Title>Confirm</AlertDialog.Title>
          <AlertDialog.Description>Are you sure you want to proceed?</AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel color="white">No</AlertDialog.Cancel>
          <AlertDialog.Action color="green">Yes</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  </div>
</section>
