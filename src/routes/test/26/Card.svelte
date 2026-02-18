<script>
  // @ts-nocheck
  import { cn } from '$lib/utils';

  // 1. Receive flexible props
  let { cols = 1, rows = 1, children, class: className, variant = 'base' } = $props();

  // 2. Define the Mapping Order
  const BP_ORDER = ['base', 'xs', 'sm', 'md', 'lg', 'xl', 'XXL'];

  // 3. The "Smart" Resolver
  const resolveSize = (val, currentVariant) => {
    // A. Handle "full" keyword or simple number
    if (val === 'full') return 'full';
    if (typeof val === 'number') return val;

    // B. Handle Array: [base, xs, sm, md, lg, xl, XXL]
    if (Array.isArray(val)) {
      const variantIndex = BP_ORDER.indexOf(currentVariant);
      // Return the value at index, or the last defined value if undefined
      // e.g. [4, 5] -> if variant is 'lg' (index 4), use '5' (index 1)
      const exact = val[variantIndex];
      if (exact != null) return exact;

      // Fallback: Find the nearest defined value to the left
      for (let i = variantIndex; i >= 0; i--) {
        if (val[i] != null) return val[i];
      }
      return 1; // Default
    }

    // C. Handle Object: { base: 4, md: 6 }
    if (typeof val === 'object') {
      // Check current variant
      if (val[currentVariant] != null) return val[currentVariant];

      // Fallback logic (check smaller breakpoints)
      const fallbackList = ['XXL', 'xl', 'lg', 'md', 'sm', 'xs', 'base'].slice(
        BP_ORDER.length - 1 - BP_ORDER.indexOf(currentVariant),
      );

      for (const bp of fallbackList) {
        if (val[bp] != null) return val[bp];
      }
      // If absolutely nothing matches, try to find *any* value
      return Object.values(val)[0] || 1;
    }

    return 1;
  };

  const UNIT = 5; // 5rem per column

  // 4. Calculate Dimensions
  const colSpan = $derived(resolveSize(cols, variant));
  const rowSpan = $derived(resolveSize(rows, variant));

  // Calculate width, handling 'full' special case
  const widthStyle = $derived(colSpan === 'full' ? '100%' : `${colSpan * UNIT}rem`);

  const minHeightRem = $derived(rowSpan === 'full' ? 5 : rowSpan * UNIT);
</script>

<!-- style:min-height="{minHeightRem}rem" -->
<div class="absolute z-1" style:width={widthStyle}>
  <div class="box-border h-full w-full pr-2 pb-2">
    <article
      class={cn(
        'bg-card flex h-full w-full min-w-0 flex-col border-2 border-black',
        'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
        className,
      )}
    >
      <div class="h-full overflow-hidden p-4">
        {@render children(variant)}
      </div>
    </article>
  </div>
</div>
