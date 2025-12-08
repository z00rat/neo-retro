# Calendar Component - Style Mapping

## Calendar (Root)

```
rounded-base! border-2 border-border bg-main p-3 font-heading shadow-shadow
```

## Calendar Months

```
flex flex-col sm:flex-row gap-2
```

## Calendar Month

```
flex flex-col gap-4
```

## Calendar Caption

```
flex justify-center pt-1 relative items-center w-full text-main-foreground
```

## Calendar Caption Label

```
text-sm font-heading
```

## Calendar Nav

```
gap-1 flex items-center
```

## Calendar Nav Button

Uses Button component with `noShadow` variant, plus:

```
size-7 bg-transparent p-0
```

## Calendar Nav Button Previous

```
absolute left-1
```

## Calendar Nav Button Next

```
absolute right-1
```

## Calendar Table

```
w-full border-collapse space-y-1
```

## Calendar Head Row

```
flex
```

## Calendar Head Cell

```
text-main-foreground rounded-base w-9 font-base text-[0.8rem]
```

## Calendar Row

```
flex w-full mt-2
```

## Calendar Cell

```
relative p-0 text-center text-sm focus-within:relative focus-within:z-20
[&:has([aria-selected])]:bg-black/50 [&:has([aria-selected])]:text-white!
[&:has([aria-selected].day-range-end)]:rounded-r-base
```

### Range Mode

```
[&:has(>.day-range-end)]:rounded-r-base
[&:has(>.day-range-start)]:rounded-l-base
[&:has([aria-selected])]:bg-black/50!
first:[&:has([aria-selected])]:rounded-l-base
last:[&:has([aria-selected])]:rounded-r-base
```

### Single Mode

```
[&:has([aria-selected])]:rounded-base [&:has([aria-selected])]:bg-black/50
```

## Calendar Day

Uses Button component with `noShadow` variant, plus:

```
size-9 p-0 font-base aria-selected:opacity-100
```

## Calendar Day Range Start

```
day-range-start aria-selected:bg-black! aria-selected:text-white rounded-base
```

## Calendar Day Range End

```
day-range-end aria-selected:bg-black! aria-selected:text-white rounded-base
```

## Calendar Day Selected

```
bg-black! text-white! rounded-base
```

## Calendar Day Today

```
bg-secondary-background text-foreground!
```

## Calendar Day Outside

```
day-outside text-main-foreground opacity-50 aria-selected:bg-none
```

## Calendar Day Disabled

```
text-main-foreground opacity-50 rounded-base
```

## Calendar Day Range Middle

```
aria-selected:bg-black/50! aria-selected:text-white
```

## Calendar Day Hidden

```
invisible
```
