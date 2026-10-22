<script lang="ts">
  import * as Select from '#lib/registry/ui/select/index.ts';
  import { cn, type WithoutChildrenOrChild } from '#lib/utils.ts';
  import { RangeCalendar as RangeCalendarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  type YearSelectChangeEvent = {
    currentTarget: { value: number };
    target: { value: number };
  };

  let {
    ref = $bindable(null),
    class: className,
    value,
    onchange,
    ...restProps
  }: WithoutChildrenOrChild<RangeCalendarPrimitive.YearSelectProps> & {
    onchange?: (event: YearSelectChangeEvent) => void;
  } = $props();

  function handleSelectChange(newValue: string, bitsOnChange?: (event: YearSelectChangeEvent) => void) {
    const numericValue = Number(newValue);

    const event: YearSelectChangeEvent = {
      currentTarget: { value: numericValue },
      target: { value: numericValue },
    };

    bitsOnChange?.(event);
    onchange?.(event);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getColors = getContext<() => { color: any; navColor: any; selectedColor: any }>('calendarColors');
  const colors = $derived(getColors?.());
</script>

<span class={cn('relative flex', className)}>
  <RangeCalendarPrimitive.YearSelect bind:ref {...restProps}>
    {#snippet child({
      props,
      yearItems,
      selectedYearItem,
    }: {
      props: {
        name?: string;
        disabled?: boolean;
        onchange?: (event: YearSelectChangeEvent) => void;
      };
      yearItems: {
        value: number;
        label: string;
        disabled?: boolean;
      }[];
      selectedYearItem: {
        value: number;
        label: string;
        disabled?: boolean;
      };
    })}
      {#key value ?? selectedYearItem.value}
        <Select.Root
          type="single"
          color={colors.navColor}
          name={props.name}
          disabled={props.disabled}
          value={String(value ?? selectedYearItem.value)}
          onValueChange={(val: string) => {
            handleSelectChange(val, props.onchange);
          }}
        >
          <Select.Trigger class="h-8 gap-1 pr-1 pl-2 font-medium [&>svg]:size-4 flex items-center select-none">
            {#if yearItems && yearItems.length}
              {yearItems.find((item) => item.value === (value ?? selectedYearItem.value))?.label ??
                selectedYearItem.label}
            {/if}
          </Select.Trigger>

          <Select.Content>
            <Select.Group>
              {#each yearItems as yearItem (yearItem.value)}
                <Select.Item value={String(yearItem.value)} label={yearItem.label} disabled={yearItem.disabled}>
                  {yearItem.label}
                </Select.Item>
              {/each}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      {/key}
    {/snippet}
  </RangeCalendarPrimitive.YearSelect>
</span>
