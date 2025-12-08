# Resizable Component - Style Mapping

## ResizablePanelGroup

```
flex h-full w-full font-base data-[panel-group-direction=vertical]:flex-col
data-slot="resizable-panel-group"
```

## ResizablePanel

```
data-slot="resizable-panel"
```

## ResizableHandle

```
relative flex w-0.5 items-center justify-center bg-border
after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2
focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black
focus-visible:ring-offset-1
data-[panel-group-direction=vertical]:h-0.5
data-[panel-group-direction=vertical]:w-full
data-[panel-group-direction=vertical]:after:left-0
data-[panel-group-direction=vertical]:after:h-1
data-[panel-group-direction=vertical]:after:w-full
data-[panel-group-direction=vertical]:after:-translate-y-1/2
data-[panel-group-direction=vertical]:after:translate-x-0
[&[data-panel-group-direction=vertical]>div]:rotate-90
data-slot="resizable-handle"
```

## ResizableHandle Inner Div (withHandle)

```
z-10 flex h-4 w-3 items-center justify-center rounded-base border bg-border
```
