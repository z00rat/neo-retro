# Pagination Component - Style Mapping

## Pagination (Root)

```
mx-auto flex w-full justify-center
data-slot="pagination"
role="navigation" aria-label="pagination"
```

## PaginationContent

```
flex flex-row items-center gap-1
data-slot="pagination-content"
```

## PaginationItem

```
data-slot="pagination-item"
```

## PaginationLink

Uses Button component with `noShadow` variant
Additional classes when `isActive`:

```
bg-black text-white
data-slot="pagination-link"
```

## PaginationPrevious

Uses PaginationLink with:

```
gap-1 pl-2.5
data-slot="pagination-previous"
aria-label="Go to previous page"
```

## PaginationNext

Uses PaginationLink with:

```
gap-1 pr-2.5
data-slot="pagination-next"
aria-label="Go to next page"
```

## PaginationEllipsis

```
flex size-9 items-center justify-center
data-slot="pagination-ellipsis"
aria-hidden
```
