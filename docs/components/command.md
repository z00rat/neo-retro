# Command Component - Style Mapping

## Command (Root)

```
flex h-full w-full flex-col overflow-hidden rounded-[0px] border-2 border-border
bg-main font-base text-main-foreground
data-slot="command"
```

## CommandDialog

Uses Dialog component with custom content classes:

```
overflow-hidden p-0 rounded-[0px]! shadow-shadow border-0
```

## CommandInputWrapper

```
flex h-9 gap-2 items-center border-b-2 border-border px-3
data-slot="command-input-wrapper"
```

## CommandInput

```
flex h-10 w-full rounded-base bg-transparent py-3 text-sm outline-hidden
placeholder:text-main-foreground placeholder:opacity-50
disabled:cursor-not-allowed disabled:opacity-50
data-slot="command-input"
```

## CommandList

```
max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto
data-slot="command-list"
```

## CommandEmpty

```
py-6 text-center text-sm
data-slot="command-empty"
```

## CommandGroup

```
text-main-foreground overflow-hidden p-2
[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5
[&_[cmdk-group-heading]]:text-base [&_[cmdk-group-heading]]:font-heading
data-slot="command-group"
```

## CommandSeparator

```
-mx-1 h-0.5 bg-border
data-slot="command-separator"
```

## CommandItem

```
relative flex cursor-default select-none items-center rounded-base px-2 py-1.5 gap-2
text-sm text-main-foreground outline-border outline-0 aria-selected:outline-2
data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50
[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
data-slot="command-item"
```

## CommandShortcut

```
ml-auto text-xs tracking-widest text-main-foreground
data-slot="command-shortcut"
```
