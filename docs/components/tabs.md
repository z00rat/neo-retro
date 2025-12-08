# Tabs Component - Style Mapping

## Tabs (Root)

```
w-full
data-slot="tabs"
```

## TabsList

```
inline-flex h-12 items-center justify-center rounded-base border-2 border-border
bg-background p-1 text-foreground
data-slot="tabs-list"
```

## TabsTrigger

```
inline-flex items-center justify-center whitespace-nowrap rounded-base
border-2 border-transparent px-2 py-1 gap-1.5 text-sm font-heading
ring-offset-white transition-all
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
disabled:pointer-events-none disabled:opacity-50
data-[state=active]:bg-main data-[state=active]:text-main-foreground data-[state=active]:border-border
data-slot="tabs-trigger"
```

## TabsContent

```
mt-2 ring-offset-white
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
data-slot="tabs-content"
```
