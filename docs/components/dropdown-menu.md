# DropdownMenu Component - Style Mapping

## DropdownMenuContent

```
z-50 min-w-[8rem] overflow-hidden rounded-base border-2 border-border bg-main p-1
font-base text-main-foreground
data-[state=open]:animate-in data-[state=closed]:animate-out
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
data-[side=bottom]:slide-in-from-top-2
data-[side=left]:slide-in-from-right-2
data-[side=right]:slide-in-from-left-2
data-[side=top]:slide-in-from-bottom-2
origin-(--radix-dropdown-menu-content-transform-origin)
data-slot="dropdown-menu-content"
```

## DropdownMenuItem

```
relative gap-2 [&_svg]:pointer-events-none [&_svg]:w-4 [&_svg]:h-4 [&_svg]:shrink-0
flex cursor-default select-none items-center rounded-base border-2 border-transparent
data-[inset=true]:pl-8 bg-main px-2 py-1.5 text-sm font-base outline-hidden
transition-colors focus:border-border
data-disabled:pointer-events-none data-disabled:opacity-50
data-slot="dropdown-menu-item"
```

## DropdownMenuSubTrigger

```
flex cursor-default select-none items-center rounded-base border-2 border-transparent
bg-main px-2 py-1.5 text-sm font-base outline-hidden focus:border-border gap-2
data-[inset=true]:pl-8
[&_svg]:pointer-events-none [&_svg]:w-4 [&_svg]:h-4 [&_svg]:shrink-0
data-slot="dropdown-menu-sub-trigger"
```

## DropdownMenuSubContent

```
z-50 min-w-[8rem] overflow-hidden rounded-base border-2 border-border bg-main p-1
font-base text-main-foreground
data-[state=open]:animate-in data-[state=closed]:animate-out
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
data-[side=bottom]:slide-in-from-top-2
data-[side=left]:slide-in-from-right-2
data-[side=right]:slide-in-from-left-2
data-[side=top]:slide-in-from-bottom-2
origin-(--radix-dropdown-menu-content-transform-origin)
```

## DropdownMenuCheckboxItem

```
relative flex cursor-default select-none items-center rounded-base border-2 border-transparent
gap-2 py-1.5 pl-8 pr-2 text-sm font-base text-main-foreground outline-hidden
transition-colors focus:border-border
data-disabled:pointer-events-none data-disabled:opacity-50
[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
```

## DropdownMenuRadioItem

```
relative flex cursor-default select-none items-center rounded-base border-2 border-transparent
gap-2 py-1.5 pl-8 pr-2 text-sm font-base outline-hidden transition-colors focus:border-border
data-disabled:pointer-events-none data-disabled:opacity-50
```

## DropdownMenuLabel

```
px-2 py-1.5 text-sm font-heading data-[inset]:pl-8
data-slot="dropdown-menu-label"
```

## DropdownMenuSeparator

```
-mx-1 my-1 h-0.5 bg-border
```

## DropdownMenuShortcut

```
ml-auto text-xs font-base tracking-widest
data-slot="dropdown-menu-shortcut"
```
