<script lang="ts">
  import * as Select from '#lib/registry/ui/select/index.ts';
  import { cn, type WithoutChildrenOrChild } from '#lib/utils.ts';
  import { Calendar as CalendarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  type MonthSelectChangeEvent = {
    currentTarget: { value: string };
    target: { value: string };
  };

  let {
    ref = $bindable(null),
    class: className,
    value,
    onchange,
    ...restProps
  }: WithoutChildrenOrChild<CalendarPrimitive.MonthSelectProps> & {
    onchange?: (event: MonthSelectChangeEvent) => void;
  } = $props();

  function handleSelectChange(newValue: string, bitsOnChange?: (event: MonthSelectChangeEvent) => void) {
    const event: MonthSelectChangeEvent = {
      currentTarget: { value: newValue },
      target: { value: newValue },
    };
    bitsOnChange?.(event);
    onchange?.(event);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getColors = getContext<() => { color: any; navColor: any; selectedColor: any }>('calendarColors');
</script>

<span class={cn('relative flex', className)}>
  <CalendarPrimitive.MonthSelect bind:ref {...restProps}>
    {#snippet child({
      props,
      monthItems,
      selectedMonthItem,
    }: {
      props: {
        name?: string;
        disabled?: boolean;
        onchange?: (event: MonthSelectChangeEvent) => void;
      };
      monthItems: {
        value: number;
        label: string;
        disabled?: boolean;
      }[];
      selectedMonthItem: {
        value: number;
        label: string;
        disabled?: boolean;
      };
    })}
      {#key value ?? selectedMonthItem.value}
        <Select.Root
          type="single"
          color={getColors().navColor}
          name={props.name}
          disabled={props.disabled}
          value={String(value ?? selectedMonthItem.value)}
          onValueChange={(val: string) => {
            handleSelectChange(val, props.onchange);
          }}
        >
          <Select.Trigger class="h-8 gap-1 pr-1 pl-2 font-medium [&>svg]:size-4 flex items-center select-none">
            {#if monthItems && monthItems.length}
              {monthItems.find((item) => item.value === (value ?? selectedMonthItem.value))?.label ??
                selectedMonthItem.label}
            {/if}
          </Select.Trigger>

          <Select.Content>
            <Select.Group>
              {#each monthItems as monthItem (monthItem.value)}
                <Select.Item value={String(monthItem.value)} label={monthItem.label} disabled={monthItem.disabled}>
                  {monthItem.label}
                </Select.Item>
              {/each}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      {/key}
    {/snippet}
  </CalendarPrimitive.MonthSelect>
</span>
