<script>
  // @ts-nocheck

  import { cn } from '$lib/utils';

  let { cols = 1, rows = 4, children, class: className, variant } = $props();

  const fallbackOrder = (v) => {
    if (v === 'XXL') return ['XXL', 'xl', 'lg', 'md', 'sm', 'xs', 'base'];
    if (v === 'xl') return ['xl', 'lg', 'md', 'sm', 'xs', 'base'];
    if (v === 'lg') return ['lg', 'md', 'sm', 'xs', 'base'];
    if (v === 'md') return ['md', 'sm', 'xs', 'base'];
    if (v === 'sm') return ['sm', 'xs', 'base'];
    if (v === 'xs') return ['xs', 'base'];
    return ['base'];
  };

  const getVal = (v) => {
    if (v == null || typeof v !== 'object') return v;
    for (const k of fallbackOrder(variant)) {
      if (v[k] != null) return v[k];
    }
    return Object.values(v).find((x) => x != null);
  };

  const spanW = $derived.by(() => getVal(cols));
  const spanH = $derived.by(() => getVal(rows));
</script>

<div class="box-border min-w-0 pr-2 pb-2" style:grid-column="span {spanW}" style:grid-row="span {spanH}">
  <article
    class={cn(
      'bg-card box-border flex h-fit min-w-0 flex-col border-2 border-black',
      'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
      className,
    )}
  >
    <div class="h-full overflow-hidden p-4">
      {@render children(variant)}
    </div>
  </article>
</div>
