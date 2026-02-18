<script lang="ts">
  import { type Snippet } from 'svelte';

  import { cn } from '$lib/utils';

  let {
    children,
    gap = 'md', // sm, md, lg
    class: className,
  }: {
    children: Snippet;
    gap?: 'sm' | 'md' | 'lg' | 'none';
    class?: string;
  } = $props();

  const gaps = {
    none: 'space-y-0',
    sm: 'space-y-2', // 0.5rem
    md: 'space-y-6', // 1.5rem (approx 24px)
    lg: 'space-y-12', // 3rem (approx 48px)
  };
</script>

<div class={cn('flex w-full flex-col', gaps[gap], className)}>
  {@render children()}
</div>
