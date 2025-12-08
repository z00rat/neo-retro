# Dialog Component - Style Mapping

## DialogOverlay

```
fixed inset-0 z-50 bg-overlay
data-[state=open]:animate-in data-[state=closed]:animate-out
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
data-slot="dialog-overlay"
```

## DialogContent

```
bg-background
data-[state=open]:animate-in data-[state=closed]:animate-out
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)]
translate-x-[-50%] translate-y-[-50%] gap-4
rounded-base border-2 border-border p-6 shadow-shadow duration-200 sm:max-w-lg
data-slot="dialog-content"
```

## DialogHeader

```
flex flex-col gap-2 text-center sm:text-left
data-slot="dialog-header"
```

## DialogFooter

```
flex flex-col-reverse gap-3 sm:flex-row sm:justify-end
data-slot="dialog-footer"
```

## DialogTitle

```
text-lg font-heading leading-none tracking-tight
data-slot="dialog-title"
```

## DialogDescription

```
text-sm font-base text-foreground
data-slot="dialog-description"
```

## DialogClose Button

```
absolute right-4 top-4 rounded-base opacity-100 ring-offset-white
focus:outline-hidden focus:ring-2 focus:ring-black focus:ring-offset-2
disabled:pointer-events-none
[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
```
