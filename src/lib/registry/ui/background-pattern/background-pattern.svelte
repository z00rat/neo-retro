<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  export const PATTERN_TYPES = [
    'dots',
    'circles',
    'grid',
    'horizontal-lines',
    'waves',
    'checkerboard',
    'cross',
    'diamonds',
    'hexagons',
    'triangles',
    'bricks',
    'stars',
    'truchet',
    'isometric',
  ] as const;

  export type PatternType = (typeof PATTERN_TYPES)[number];

  export const PATTERN_MASKS = [
    'none',
    'fade-edges',
    'fade-center',
    'fade-top',
    'fade-bottom',
    'fade-left',
    'fade-right',
    'fade-horizontal',
    'fade-vertical',
    'spotlight',
  ] as const;

  export type PatternMask = (typeof PATTERN_MASKS)[number];

  export type PatternContext = {
    size: number;
    half: number;
    strokeWidth: number;
  };

  /** A preset name or a snippet rendered inside the SVG pattern tile. */
  export type Pattern = PatternType | Snippet<[PatternContext]>;

  export type BackgroundPatternProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    ref?: HTMLDivElement | null;
    pattern?: Pattern;
    size?: number;
    strokeWidth?: number;
    rotation?: number;
    opacity?: number;
    mask?: PatternMask;
    absolute?: boolean;
  };
</script>

<script lang="ts">
  import { cn } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    style: userStyle,
    pattern = 'dots',
    size = 20,
    strokeWidth = 1,
    rotation = 0,
    opacity = 0.2,
    mask = 'none',
    absolute = true,
    ...restProps
  }: BackgroundPatternProps = $props();

  const componentId = $props.id();
  const patternId = `background-pattern-${componentId}`;

  const maskImages: Record<Exclude<PatternMask, 'none'>, string> = {
    'fade-edges': 'radial-gradient(circle, black 40%, transparent 95%)',
    'fade-center': 'radial-gradient(circle, transparent 30%, black 90%)',
    'fade-top': 'linear-gradient(to bottom, transparent 0%, black 60%)',
    'fade-bottom': 'linear-gradient(to top, transparent 0%, black 60%)',
    'fade-left': 'linear-gradient(to right, transparent 0%, black 60%)',
    'fade-right': 'linear-gradient(to left, transparent 0%, black 60%)',
    'fade-horizontal': 'linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)',
    'fade-vertical': 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
    spotlight: 'radial-gradient(circle, black 20%, transparent 70%)',
  };

  const maskImage = $derived(mask === 'none' ? undefined : maskImages[mask]);
  const patternStyle = $derived(
    [
      `opacity: ${opacity}`,
      maskImage && `mask-image: ${maskImage}`,
      maskImage && `-webkit-mask-image: ${maskImage}`,
      userStyle,
    ]
      .filter(Boolean)
      .join('; '),
  );

  const half = $derived(size / 2);
  const quarter = $derived(size / 4);
  const tileWidth = $derived(pattern === 'bricks' || pattern === 'triangles' ? size * 2 : size);
  const tileHeight = $derived(pattern === 'triangles' ? size * 2 : size);
  const customContext = $derived({ size, half, strokeWidth });
</script>

<div
  bind:this={ref}
  data-slot="background-pattern"
  class={cn(
    'pointer-events-none overflow-hidden select-none',
    absolute ? 'inset-0 absolute z-0 h-full w-full' : 'relative h-full w-full',
    className,
  )}
  style={patternStyle}
  {...restProps}
>
  <svg class="h-full w-full" aria-hidden="true">
    <defs>
      <pattern
        id={patternId}
        width={tileWidth}
        height={tileHeight}
        patternUnits="userSpaceOnUse"
        patternTransform={rotation ? `rotate(${rotation})` : undefined}
      >
        {#if typeof pattern === 'function'}
          {@render pattern(customContext)}
        {:else if pattern === 'dots'}
          <circle cx={half} cy={half} r={size * 0.1} fill="currentColor" />
        {:else if pattern === 'circles'}
          <circle cx={half} cy={half} r={size * 0.2} fill="none" stroke="currentColor" stroke-width={strokeWidth} />
        {:else if pattern === 'grid'}
          <path d={`M ${size} 0 H 0 V ${size}`} fill="none" stroke="currentColor" stroke-width={strokeWidth} />
        {:else if pattern === 'horizontal-lines'}
          <path d={`M 0 ${half} H ${size}`} fill="none" stroke="currentColor" stroke-width={strokeWidth} />
        {:else if pattern === 'waves'}
          <path
            d={`M 0 ${half} L ${quarter} ${quarter} L ${half} ${half} L ${half + quarter} ${quarter} L ${size} ${half}`}
            fill="none"
            stroke="currentColor"
            stroke-width={strokeWidth}
            stroke-linecap="square"
          />
        {:else if pattern === 'checkerboard'}
          <path
            d={`M 0 0 H ${half} V ${half} H 0 Z M ${half} ${half} H ${size} V ${size} H ${half} Z`}
            fill="currentColor"
          />
        {:else if pattern === 'cross'}
          <path
            d={`M ${half} ${quarter} V ${size - quarter} M ${quarter} ${half} H ${size - quarter}`}
            fill="none"
            stroke="currentColor"
            stroke-width={strokeWidth}
            stroke-linecap="square"
          />
        {:else if pattern === 'diamonds'}
          <path
            d={`M ${half} 0 L ${size} ${half} L ${half} ${size} L 0 ${half} Z`}
            fill="none"
            stroke="currentColor"
            stroke-width={strokeWidth}
          />
        {:else if pattern === 'hexagons'}
          {@const radius = size * 0.4}
          {@const x = radius * 0.866}
          <path
            d={`M ${half} ${half - radius} L ${half + x} ${half - radius * 0.5} L ${half + x} ${half + radius * 0.5} L ${half} ${half + radius} L ${half - x} ${half + radius * 0.5} L ${half - x} ${half - radius * 0.5} Z`}
            fill="none"
            stroke="currentColor"
            stroke-width={strokeWidth}
          />
        {:else if pattern === 'triangles'}
          {@const triangleHalfWidth = size * 0.22}
          {@const triangleHeight = triangleHalfWidth * Math.sqrt(3)}
          {@const firstRow = size * 0.45}
          {@const secondRow = size * 1.55}
          <path
            d={`M ${size * 0.75} ${firstRow - triangleHeight} L ${size * 0.75 + triangleHalfWidth} ${firstRow + triangleHeight} L ${size * 0.75 - triangleHalfWidth} ${firstRow + triangleHeight} Z M ${size * 1.75} ${firstRow - triangleHeight} L ${size * 1.75 + triangleHalfWidth} ${firstRow + triangleHeight} L ${size * 1.75 - triangleHalfWidth} ${firstRow + triangleHeight} Z`}
            fill="none"
            stroke="currentColor"
            stroke-width={strokeWidth}
          />
          <path
            d={`M ${size * 0.25 - triangleHalfWidth} ${secondRow - triangleHeight} L ${size * 0.25 + triangleHalfWidth} ${secondRow - triangleHeight} L ${size * 0.25} ${secondRow + triangleHeight} Z M ${size * 1.25 - triangleHalfWidth} ${secondRow - triangleHeight} L ${size * 1.25 + triangleHalfWidth} ${secondRow - triangleHeight} L ${size * 1.25} ${secondRow + triangleHeight} Z`}
            fill="none"
            stroke="currentColor"
            stroke-width={strokeWidth}
          />
        {:else if pattern === 'bricks'}
          <path
            d={`M 0 0 H ${tileWidth} M 0 ${half} H ${tileWidth} M ${size} 0 V ${half} M 0 ${half} V ${size}`}
            fill="none"
            stroke="currentColor"
            stroke-width={strokeWidth}
          />
        {:else if pattern === 'stars'}
          {@const outerRadius = size * 0.35}
          {@const innerRadius = size * 0.12}
          <path
            d={`M ${half} ${half - outerRadius} L ${half + innerRadius} ${half} L ${half} ${half + outerRadius} L ${half - innerRadius} ${half} Z M ${half - outerRadius} ${half} L ${half} ${half - innerRadius} L ${half + outerRadius} ${half} L ${half} ${half + innerRadius} Z`}
            fill="none"
            stroke="currentColor"
            stroke-width={strokeWidth}
          />
        {:else if pattern === 'truchet'}
          <path
            d={`M 0 ${half} A ${half} ${half} 0 0 1 ${half} 0 M ${half} ${size} A ${half} ${half} 0 0 1 ${size} ${half}`}
            fill="none"
            stroke="currentColor"
            stroke-width={strokeWidth}
          />
        {:else if pattern === 'isometric'}
          <path
            d={`M ${half} 0 L ${size} ${quarter} V ${size - quarter} L ${half} ${size} L 0 ${size - quarter} V ${quarter} Z M ${half} 0 V ${half} M 0 ${quarter} L ${half} ${half} L ${size} ${quarter}`}
            fill="none"
            stroke="currentColor"
            stroke-width={strokeWidth}
          />
        {/if}
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${patternId})`} />
  </svg>
</div>
