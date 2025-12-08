# Carousel Component - Style Mapping

## Carousel (Root)

```
relative
data-slot="carousel"
role="region" aria-roledescription="carousel"
```

## CarouselContent Wrapper

```
overflow-hidden
data-slot="carousel-content"
```

## CarouselContent

```
flex
```

### Horizontal Orientation

```
-ml-4
```

### Vertical Orientation

```
-mt-4 flex-col
```

## CarouselItem

```
min-w-0 shrink-0 grow-0 basis-full
data-slot="carousel-item"
role="group" aria-roledescription="slide"
```

### Horizontal Orientation

```
pl-4
```

### Vertical Orientation

```
pt-4
```

## CarouselPrevious

Uses Button component with `noShadow` variant, `icon` size, plus:

```
absolute size-8 rounded-base
data-slot="carousel-previous"
```

### Horizontal Orientation

```
top-1/2 -left-12 -translate-y-1/2
```

### Vertical Orientation

```
-top-12 left-1/2 -translate-x-1/2 rotate-90
```

## CarouselNext

Uses Button component with `noShadow` variant, `icon` size, plus:

```
absolute h-8 w-8 rounded-base
data-slot="carousel-next"
```

### Horizontal Orientation

```
-right-12 top-1/2 -translate-y-1/2
```

### Vertical Orientation

```
-bottom-12 left-1/2 -translate-x-1/2 rotate-90
```
