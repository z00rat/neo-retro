<script lang="ts">
  import { cn, type Color, type WithElementRef, type WithoutChildren } from '#lib/utils.js';
  import { getChartContext, Tooltip as TooltipPrimitive } from 'layerchart';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import { getPayloadConfigFromPayload, useChart, type TooltipPayload } from './chart-utils.js';

  function defaultFormatter(value: unknown) {
    return String(value);
  }

  let {
    ref = $bindable(null),
    class: className,
    hideLabel = false,
    indicator = 'dot',
    hideIndicator = false,
    labelKey,
    dataLabelKey,
    label,
    labelFormatter = defaultFormatter,
    labelClassName,
    formatter,
    nameKey,
    color,
    ...restProps
  }: WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> & {
    hideLabel?: boolean;
    label?: string;
    indicator?: 'line' | 'dot' | 'dashed';
    nameKey?: string;
    labelKey?: string;
    dataLabelKey?: string;
    hideIndicator?: boolean;
    labelClassName?: string;
    color: Color;
    labelFormatter?:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((value: any, payload: TooltipPayload[]) => string | number | Snippet) | null;
    formatter?: Snippet<
      [
        {
          value: unknown;
          name: string;
          item: TooltipPayload;
          index: number;
          payload: TooltipPayload[];
        },
      ]
    >;
  } = $props();

  const chart = useChart();
  const tooltipCtx = getChartContext().tooltip;

  const formattedLabel = $derived.by(() => {
    if (hideLabel || !tooltipCtx.data || !tooltipCtx.series.length) return null;

    const [item] = tooltipCtx.series;
    const key = labelKey ?? item?.key ?? item?.label ?? 'value';

    const itemConfig = getPayloadConfigFromPayload(chart.config, item, key);

    const dataLabel =
      dataLabelKey && tooltipCtx.data && typeof tooltipCtx.data === 'object'
        ? (tooltipCtx.data as Record<string, unknown>)[dataLabelKey]
        : undefined;
    const value =
      dataLabel ??
      (!labelKey && typeof label === 'string'
        ? (chart.config[label as keyof typeof chart.config]?.label ?? label)
        : (itemConfig?.label ?? item.label));

    if (value === undefined) return null;
    if (!labelFormatter) return value;
    return labelFormatter(value, tooltipCtx.series);
  });

  const nestLabel = $derived(tooltipCtx.series.length === 1 && indicator !== 'dot');
</script>

{#snippet TooltipLabel()}
  {#if formattedLabel}
    <div class={cn('font-medium', labelClassName)}>
      {#if typeof formattedLabel === 'function'}
        {@render formattedLabel()}
      {:else}
        {formattedLabel}
      {/if}
    </div>
  {/if}
{/snippet}

<TooltipPrimitive.Root variant="none">
  <div
    bind:this={ref}
    class={cn(
      'neoretro-border neoretro-shadow neoretro-clr gap-1.5 rounded-sm px-2.5 py-1.5 text-xs min-w-36 grid items-start',
      className,
    )}
    data-color={color}
    {...restProps}
  >
    {#if !nestLabel}
      {@render TooltipLabel()}
    {/if}
    <div class="gap-1.5 grid">
      {#each tooltipCtx.series as item, i (item.key + i)}
        {@const key = `${nameKey || item.key || 'value'}`}
        {@const itemConfig = getPayloadConfigFromPayload(chart.config, item, key)}
        {@const indicatorColor = item.color}
        <div
          class={cn(
            '[&>svg]:text-foreground gap-2 [&>svg]:size-2.5 flex w-full flex-wrap items-stretch',
            indicator === 'dot' && 'items-center',
          )}
        >
          {#if formatter && item.value !== undefined && item.label}
            {@render formatter({
              value: item.value,
              name: item.label,
              item,
              index: i,
              payload: tooltipCtx.series,
            })}
          {:else}
            {#if itemConfig?.icon}
              <itemConfig.icon />
            {:else if !hideIndicator}
              <div
                style:background-color={indicator === 'dashed' ? 'transparent' : indicatorColor}
                style:border-color={indicatorColor}
                class={cn('rounded-xs shrink-0 border', {
                  'size-2.5': indicator === 'dot',
                  'w-1 h-full': indicator === 'line',
                  'w-0 border-[1.5px] border-dashed': indicator === 'dashed',
                  'my-0.5': nestLabel && indicator === 'dashed',
                })}
              ></div>
            {/if}
            <div
              class={cn(
                'gap-4 flex flex-1 shrink-0 justify-between leading-none',
                nestLabel ? 'items-end' : 'items-center',
              )}
            >
              <div class="gap-1.5 grid">
                {#if nestLabel}
                  {@render TooltipLabel()}
                {/if}
                <span class="text-on-clr">
                  {itemConfig?.label || item.label}
                </span>
              </div>
              {#if item.value !== undefined}
                <span class="text-on-clr font-mono font-medium whitespace-nowrap tabular-nums">
                  {item.value.toLocaleString()}
                </span>
              {/if}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</TooltipPrimitive.Root>
