# Drawer Component - Style Mapping

## DrawerOverlay

```
data-[state=open]:animate-in data-[state=closed]:animate-out
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
fixed inset-0 z-50 bg-overlay
data-slot="drawer-overlay"
```

## DrawerContent

```
bg-background group/drawer-content fixed z-50 flex h-auto flex-col
data-slot="drawer-content"
```

### Direction Variants

#### top

```
data-[vaul-drawer-direction=top]:inset-x-0
data-[vaul-drawer-direction=top]:top-0
data-[vaul-drawer-direction=top]:mb-24
data-[vaul-drawer-direction=top]:max-h-[80vh]
data-[vaul-drawer-direction=top]:rounded-b-base border-t-2 border-t-border
```

#### bottom

```
data-[vaul-drawer-direction=bottom]:inset-x-0
data-[vaul-drawer-direction=bottom]:bottom-0
data-[vaul-drawer-direction=bottom]:mt-24
data-[vaul-drawer-direction=bottom]:max-h-[80vh]
data-[vaul-drawer-direction=bottom]:rounded-t-base border-b-2 border-b-border
```

#### right

```
data-[vaul-drawer-direction=right]:inset-y-0
data-[vaul-drawer-direction=right]:right-0
data-[vaul-drawer-direction=right]:w-3/4
data-[vaul-drawer-direction=right]:sm:max-w-sm border-r-2 border-r-border
```

#### left

```
data-[vaul-drawer-direction=left]:inset-y-0
data-[vaul-drawer-direction=left]:left-0
data-[vaul-drawer-direction=left]:w-3/4
data-[vaul-drawer-direction=left]:sm:max-w-sm border-l-2 border-l-border
```

## DrawerHandle (inside content)

```
mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full
group-data-[vaul-drawer-direction=bottom]/drawer-content:block bg-current
```

## DrawerHeader

```
grid gap-1.5 p-4 text-center sm:text-left
data-slot="drawer-header"
```

## DrawerFooter

```
mt-auto flex flex-col gap-3 p-4
data-slot="drawer-footer"
```

## DrawerTitle

```
text-lg font-heading leading-none tracking-tight
data-slot="drawer-title"
```

## DrawerDescription

```
text-sm font-base text-foreground
data-slot="drawer-description"
```
