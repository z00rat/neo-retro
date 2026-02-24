<script lang="ts">
  import AlertCircleIcon from '@lucide/svelte/icons/alert-circle';
  import CheckCircle2Icon from '@lucide/svelte/icons/check-circle-2';
  import CircleAlert from '@lucide/svelte/icons/circle-alert';
  import Info from '@lucide/svelte/icons/info';
  import PopcornIcon from '@lucide/svelte/icons/popcorn';
  import TriangleAlert from '@lucide/svelte/icons/triangle-alert';

  import type { ThemeColor } from '$lib/colors.js';
  import * as Alert from '$lib/registry/ui/alert';

  const colors: ThemeColor[] = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
</script>

<h1>Alert</h1>

<!-- All colors -->
<section>
  <h3>Colors</h3>
  <div class="space-y-4">
    {#each colors as color}
      <Alert.Root {color}>
        <Alert.Title>{color} alert</Alert.Title>
        <Alert.Description>This is a {color} alert description.</Alert.Description>
      </Alert.Root>
    {/each}
  </div>
</section>

<!-- With icons -->
<section>
  <h3>With Icons</h3>
  <div class="space-y-4">
    <Alert.Root color="blue">
      <Info />
      <Alert.Title>Info</Alert.Title>
      <Alert.Description>Here is some useful information.</Alert.Description>
    </Alert.Root>
    <Alert.Root color="yellow">
      <TriangleAlert />
      <Alert.Title>Warning</Alert.Title>
      <Alert.Description>Be careful with this action.</Alert.Description>
    </Alert.Root>
    <Alert.Root color="red">
      <CircleAlert />
      <Alert.Title>Error</Alert.Title>
      <Alert.Description>Something went wrong.</Alert.Description>
    </Alert.Root>
  </div>
</section>

<!-- No shadow -->
<section>
  <h3>Shadow</h3>
  <div class="space-y-4">
    <Alert.Root color="cyan">
      <Alert.Title>With shadow</Alert.Title>
      <Alert.Description>Default shadow style.</Alert.Description>
    </Alert.Root>
    <Alert.Root color="cyan" noShadow>
      <Alert.Title>No shadow</Alert.Title>
      <Alert.Description>Flat style, no shadow.</Alert.Description>
    </Alert.Root>
  </div>
</section>

<h3>DOC</h3>
<div class="grid w-full max-w-xl items-start gap-4">
  <Alert.Root color="black">
    <CheckCircle2Icon />
    <Alert.Title>Success! Your changes have been saved</Alert.Title>
    <Alert.Description>This is an alert with icon, title and description.</Alert.Description>
  </Alert.Root>
  <Alert.Root color="cyan">
    <PopcornIcon />
    <Alert.Title>This Alert has a title and an icon. No description.</Alert.Title>
  </Alert.Root>
  <Alert.Root color="red">
    <AlertCircleIcon />
    <Alert.Title>Unable to process your payment.</Alert.Title>
    <Alert.Description>
      <p>Please verify your billing information and try again.</p>
      <ul class="list-inside list-disc text-sm">
        <li>Check your card details</li>
        <li>Ensure sufficient funds</li>
        <li>Verify billing address</li>
      </ul>
    </Alert.Description>
  </Alert.Root>
</div>
