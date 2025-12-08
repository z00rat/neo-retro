# NavigationMenu Component - Style Mapping

## NavigationMenu (Root)

```
relative z-10 flex max-w-max rounded-base font-heading border-border border-2 p-1
bg-main flex-1 items-center justify-center
data-slot="navigation-menu"
```

## NavigationMenuList

```
group flex flex-1 list-none items-center font-heading justify-center space-x-1
data-slot="navigation-menu-list"
```

## NavigationMenuItem

```
relative
data-slot="navigation-menu-item"
```

## NavigationMenuTrigger

```
group inline-flex h-10 w-max items-center justify-center text-main-foreground
rounded-base bg-main px-4 py-2 text-sm font-heading transition-colors
focus:outline-none disabled:pointer-events-none disabled:opacity-50
data-slot="navigation-menu-trigger"
```

## NavigationMenuTrigger Chevron Icon

```
relative top-[1px] ml-2 size-4 font-heading transition duration-200
group-data-[state=open]:rotate-180
```

## NavigationMenuContent

```
data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out
data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out
data-[motion=from-end]:slide-in-from-right-52
data-[motion=from-start]:slide-in-from-left-52
data-[motion=to-end]:slide-out-to-right-52
data-[motion=to-start]:slide-out-to-left-52
top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto
group-data-[viewport=false]/navigation-menu:bg-main
group-data-[viewport=false]/navigation-menu:text-main-foreground
group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in
group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out
group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95
group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95
group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0
group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0
group-data-[viewport=false]/navigation-menu:top-full
group-data-[viewport=false]/navigation-menu:mt-1.5
group-data-[viewport=false]/navigation-menu:overflow-hidden
group-data-[viewport=false]/navigation-menu:duration-200
**:data-[slot=navigation-menu-link]:focus:ring-0
**:data-[slot=navigation-menu-link]:focus:outline-none
data-slot="navigation-menu-content"
```

## NavigationMenuLink

```
block select-none space-y-1 rounded-base p-2 leading-none no-underline outline-none
transition-colors focus-visible:ring-4 focus-visible:outline-1
[&_svg:not([class*='size-'])]:size-4
data-slot="navigation-menu-link"
```

## NavigationMenuViewport Wrapper

```
absolute top-full left-0 isolate z-50 flex justify-center
```

## NavigationMenuViewport

```
origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)]
w-full overflow-hidden rounded-base border-2 border-border bg-main text-main-foreground
data-[state=open]:animate-in data-[state=closed]:animate-out
data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90
md:w-[var(--radix-navigation-menu-viewport-width)]
data-slot="navigation-menu-viewport"
```

## NavigationMenuIndicator

```
top-full z-[1] flex h-1.5 items-end font-heading justify-center overflow-hidden
data-[state=visible]:animate-in data-[state=hidden]:animate-out
data-[state=hidden]:fade-out data-[state=visible]:fade-in
data-slot="navigation-menu-indicator"
```

## NavigationMenuIndicator Inner Div

```
relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-white
```
