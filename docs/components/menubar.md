# Menubar Component - Style Mapping

## Menubar (Root)

```
flex h-11 items-center space-x-1 rounded-base border-2 border-border bg-main p-1 font-base
data-slot="menubar"
```

## MenubarTrigger

```
flex cursor-default select-none items-center text-main-foreground rounded-base px-3 py-1.5
text-sm border-2 border-transparent font-heading outline-none focus:border-border
data-[state=open]:border-border
data-slot="menubar-trigger"
```

## MenubarContent

```
z-50 min-w-[12rem] overflow-hidden rounded-base border-2 border-border bg-main p-1
text-main-foreground
data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
origin-(--radix-menubar-content-transform-origin)
data-slot="menubar-content"
```

## MenubarItem

```
relative flex cursor-default select-none items-center rounded-base border-2 border-transparent
px-2 py-1.5 text-sm font-base outline-hidden focus:border-border
data-disabled:pointer-events-none data-disabled:opacity-50 data-[inset]:pl-8
[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
data-slot="menubar-item"
```

## MenubarCheckboxItem

```
relative flex cursor-default select-none items-center rounded-base border-2 border-transparent
py-1.5 pl-8 pr-2 text-sm font-base outline-hidden focus:border-border
data-disabled:pointer-events-none data-disabled:opacity-50
[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
data-slot="menubar-checkbox-item"
```

## MenubarRadioItem

```
relative flex cursor-default select-none items-center rounded-base border-2 border-transparent
py-1.5 pl-8 pr-2 text-sm font-base outline-hidden focus:border-border
data-disabled:pointer-events-none data-disabled:opacity-50
[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
data-slot="menubar-radio-item"
```

## MenubarLabel

```
px-2 py-1.5 text-sm font-heading data-[inset]:pl-8
data-slot="menubar-label"
```

## MenubarSeparator

```
-mx-1 my-1 h-0.5 bg-border
data-slot="menubar-separator"
```

## MenubarShortcut

```
ml-auto text-xs tracking-widest text-main-foreground
data-slot="menubar-shortcut"
```

## MenubarSubTrigger

```
flex cursor-default select-none items-center rounded-base border-2 border-transparent
px-3 py-1.5 text-sm font-base outline-hidden focus:border-border
data-[state=open]:border-border data-[inset]:pl-8
data-slot="menubar-sub-trigger"
```

## MenubarSubContent

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
origin-(--radix-menubar-content-transform-origin)
data-slot="menubar-sub-content"
```
