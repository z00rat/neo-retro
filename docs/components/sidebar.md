# Sidebar Component - Style Mapping

## SidebarWrapper

```
group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full
data-slot="sidebar-wrapper"
```

## Sidebar (Root - collapsible=none)

```
bg-secondary-background text-foreground flex h-full w-(--sidebar-width) flex-col
data-slot="sidebar"
```

## Sidebar (Root - Mobile)

Uses Sheet component with:

```
bg-secondary-background text-foreground w-(--sidebar-width) p-0 [&>button]:hidden
data-sidebar="sidebar" data-mobile="true"
```

## Sidebar (Root - Desktop Container)

```
group peer hidden md:block
data-state={state}
data-collapsible={state === "collapsed" ? collapsible : ""}
data-variant={variant}
data-side={side}
data-slot="sidebar"
```

## SidebarGap

```
relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear
group-data-[collapsible=offcanvas]:w-0
group-data-[side=right]:rotate-180
data-slot="sidebar-gap"
```

### Floating/Inset Variant

```
group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]
```

### Default Variant

```
group-data-[collapsible=icon]:w-(--sidebar-width-icon)
```

## SidebarContainer

```
fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width)
transition-[left,right,width] duration-200 ease-linear md:flex
data-slot="sidebar-container"
```

### Left Side

```
left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]
```

### Right Side

```
right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]
```

### Floating/Inset Variant

```
p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]
```

### Default Variant

```
group-data-[collapsible=icon]:w-(--sidebar-width-icon)
group-data-[side=left]:border-r-2 border-r-border
group-data-[side=right]:border-l-2 border-l-border
```

## SidebarInner

```
bg-secondary-background flex h-full w-full flex-col
data-sidebar="sidebar"
data-slot="sidebar-inner"
```

## SidebarTrigger

Uses Button component with `noShadow` variant, `icon` size, plus:

```
size-7
data-sidebar="trigger"
data-slot="sidebar-trigger"
```

## SidebarRail

```
absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear
group-data-[side=left]:-right-4 group-data-[side=right]:left-0
after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex
in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize
[[data-side=left][data-state=collapsed]_&]:cursor-e-resize
[[data-side=right][data-state=collapsed]_&]:cursor-w-resize
hover:group-data-[collapsible=offcanvas]:bg-sidebar
group-data-[collapsible=offcanvas]:translate-x-0
group-data-[collapsible=offcanvas]:after:left-full
[[data-side=left][data-collapsible=offcanvas]_&]:-right-2
[[data-side=right][data-collapsible=offcanvas]_&]:-left-2
data-sidebar="rail"
data-slot="sidebar-rail"
```

## SidebarInset

```
bg-secondary-background relative flex w-full flex-1 flex-col
md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0
md:peer-data-[variant=inset]:rounded-base md:peer-data-[variant=inset]:shadow-sm
md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2
data-slot="sidebar-inset"
```

## SidebarInput

Uses Input component, plus:

```
bg-secondary-background h-8 w-full shadow-none
data-slot="sidebar-input"
data-sidebar="input"
```

## SidebarHeader

```
flex flex-col gap-2 p-2 border-b-2 border-b-border
data-slot="sidebar-header"
data-sidebar="header"
```

## SidebarFooter

```
flex flex-col gap-2 p-2 border-t-2 border-t-border
data-slot="sidebar-footer"
data-sidebar="footer"
```

## SidebarContent

```
flex min-h-0 flex-1 flex-col overflow-auto
group-data-[collapsible=icon]:overflow-hidden
data-slot="sidebar-content"
data-sidebar="content"
```

## SidebarGroup

```
relative flex w-full min-w-0 flex-col p-2 border-b-2 border-b-border last:border-b-0
data-slot="sidebar-group"
data-sidebar="group"
```

## SidebarGroupLabel

```
text-foreground ring-ring flex h-8 shrink-0 items-center rounded-base px-2 text-sm
font-heading outline-hidden transition-[margin,opacity] duration-200 ease-linear
focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0
group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0
data-slot="sidebar-group-label"
data-sidebar="group-label"
```

## SidebarGroupAction

```
absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center
rounded-base p-0 outline-hidden transition-transform focus-visible:ring-2
[&>svg]:size-4 [&>svg]:shrink-0
after:absolute after:-inset-2 md:after:hidden
group-data-[collapsible=icon]:hidden
data-slot="sidebar-group-action"
data-sidebar="group-action"
```

## SidebarGroupContent

```
w-full text-sm
data-slot="sidebar-group-content"
data-sidebar="group-content"
```

## SidebarMenu

```
flex w-full min-w-0 flex-col gap-1
data-slot="sidebar-menu"
data-sidebar="menu"
```

## SidebarMenuItem

```
group/menu-item relative font-base
data-slot="sidebar-menu-item"
data-sidebar="menu-item"
```

## SidebarMenuButton (Base)

```
peer/menu-button flex w-full items-center gap-2 overflow-hidden outline-2 outline-transparent
rounded-base p-2 text-left text-sm ring-ring transition-[width,height,padding]
hover:bg-main hover:text-main-foreground hover:outline-border
focus-visible:outline-border focus-visible:text-main-foreground focus-visible:bg-main
disabled:pointer-events-none disabled:opacity-50
group-has-data-[sidebar=menu-action]/menu-item:pr-8
aria-disabled:pointer-events-none aria-disabled:opacity-50
group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!
[&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0
data-slot="sidebar-menu-button"
data-sidebar="menu-button"
```

### Sizes

#### default

```
h-8 text-sm
```

#### sm

```
h-7 text-xs
```

#### lg

```
h-12 text-sm group-data-[collapsible=icon]:p-0!
```

## SidebarMenuAction

```
[&_svg]:text-foreground hover:[&_svg]:text-main-foreground text-main-foreground
hover:bg-main hover:outline-border outline-transparent outline-2
absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center
rounded-base p-0 transition-transform focus-visible:ring-2
[&>svg]:size-4 [&>svg]:shrink-0
after:absolute after:-inset-2 md:after:hidden
group-data-[collapsible=icon]:hidden
data-slot="sidebar-menu-action"
data-sidebar="menu-action"
```

## SidebarMenuBadge

```
text-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center
justify-center rounded-base px-1 text-xs font-base tabular-nums select-none
peer-hover/menu-button:text-main-foreground
peer-data-[size=sm]/menu-button:top-1
peer-data-[size=default]/menu-button:top-1.5
peer-data-[size=lg]/menu-button:top-2.5
group-data-[collapsible=icon]:hidden
data-slot="sidebar-menu-badge"
data-sidebar="menu-badge"
```

## SidebarMenuSkeleton

```
flex h-8 items-center gap-2 rounded-base px-2
data-slot="sidebar-menu-skeleton"
data-sidebar="menu-skeleton"
```

## SidebarMenuSub

```
border-l-foreground/50 mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l-2 px-2.5 py-0.5
group-data-[collapsible=icon]:hidden
data-slot="sidebar-menu-sub"
data-sidebar="menu-sub"
```

## SidebarMenuSubItem

```
group/menu-sub-item relative
data-slot="sidebar-menu-sub-item"
data-sidebar="menu-sub-item"
```

## SidebarMenuSubButton

```
text-foreground hover:bg-main hover:outline-border hover:text-main-foreground
active:bg-main outline-transparent outline-2 [&>svg]:text-main-foreground
flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-base px-2
focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50
aria-disabled:pointer-events-none aria-disabled:opacity-50
[&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0
data-[active=true]:bg-main data-[active=true]:outline-border
data-slot="sidebar-menu-sub-button"
data-sidebar="menu-sub-button"
```

### Sizes

#### sm

```
text-xs
```

#### md

```
text-sm
```
