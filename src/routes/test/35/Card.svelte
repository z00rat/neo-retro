<script lang="ts">
  import { type Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    class?: string;
    bgcolor?: string;
    minHeight?: string;
  }

  let { children, class: className = '', bgcolor = 'bg-white', minHeight = '' }: Props = $props();
</script>

<div class="border-2 border-black p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] {bgcolor} {minHeight} {className}">
  {@render children()}
</div>
