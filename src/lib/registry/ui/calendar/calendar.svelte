<script lang="ts">
  import { isEqualMonth, type DateValue } from '@internationalized/date';
  import { Calendar as CalendarPrimitive } from 'bits-ui';
  import { setContext, type Snippet } from 'svelte';

  import { cn, type Color, type WithoutChildrenOrChild } from '$lib/utils.ts';

  import * as Calendar from './index.ts';

  let {
    ref = $bindable(null),
    value = $bindable(),
    placeholder = $bindable(),
    class: className,
    weekdayFormat = 'short',
    color,
    selectedColor,
    captionLayout = 'label',
    locale = 'en-US',
    months: monthsProp,
    years,
    monthFormat: monthFormatProp,
    yearFormat = 'numeric',
    day,
    disableDaysOutsideMonth = false,
    ...restProps
  }: WithoutChildrenOrChild<CalendarPrimitive.RootProps> & {
    color: Color;
    selectedColor: Color;
    captionLayout?: 'dropdown' | 'dropdown-months' | 'dropdown-years' | 'label';
    months?: CalendarPrimitive.MonthSelectProps['months'];
    years?: CalendarPrimitive.YearSelectProps['years'];
    monthFormat?: CalendarPrimitive.MonthSelectProps['monthFormat'];
    yearFormat?: CalendarPrimitive.YearSelectProps['yearFormat'];
    day?: Snippet<[{ day: DateValue; outsideMonth: boolean }]>;
  } = $props();

  setContext('calendarColors', () => ({
    color,
    selectedColor,
    navColor: selectedColor,
  }));

  const monthFormat = $derived.by(() => {
    if (monthFormatProp) return monthFormatProp;
    if (captionLayout.startsWith('dropdown')) return 'short';
    return 'long';
  });
</script>

<CalendarPrimitive.Root
  bind:value={value as never}
  bind:ref
  bind:placeholder
  {weekdayFormat}
  {disableDaysOutsideMonth}
  data-color={color}
  class={cn(
    'group/calendar neoretro-shadow rounded neoretro-border neoretro-clr p-3 [--cell-size:--spacing(8)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent [&_td]:border-none [&_th]:border-none [&_thead]:bg-transparent [&_tr:nth-child(even)]:bg-transparent',
    className,
  )}
  {locale}
  {monthFormat}
  {yearFormat}
  {...restProps}
>
  {#snippet children({ months, weekdays })}
    <Calendar.Months>
      <Calendar.Nav>
        <Calendar.PrevButton />
        <Calendar.NextButton />
      </Calendar.Nav>
      {#each months as month, monthIndex (month)}
        <Calendar.Month>
          <Calendar.Header>
            <Calendar.Caption
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
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHead>
              <Calendar.GridRow class="select-none">
                {#each weekdays as weekday (weekday)}
                  <Calendar.HeadCell>
                    {weekday.slice(0, 2)}
                  </Calendar.HeadCell>
                {/each}
              </Calendar.GridRow>
            </Calendar.GridHead>
            <Calendar.GridBody>
              {#each month.weeks as weekDates (weekDates)}
                <Calendar.GridRow class="mt-2 w-full">
                  {#each weekDates as date (date)}
                    <Calendar.Cell {date} month={month.value}>
                      {#if day}
                        {@render day({
                          day: date,
                          outsideMonth: !isEqualMonth(date, month.value),
                        })}
                      {:else}
                        <Calendar.Day />
                      {/if}
                    </Calendar.Cell>
                  {/each}
                </Calendar.GridRow>
              {/each}
            </Calendar.GridBody>
          </Calendar.Grid>
        </Calendar.Month>
      {/each}
    </Calendar.Months>
  {/snippet}
</CalendarPrimitive.Root>
