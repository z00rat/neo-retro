# Progress Component - Style Mapping

## Progress (Root)

```
relative h-4 w-full overflow-hidden rounded-base border-2 border-border bg-secondary-background
data-slot="progress"
```

## ProgressIndicator

```
h-full w-full flex-1 border-r-2 border-border bg-main transition-all
data-slot="progress-indicator"
```

Note: Uses inline style for transform: `translateX(-${100 - (value || 0)}%)`
