# Sonner (Toaster) Component - Style Mapping

## Toast

```
bg-background text-foreground border-border border-2 font-heading shadow-shadow
rounded-base text-[13px] flex items-center gap-2.5 p-4 w-[356px]
[&:has(button)]:justify-between
```

## Toast Description

```
font-base
```

## Toast Action Button

```
font-base border-2 text-[12px] h-6 px-2 bg-main text-main-foreground border-border
rounded-base shrink-0
```

## Toast Cancel Button

```
font-base border-2 text-[12px] h-6 px-2 bg-secondary-background text-foreground
border-border rounded-base shrink-0
```

## Toast Error Variant

```
bg-black text-white
```

## Toast Loading Variant

```
[&[data-sonner-toast]_[data-icon]]:flex
[&[data-sonner-toast]_[data-icon]]:size-4
[&[data-sonner-toast]_[data-icon]]:relative
[&[data-sonner-toast]_[data-icon]]:justify-start
[&[data-sonner-toast]_[data-icon]]:items-center
[&[data-sonner-toast]_[data-icon]]:flex-shrink-0
```
