# Slider Component - Style Mapping

## Slider (Root)

```
relative flex w-full touch-none select-none items-center
data-[disabled]:opacity-50
data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44
data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col
data-slot="slider"
```

## SliderTrack

```
relative w-full grow overflow-hidden rounded-base bg-secondary-background border-2 border-border
data-[orientation=horizontal]:h-3 data-[orientation=horizontal]:w-full
data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3
data-slot="slider-track"
```

## SliderRange

```
absolute bg-main
data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full
data-slot="slider-range"
```

## SliderThumb

```
block h-5 w-5 rounded-full border-2 border-border bg-white ring-offset-white
transition-colors
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
disabled:pointer-events-none disabled:opacity-50
data-slot="slider-thumb"
```
