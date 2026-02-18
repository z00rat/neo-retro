<!-- Container.svelte -->
<script lang="ts">
  import { type Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    class?: string;
  }

  let { children, class: className = '' }: Props = $props();
</script>

<div class="mx-auto w-full max-w-7xl px-4 md:px-8 {className}">
  {@render children()}
</div>
