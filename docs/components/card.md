# Card Component - Style Mapping

## Card (Root)

```
rounded-base flex flex-col shadow-shadow border-2 gap-6 py-6 border-border
bg-background text-foreground font-base
data-slot="card"
```

## CardHeader

```
@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6
has-[data-slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6
data-slot="card-header"
```

## CardTitle

```
font-heading leading-none
data-slot="card-title"
```

## CardDescription

```
text-sm font-base
data-slot="card-description"
```

## CardAction

```
col-start-2 row-span-2 row-start-1 self-start justify-self-end
data-slot="card-action"
```

## CardContent

```
px-6
data-slot="card-content"
```

## CardFooter

```
flex items-center px-6 [.border-t]:pt-6
data-slot="card-footer"
```
