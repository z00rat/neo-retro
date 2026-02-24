<script lang="ts">
  import { isEqualMonth, type DateValue } from '@internationalized/date';
  import { RangeCalendar as RangeCalendarPrimitive } from 'bits-ui';
  import { setContext, type Snippet } from 'svelte';

  import { colorMap, type ThemeColor } from '$lib/colors.js';
  import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

  import * as RangeCalendar from './index.js';

  let {
    ref = $bindable(null),
    value = $bindable(),
    placeholder = $bindable(),
    weekdayFormat = 'short',
    class: className,
    color,
    selectedColor,
    todayColor,
    captionLayout = 'label',
    locale = 'en-US',
    months: monthsProp,
    years,
    monthFormat: monthFormatProp,
    yearFormat = 'numeric',
    day,
    disableDaysOutsideMonth = false,
    ...restProps
  }: WithoutChildrenOrChild<RangeCalendarPrimitive.RootProps> & {
    color: ThemeColor;
    selectedColor: ThemeColor;
    todayColor: ThemeColor;
    captionLayout?: 'dropdown' | 'dropdown-months' | 'dropdown-years' | 'label';
    months?: RangeCalendarPrimitive.MonthSelectProps['months'];
    years?: RangeCalendarPrimitive.YearSelectProps['years'];
    monthFormat?: RangeCalendarPrimitive.MonthSelectProps['monthFormat'];
    yearFormat?: RangeCalendarPrimitive.YearSelectProps['yearFormat'];
    day?: Snippet<[{ day: DateValue; outsideMonth: boolean }]>;
  } = $props();

  setContext('calendarColors', () => ({
    color,
    selectedColor,
    todayColor,
    navColor: selectedColor,
  }));

  const monthFormat = $derived.by(() => {
    if (monthFormatProp) return monthFormatProp;
    if (captionLayout.startsWith('dropdown')) return 'short';
    return 'long';
  });
</script>

<RangeCalendarPrimitive.Root
  bind:ref
  bind:value
  bind:placeholder
  {weekdayFormat}
  {disableDaysOutsideMonth}
  class={cn(
    'group/calendar neoretro-shadow rounded-md neoretro-border bg-background p-3 [--cell-size:--spacing(8)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent [&_td]:border-none [&_th]:border-none [&_thead]:bg-transparent [&_tr:nth-child(even)]:bg-transparent',
    colorMap[color],
    className,
  )}
  {locale}
  {monthFormat}
  {yearFormat}
  {...restProps}
>
  {#snippet children({ months, weekdays })}
    <RangeCalendar.Months>
      <RangeCalendar.Nav>
        <RangeCalendar.PrevButton />
        <RangeCalendar.NextButton />
      </RangeCalendar.Nav>
      {#each months as month, monthIndex (month)}
        <RangeCalendar.Month>
          <RangeCalendar.Header>
            <RangeCalendar.Caption
              {captionLayout}
              months={monthsProp}
              {monthFormat}
              {years}
              {yearFormat}
              month={month.value}
              bind:placeholder
              {locale}
              {monthIndex}
            />
          </RangeCalendar.Header>

          <RangeCalendar.Grid>
            <RangeCalendar.GridHead>
              <RangeCalendar.GridRow class="select-none">
                {#each weekdays as weekday (weekday)}
                  <RangeCalendar.HeadCell>
                    {weekday.slice(0, 2)}
                  </RangeCalendar.HeadCell>
                {/each}
              </RangeCalendar.GridRow>
            </RangeCalendar.GridHead>
            <RangeCalendar.GridBody>
              {#each month.weeks as weekDates (weekDates)}
                <RangeCalendar.GridRow class="mt-2 w-full">
                  {#each weekDates as date (date)}
                    <RangeCalendar.Cell {date} month={month.value}>
                      {#if day}
                        {@render day({
                          day: date,
                          outsideMonth: !isEqualMonth(date, month.value),
                        })}
                      {:else}
                        <RangeCalendar.Day />
                      {/if}
                    </RangeCalendar.Cell>
                  {/each}
                </RangeCalendar.GridRow>
              {/each}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
        </RangeCalendar.Month>
      {/each}
    </RangeCalendar.Months>
  {/snippet}
</RangeCalendarPrimitive.Root>
