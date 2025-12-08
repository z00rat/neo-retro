# HoverCard Component - Style Mapping

## HoverCardContent

```
z-50 w-64 rounded-base border-2 border-border bg-main p-4 font-base text-main-foreground
data-[state=open]:animate-in data-[state=closed]:animate-out
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
data-[side=bottom]:slide-in-from-top-2
data-[side=left]:slide-in-from-right-2
data-[side=right]:slide-in-from-left-2
data-[side=top]:slide-in-from-bottom-2
origin-(--radix-hover-card-content-transform-origin)
data-slot="hover-card-content"
```
