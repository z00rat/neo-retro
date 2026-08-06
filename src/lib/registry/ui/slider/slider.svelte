<script lang="ts">
  import { Slider as SliderPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';

  import { cn, type Color, type WithoutChildrenOrChild } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    value = $bindable([0]),
    type = 'multiple',
    orientation = 'horizontal',
    noShadow = false,
    color,
    buffered = undefined,
    max = 100,
    min = 0,
    step = 1,
    class: className,
    onValueChange,
    onValueCommit,
    children,
    ...restProps
  }: Omit<
    WithoutChildrenOrChild<SliderPrimitive.RootProps>,
    'value' | 'type' | 'onValueChange' | 'onValueCommit' | 'max' | 'min' | 'step'
  > & {
    value?: number[];
    type?: 'multiple';
    onValueChange?: (value: number[]) => void;
    onValueCommit?: (value: number[]) => void;
    noShadow?: boolean;
    color: Color;
    buffered?: number;
    max?: number;
    min?: number;
    step?: number;
    children?: Snippet<[number]>;
  } = $props();

  let isHovering = $state(false);
  let hoverPercent = $state(0);
  let hoverValue = $derived(min + (hoverPercent / 100) * (max - min));

  function handlePointerMove(e: PointerEvent) {
    const target = e.currentTarget as HTMLElement;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    hoverPercent = pct;
    isHovering = true;
  }

  function handlePointerLeave() {
    isHovering = false;
  }
</script>

<SliderPrimitive.Root
  bind:ref
  bind:value={value as never}
  data-slot="slider"
  {orientation}
  {type}
  {max}
  {min}
  {step}
  {onValueChange}
  {onValueCommit}
  onpointermove={handlePointerMove}
  onpointerleave={handlePointerLeave}
  class={cn(
    'peer data-disabled:neoretro-disable rounded data-[orientation=vertical]:min-h-44 relative flex w-full cursor-pointer touch-none items-center select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
    className,
  )}
  children={sliderContent}
  {...restProps}
/>

{#snippet sliderContent({ thumbItems: thumbs }: { thumbItems: { index: number }[] })}
  <span
    data-orientation={orientation}
    data-slot="slider-track"
    class={cn(
      'rounded neoretro-border bg-background data-[orientation=horizontal]:h-3 data-[orientation=vertical]:w-3 relative z-10 w-full grow overflow-hidden data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full',
      noShadow ? '' : 'neoretro-shadow',
    )}
  >
    {#if buffered !== undefined}
      <div
        data-slot="slider-buffered"
        data-color={color}
        data-orientation={orientation}
        class="neoretro-clr left-0 bottom-0 data-[orientation=horizontal]:top-0 absolute opacity-30 data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
        style={orientation === 'horizontal'
          ? `width: ${Math.max(0, Math.min(100, buffered))}%`
          : `height: ${Math.max(0, Math.min(100, buffered))}%`}
      ></div>
    {/if}
    <SliderPrimitive.Range
      data-slot="slider-range"
      data-color={color}
      class="neoretro-clr absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
    />
  </span>

  {#each thumbs as thumb (thumb.index)}
    <!-- Child snippet lets us map the properties natively while cloning position for the z-0 shadow -->
    <SliderPrimitive.Thumb index={thumb.index}>
      {#snippet child({ props })}
        {#if !noShadow}
          <!-- Ghost shadow under the Z-10 track -->
          <div
            class="h-5 w-5 neoretro-shadow rounded pointer-events-none absolute z-0 block outline-hidden"
            style={props.style as string}
          ></div>
        {/if}

        <!-- Actual interactive thumb on top of the Z-10 track -->
        <span
          {...props}
          data-slot="slider-thumb"
          data-color={color}
          class="neoretro-focus h-5 w-5 rounded neoretro-border neoretro-clr absolute z-20 block border-2"
        ></span>
      {/snippet}
    </SliderPrimitive.Thumb>
  {/each}

  {#if isHovering && children}
    <div
      class="mb-2 gap-1.5 pointer-events-none absolute bottom-full z-30 flex -translate-x-1/2 flex-col items-center"
      style="left: {hoverPercent}%"
    >
      <div class="bg-background text-foreground text-xs font-mono px-2 py-1 rounded neoretro-border neoretro-shadow">
        {@render children(hoverValue)}
      </div>
    </div>
  {/if}
{/snippet}
