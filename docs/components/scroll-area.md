# ScrollArea Component - Style Mapping

## ScrollArea (Root)

```
relative overflow-hidden
data-slot="scroll-area"
```

## ScrollAreaViewport

```
h-full w-full font-base
```

## ScrollBar

```
flex touch-none select-none transition-colors
data-slot="scroll-area-scrollbar"
```

### Vertical Orientation

```
h-full w-2.5 border-l border-l-transparent p-[1px]
```

### Horizontal Orientation

```
h-2.5 flex-col border-t border-t-transparent p-[1px]
```

## ScrollAreaThumb

```
relative flex-1 rounded-full bg-border
```
