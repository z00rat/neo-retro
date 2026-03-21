<script lang="ts">
  import { page } from '$app/state';

  import { Errors } from '$lib/registry/ui/errors';
</script>

<Errors message={page.error?.message ?? 'An error occurred while loading the page.'} />
