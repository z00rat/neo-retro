<script lang="ts">
  import { page } from '$app/state';

  import { Errors } from '$lib/registry/ui/errors';
</script>

<svelte:head>
  <title>Oops! Error {page.status}</title>
</svelte:head>

<Errors message={page.error?.message ?? 'An error occurred while loading the page.'} />
