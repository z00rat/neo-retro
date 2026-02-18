<script lang="ts">
  export let gap: 'xs' | 'sm' | 'md' | 'lg' = 'md';
  export let className = '';

  const gaps: Record<string, string> = {
    xs: 'gap-2',
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
  };
</script>

<div class={`flex flex-col ${gaps[gap]} ${className}`}>
  <slot />
</div>
