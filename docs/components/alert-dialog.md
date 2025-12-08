# AlertDialog Component - Style Mapping

## AlertDialogOverlay

```
fixed inset-0 z-50 bg-overlay
data-[state=open]:animate-in data-[state=closed]:animate-out
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
data-slot="alert-dialog-overlay"
```

## AlertDialogContent

```
bg-background
data-[state=open]:animate-in data-[state=closed]:animate-out
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)]
translate-x-[-50%] translate-y-[-50%] gap-4
rounded-base border-2 border-border p-6 shadow-shadow duration-200 sm:max-w-lg
data-slot="alert-dialog-content"
```

## AlertDialogHeader

```
flex flex-col gap-2 text-center sm:text-left
data-slot="alert-dialog-header"
```

## AlertDialogFooter

```
flex flex-col-reverse gap-3 sm:flex-row sm:justify-end
data-slot="alert-dialog-footer"
```

## AlertDialogTitle

```
text-lg font-heading
data-slot="alert-dialog-title"
```

## AlertDialogDescription

```
text-sm font-base text-foreground
data-slot="alert-dialog-description"
```

## AlertDialogAction

Uses Button component with default variant

## AlertDialogCancel

Uses Button component with neutral variant
