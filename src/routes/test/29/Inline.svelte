<script lang="ts">
  export let gap: 'xs' | 'sm' | 'md' | 'lg' = 'md';
  export let wrap: boolean = true;
  export let align: 'start' | 'center' | 'end' | 'between' = 'start';
  export let className = '';

  const gaps: Record<string, string> = {
    xs: 'gap-2',
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
  };

  const aligns: Record<string, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  };
</script>

<div
  class={`flex flex-row items-center ${aligns[align]} ${gaps[gap]}
              ${wrap ? 'flex-wrap' : 'flex-nowrap'} ${className}`}
>
  <slot />
</div>
