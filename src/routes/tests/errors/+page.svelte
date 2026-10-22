<script lang="ts">
  import { Errors } from '#lib/registry/ui/errors/index.js';

  import { page } from '$app/state';
</script>

<Errors message={page.error?.message ?? 'An error occurred while loading the page.'} />
