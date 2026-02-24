<script lang="ts">
  import { Calendar as CalendarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import type { ThemeColor } from '$lib/colors.js';
  import * as Select from '$lib/registry/ui/select/index.ts';
  import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    value,
    onchange,
    ...restProps
  }: WithoutChildrenOrChild<CalendarPrimitive.MonthSelectProps> & {
    onchange?: (event: any) => void;
  } = $props();

  function handleSelectChange(newValue: string, bitsOnChange?: (event: any) => void) {
    const event: any = {
      currentTarget: { value: newValue },
      target: { value: newValue },
    };
    bitsOnChange?.(event);
    onchange?.(event);
  }

  const getColors =
    getContext<() => { color: ThemeColor; navColor: ThemeColor; selectedColor: ThemeColor }>('calendarColors');
  const colors = $derived(getColors?.());
</script>

<span class={cn('relative flex', className)}>
  <CalendarPrimitive.MonthSelect bind:ref {...restProps}>
    {#snippet child({ props, monthItems, selectedMonthItem }: {
      props: {
        name?: string;
        disabled?: boolean;
        onchange?: (event: any) => void;
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
          hoverColor={colors?.navColor ?? 'cyan'}
          name={props.name}
          disabled={props.disabled}
          value={String(value ?? selectedMonthItem.value)}
          onValueChange={(val: string) => {
            handleSelectChange(val, props.onchange);
          }}
        >
          <Select.Trigger
            color={colors?.selectedColor ?? 'black'}
            class="flex h-8 items-center gap-1 pr-1 pl-2 text-sm font-medium select-none [&>svg]:size-3.5"
          >
            {#if monthItems && monthItems.length}
              {monthItems.find((item) => item.value === (value ?? selectedMonthItem.value))?.label ??
                selectedMonthItem.label}
            {/if}
          </Select.Trigger>

          <Select.Content color={colors?.selectedColor ?? 'black'}>
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
