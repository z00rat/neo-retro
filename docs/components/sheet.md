# Sheet Component - Style Mapping

## SheetOverlay

```
data-[state=open]:animate-in data-[state=closed]:animate-out
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
fixed inset-0 z-50 bg-overlay
data-slot="sheet-overlay"
```

## SheetContent

```
bg-background
data-[state=open]:animate-in data-[state=closed]:animate-out
fixed z-50 flex flex-col gap-4 border-2 border-border
transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500
data-slot="sheet-content"
```

### Side Variants

#### right

```
data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right
inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm
```

#### left

```
data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left
inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm
```

#### top

```
data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top
inset-x-0 top-0 h-auto border-b
```

#### bottom

```
data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom
inset-x-0 bottom-0 h-auto border-t
```

## SheetHeader

```
flex flex-col gap-1.5 p-4
data-slot="sheet-header"
```

## SheetFooter

```
mt-auto flex flex-col gap-3 p-4
data-slot="sheet-footer"
```

## SheetTitle

```
text-foreground font-heading
data-slot="sheet-title"
```

## SheetDescription

```
text-sm text-foreground font-base
data-slot="sheet-description"
```

## SheetClose Button

```
absolute right-4 top-4 rounded-base ring-offset-white
focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
disabled:pointer-events-none
```
