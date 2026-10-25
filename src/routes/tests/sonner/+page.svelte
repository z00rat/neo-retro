<script lang="ts">
  import { Button } from '#lib/registry/ui/button/index.js';
  import { Toaster, toastWithColor } from '#lib/registry/ui/sonner/index.js';
  import { toast } from 'svelte-sonner';

  let promisePending = $state(false);

  function runPromise() {
    promisePending = true;
    toast.promise(
      new Promise<string>((resolve) => {
        setTimeout(() => {
          promisePending = false;
          resolve('Your changes are ready.');
        }, 1800);
      }),
      {
        loading: 'Saving your changes…',
        success: (message) => message,
        error: 'Could not save your changes.',
      },
    );
  }
</script>

<svelte:head>
  <title>Sonner · Neo-Retro</title>
</svelte:head>

<Toaster position="bottom-right" visibleToasts={9} />

<main class="max-w-5xl space-y-10 p-6 md:p-10 mx-auto">
  <header class="max-w-2xl space-y-3">
    <p class="text-sm font-semibold tracking-wider uppercase">Component playground</p>
    <h1>Sonner</h1>
    <p class="text-muted-foreground">A small collection of toast states, actions, and timing controls.</p>
  </header>

  <section class="space-y-4">
    <h2>Toast types</h2>
    <div class="gap-3 flex flex-wrap">
      <Button color="white" onclick={() => toast('A short message for your queue.')}>Default</Button>
      <Button
        color="green"
        onclick={() => toastWithColor('green', 'Changes saved', { description: 'Your profile is up to date.' })}
        >Success</Button
      >
      <Button
        color="red"
        onclick={() => toastWithColor('red', 'Upload failed', { description: 'Check your connection and try again.' })}
        >Error</Button
      >
      <Button
        color="blue"
        onclick={() => toastWithColor('blue', 'New version available', { description: 'Refresh when you are ready.' })}
        >Info</Button
      >
      <Button
        color="yellow"
        onclick={() => toastWithColor('yellow', 'Storage is almost full', { description: 'You have 2 GB remaining.' })}
        >Warning</Button
      >
      <Button color="white" onclick={() => toast.loading('Waiting for the server…')}>Loading</Button>
    </div>
  </section>

  <section class="space-y-4">
    <h2>Actions and controls</h2>
    <div class="gap-3 flex flex-wrap">
      <Button
        color="white"
        onclick={() =>
          toast('Item archived', {
            description: 'You can restore it from the archive.',
            action: { label: 'Undo', onClick: () => toast.success('Item restored') },
          })}>With action</Button
      >
      <Button
        color="white"
        onclick={() =>
          toast('Delete this draft?', {
            description: 'This action can’t be undone.',
            action: { label: 'Delete', onClick: () => toast.error('Draft deleted') },
            cancel: { label: 'Cancel', onClick: () => toast('Deletion canceled') },
          })}>Action and cancel</Button
      >
      <Button
        color="white"
        onclick={() => toast('This one stays until dismissed', { duration: Number.POSITIVE_INFINITY })}
        >Persistent</Button
      >
      <Button color="white" onclick={() => toast.dismiss()}>Dismiss all</Button>
      <Button color="white" disabled={promisePending} onclick={runPromise}>Promise</Button>
    </div>
  </section>

  <section class="space-y-4">
    <h2>Stacking</h2>
    <p class="text-muted-foreground">Send a few at once to see how multiple notifications stack.</p>
    <div class="gap-3 flex flex-wrap">
      <Button
        color="white"
        onclick={() => {
          toastWithColor('cyan', 'First notification');
          toastWithColor('yellow', 'Second notification');
          toastWithColor('magenta', 'Third notification');
        }}>Show a stack</Button
      >
      <Button
        color="white"
        onclick={() =>
          toast('Longer message', {
            description: 'Toast descriptions can wrap onto multiple lines while keeping the close control aligned.',
          })}>Long description</Button
      >
    </div>
  </section>
</main>
