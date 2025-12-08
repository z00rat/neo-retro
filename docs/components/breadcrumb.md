# Breadcrumb Component - Style Mapping

## Breadcrumb (Root)

```
data-slot="breadcrumb"
aria-label="breadcrumb"
```

## BreadcrumbList

```
flex flex-wrap items-center gap-1.5 text-sm font-base break-words text-foreground sm:gap-2.5
data-slot="breadcrumb-list"
```

## BreadcrumbItem

```
inline-flex items-center gap-1.5
data-slot="breadcrumb-item"
```

## BreadcrumbLink

```
data-slot="breadcrumb-link"
```

## BreadcrumbPage

```
data-slot="breadcrumb-page"
role="link" aria-disabled="true" aria-current="page"
```

## BreadcrumbSeparator

```
[&>svg]:size-3.5
data-slot="breadcrumb-separator"
role="presentation" aria-hidden="true"
```

## BreadcrumbEllipsis

```
flex size-9 items-center justify-center
data-slot="breadcrumb-ellipsis"
role="presentation" aria-hidden="true"
```
