<script lang="ts">
  import { RangeCalendar as RangeCalendarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import * as Select from '$lib/registry/ui/select/index.ts';
  import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    value,
    onchange,
    ...restProps
  }: WithoutChildrenOrChild<RangeCalendarPrimitive.YearSelectProps> & {
    onchange?: (event: any) => void;
  } = $props();

  function handleSelectChange(newValue: string, bitsOnChange?: (event: any) => void) {
    const numericValue = Number(newValue);

    const event: any = {
      currentTarget: { value: numericValue },
      target: { value: numericValue },
    };

    bitsOnChange?.(event);
    onchange?.(event);
  }

  const getColors = getContext<() => { color: any; navColor: any; selectedColor: any }>('calendarColors');
  const colors = $derived(getColors?.());
</script>

<span class={cn('relative flex', className)}>
  <RangeCalendarPrimitive.YearSelect bind:ref {...restProps}>
    {#snippet child({
      props,
      yearItems,
      selectedYearItem
    }: {
      props: {
        name?: string;
        disabled?: boolean;
        onchange?: (event: any) => void;
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
          hoverColor={colors?.navColor ?? 'cyan'}
          name={props.name}
          disabled={props.disabled}
          value={String(value ?? selectedYearItem.value)}
          onValueChange={(val: string) => {
            handleSelectChange(val, props.onchange);
          }}
        >
          <Select.Trigger
            color={colors?.selectedColor ?? 'black'}
            class="flex h-8 items-center gap-1 pr-1 pl-2 text-sm font-medium select-none [&>svg]:size-3.5"
          >
            {#if yearItems && yearItems.length}
              {yearItems.find((item) => item.value === (value ?? selectedYearItem.value))?.label ??
                selectedYearItem.label}
            {/if}
          </Select.Trigger>

          <Select.Content color={colors?.selectedColor ?? 'black'}>
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
