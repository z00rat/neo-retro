<script lang="ts">
  import { page } from '$app/state';
</script>

<svelte:head>
  <title>Oops! Error {page.status}</title>
</svelte:head>

<div class="flex h-screen flex-col items-center justify-center">
  <h1 class="text-2xl font-bold">{page.status}: {page.error?.message}</h1>
  <p class="text-sm">{page.error?.message ?? 'An error occurred while loading the page.'}</p>

  {#if page.status === 404}
    <a href="/" class="text-sm underline">Go to home</a>
  {/if}
</div>
