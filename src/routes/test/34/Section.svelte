<script lang="ts">
  import { type Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    class?: string;
    bgcolor?: string;
  }

  let { children, class: className = '', bgcolor = '' }: Props = $props();
</script>

<section class="w-full py-16 {bgcolor} {className}">
  {@render children()}
</section>
