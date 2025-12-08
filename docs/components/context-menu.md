# ContextMenu Component - Style Mapping

## ContextMenuContent

```
z-50 min-w-[8rem] overflow-hidden rounded-base border-2 border-border bg-main p-1
font-base text-main-foreground shadow-md animate-in fade-in-80
data-[state=open]:animate-in data-[state=closed]:animate-out
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
data-[side=bottom]:slide-in-from-top-2
data-[side=left]:slide-in-from-right-2
data-[side=right]:slide-in-from-left-2
data-[side=top]:slide-in-from-bottom-2
origin-(--radix-context-menu-content-transform-origin)
data-slot="context-menu-content"
```

## ContextMenuItem

```
relative flex cursor-default select-none items-center rounded-base border-2 border-transparent
px-2 py-1.5 gap-2 text-sm outline-none focus:border-border
data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8
[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
data-slot="context-menu-item"
```

## ContextMenuSubTrigger

```
flex cursor-default select-none items-center rounded-base border-2 border-transparent
bg-main px-2 py-1.5 text-sm font-base text-main-foreground outline-hidden
data-[inset]:pl-8
[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
focus:border-border data-[state=open]:border-border
data-slot="context-menu-sub-trigger"
```

## ContextMenuSubContent

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
origin-(--radix-context-menu-content-transform-origin)
data-slot="context-menu-sub-content"
```

## ContextMenuCheckboxItem

```
relative flex cursor-default select-none items-center rounded-base border-2 border-transparent
py-1.5 pl-8 pr-2 gap-2 text-sm font-base text-main-foreground outline-hidden
focus:border-border data-disabled:pointer-events-none data-disabled:opacity-50
data-slot="context-menu-checkbox-item"
```

## ContextMenuRadioItem

```
relative flex cursor-default select-none items-center rounded-base border-2 border-transparent
py-1.5 pl-8 pr-2 gap-2 text-sm font-base text-main-foreground outline-hidden
focus:border-border data-disabled:pointer-events-none data-disabled:opacity-50
data-slot="context-menu-radio-item"
```

## ContextMenuLabel

```
px-2 py-1.5 text-sm font-base border-2 border-transparent text-main-foreground
data-[inset]:pl-8
data-slot="context-menu-label"
```

## ContextMenuSeparator

```
-mx-1 my-1 h-0.5 bg-border
data-slot="context-menu-separator"
```

## ContextMenuShortcut

```
ml-auto text-xs font-base tracking-widest text-main-foreground
```
