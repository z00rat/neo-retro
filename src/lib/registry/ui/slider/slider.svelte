<script lang="ts">
  import { Slider as SliderPrimitive } from 'bits-ui';

  import { colorMap, type ThemeColor } from '$lib/colors.js';
  import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    value = $bindable([0]),
    type = 'multiple',
    orientation = 'horizontal',
    noShadow = false,
    color = 'black',
    class: className,
    onValueChange,
    onValueCommit,
    ...restProps
  }: Omit<WithoutChildrenOrChild<SliderPrimitive.RootProps>, 'value' | 'type' | 'onValueChange' | 'onValueCommit'> & {
    value?: number[];
    type?: 'multiple';
    onValueChange?: (value: number[]) => void;
    onValueCommit?: (value: number[]) => void;
    noShadow?: boolean;
    color?: ThemeColor;
  } = $props();
</script>

<SliderPrimitive.Root
  bind:ref
  bind:value={value as any}
  data-slot="slider"
  {orientation}
  {type}
  {onValueChange}
  {onValueCommit}
  class={cn(
    'relative flex w-full touch-none items-center rounded select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
    className,
  )}
  {...restProps}
>
  {#snippet children({ thumbs })}
    <span
      data-orientation={orientation}
      data-slot="slider-track"
      class={cn(
        'relative z-10 w-full grow overflow-hidden rounded neoretro-border bg-background data-[orientation=horizontal]:h-3 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3',
        noShadow ? '' : 'neoretro-shadow',
      )}
    >
      <SliderPrimitive.Range
        data-slot="slider-range"
        class={cn(
          'absolute rounded data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
          colorMap[color].split(' ')[0], // Automatically use the matching bg-color from colorMap
        )}
      />
    </span>

    {#each thumbs as thumb (thumb)}
      <!-- Child snippet lets us map the properties natively while cloning position for the z-0 shadow -->
      <SliderPrimitive.Thumb index={thumb}>
        {#snippet child({ props })}
          {#if !noShadow}
            <!-- Ghost shadow under the Z-10 track -->
            <div
              class="pointer-events-none absolute z-0 block h-5 w-5 neoretro-shadow rounded outline-hidden"
              style={props.style as string}
            ></div>
          {/if}

          <!-- Actual interactive thumb on top of the Z-10 track -->
          <span
            {...props}
            data-slot="slider-thumb"
            class="neoretro-focus absolute z-20 block h-5 w-5 rounded neoretro-border border-2 bg-background transition-colors data-disabled:neoretro-disable data-disabled:cursor-not-allowed"
          ></span>
        {/snippet}
      </SliderPrimitive.Thumb>
    {/each}
  {/snippet}
</SliderPrimitive.Root>
