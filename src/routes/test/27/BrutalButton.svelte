<script lang="ts">
  import { cn } from '$lib/utils';

  export let tone: 'zinc' | 'lime' | 'pink' | 'yellow' = 'zinc';
  export let size: 'sm' | 'md' = 'md';
  export let className = '';
</script>

<button
  class={cn(
    'border-2 border-black font-black tracking-wide uppercase select-none',
    'shadow-[3px_3px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
    size === 'sm' ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-sm',
    tone === 'zinc' && 'bg-white text-black',
    tone === 'lime' && 'bg-lime-300 text-black',
    tone === 'pink' && 'bg-pink-300 text-black',
    tone === 'yellow' && 'bg-yellow-300 text-black',
    className,
  )}
>
  <slot />
</button>
