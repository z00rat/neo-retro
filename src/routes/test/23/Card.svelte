<script>
  import { cn } from '$lib/utils';

  let { cols = 1, rows = 4, children, class: className, variant } = $props();

  // Helper to resolve responsive values
  const getVal = (v) => (typeof v === 'object' ? v[variant] || v.sm : v);

  const spanW = $derived.by(() => getVal(cols));
  const spanH = $derived.by(() => getVal(rows));
</script>

<article
  class={cn('bg-card flex h-fit flex-col border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]', className)}
  style:grid-column="span {spanW}"
  style:grid-row="span {spanH}"
>
  <div class="h-full overflow-hidden p-4">
    {@render children(variant)}
  </div>
</article>
