# Select Component - Style Mapping

## SelectTrigger

```
flex h-10 w-full items-center justify-between rounded-base border-2 border-border
bg-main gap-2 px-3 py-2 text-sm font-base text-main-foreground
ring-offset-white placeholder:text-foreground/50
focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2
focus:outline-hidden focus:ring-2 focus:ring-black focus:ring-offset-2
disabled:cursor-not-allowed disabled:opacity-50
[&>span]:line-clamp-1
*:data-[slot=select-value]:line-clamp-1
*:data-[slot=select-value]:flex
*:data-[slot=select-value]:items-center
*:data-[slot=select-value]:gap-2
[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
data-slot="select-trigger"
```

## SelectContent

```
relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-base border-2 border-border
bg-main text-main-foreground
data-[state=open]:animate-in data-[state=closed]:animate-out
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
data-[side=bottom]:slide-in-from-top-2
data-[side=left]:slide-in-from-right-2
data-[side=right]:slide-in-from-left-2
data-[side=top]:slide-in-from-bottom-2
origin-(--radix-select-content-transform-origin)
data-slot="select-content"
```

## SelectLabel

```
border-2 border-transparent py-1.5 pr-8 pl-2 text-sm font-base text-main-foreground/80
data-slot="select-label"
```

## SelectItem

```
relative flex w-full cursor-default select-none items-center gap-2 rounded-base
py-1.5 pr-8 pl-2 text-sm border-2 border-transparent font-base outline-none
focus:border-border
data-[disabled]:pointer-events-none data-[disabled]:opacity-50
[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2
data-slot="select-item"
```

## SelectSeparator

```
-mx-1 my-1 h-px bg-border
data-slot="select-separator"
```

## SelectScrollUpButton / SelectScrollDownButton

```
flex cursor-default text-main-foreground font-base items-center justify-center py-1
data-slot="select-scroll-up" / data-slot="select-scroll-down"
```
