<script lang="ts">
  export let as: keyof HTMLElementTagNameMap = 'div';
  export let className = '';

  export let tone: 'paper' | 'lemon' | 'mint' | 'sky' | 'rose' | 'lavender' | 'sand' = 'paper';

  const tones: Record<string, string> = {
    paper: 'bg-white',
    lemon: 'bg-yellow-200',
    mint: 'bg-emerald-200',
    sky: 'bg-sky-200',
    rose: 'bg-rose-200',
    lavender: 'bg-violet-200',
    sand: 'bg-amber-200',
  };
</script>

<svelte:element
  this={as}
  class={`card ${tones[tone]} mt-[2px] mr-[6px] mb-[6px] ml-[2px] border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] ${className}`}
>
  <slot />
</svelte:element>

<style>
  .card {
    background-image: radial-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1.2px);
    background-size: 12px 12px;
    background-position: 6px 6px;
  }
</style>
