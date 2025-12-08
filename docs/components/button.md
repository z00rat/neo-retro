# Button Component - Style Mapping

## Base Styles (All Variants)

```
inline-flex items-center justify-center whitespace-nowrap rounded-base text-sm font-base
ring-offset-white transition-all gap-2
[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2
disabled:pointer-events-none disabled:opacity-50
```

## Variants

### default

```
text-main-foreground bg-main border-2 border-border shadow-shadow
hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none
```

### noShadow

```
text-main-foreground bg-main border-2 border-border
```

### neutral

```
bg-secondary-background text-foreground border-2 border-border shadow-shadow
hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none
```

## Sizes

### default

```
h-10 px-4 py-2
```

### sm

```
h-9 px-3
```

### lg

```
h-11 px-8
```

### icon

```
size-10
```

## Data Attribute

```
data-slot="button"
```
