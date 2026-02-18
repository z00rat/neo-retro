<script lang="ts">
  import { cn } from '$lib/utils';

  export let title = 'Card';
  export let subtitle = 'Neobrutalist block';
  export let tone: 'cyan' | 'lime' | 'pink' | 'yellow' | 'zinc' = 'cyan';
  export let className = '';
</script>

<div
  class={cn(
    'border-2 border-black bg-white shadow-[5px_5px_0_0_#000]',
    'p-4',
    tone === 'cyan' && 'bg-cyan-200',
    tone === 'lime' && 'bg-lime-200',
    tone === 'pink' && 'bg-pink-200',
    tone === 'yellow' && 'bg-yellow-200',
    tone === 'zinc' && 'bg-zinc-100',
    className,
  )}
>
  <div class="text-lg leading-tight font-black">{title}</div>
  <div class="text-xs font-bold tracking-wider text-zinc-800/80 uppercase">{subtitle}</div>

  <div class="mt-3 text-sm font-semibold text-zinc-950">
    <slot />
  </div>

  <div class="mt-4 flex gap-2">
    <button
      class="border-2 border-black bg-white px-3 py-2 font-black tracking-wide uppercase shadow-[3px_3px_0_0_#000]
               active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
    >
      Action
    </button>
    <button
      class="border-2 border-black bg-zinc-950 px-3 py-2 font-black tracking-wide text-white uppercase shadow-[3px_3px_0_0_#000]
               active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
    >
      More
    </button>
  </div>
</div>
