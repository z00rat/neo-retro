# Checkbox Component - Style Mapping

## Checkbox (Root)

```
peer size-4 shrink-0 outline-2 outline-border ring-offset-white
focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2
disabled:cursor-not-allowed disabled:opacity-50
data-[state=checked]:bg-main data-[state=checked]:text-white
data-slot="checkbox"
```

## CheckboxIndicator

```
flex items-center justify-center text-current
data-slot="checkbox-indicator"
```

## Check Icon (inside indicator)

```
size-4 text-main-foreground
```
