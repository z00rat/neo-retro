# Alert Component - Style Mapping

## Alert (Root)

```
relative w-full rounded-base border-2 border-border px-4 py-3 text-sm
grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr]
has-[>svg]:gap-x-3 gap-y-0.5 items-start
[&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current
shadow-shadow
data-slot="alert"
```

## Variants

### default

```
bg-main text-main-foreground
```

### destructive

```
bg-black text-white
```

## AlertTitle

```
col-start-2 line-clamp-1 min-h-4 font-heading tracking-tight
data-slot="alert-title"
```

## AlertDescription

```
col-start-2 grid justify-items-start gap-1 text-sm font-base [&_p]:leading-relaxed
data-slot="alert-description"
```
