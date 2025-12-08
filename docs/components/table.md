# Table Component - Style Mapping

## Table Wrapper

```
relative w-full overflow-auto
```

## Table (Root)

```
w-full caption-bottom border-2 border-border text-sm
data-slot="table"
```

## TableHeader

```
[&_tr]:border-b-2 [&_tr]:border-border
data-slot="table-header"
```

## TableBody

```
[&_tr:last-child]:border-0
data-slot="table-body"
```

## TableFooter

```
border-t-2 border-border bg-main font-base text-main-foreground last:[&>tr]:border-b-0
data-slot="table-footer"
```

## TableRow

```
border-b-2 border-border transition-colors text-main-foreground bg-main font-base
data-[state=selected]:bg-secondary-background data-[state=selected]:text-main-foreground
data-slot="table-row"
```

## TableHead

```
h-12 px-4 text-left align-middle font-heading text-main-foreground
[&:has([role=checkbox])]:pr-0
data-slot="table-head"
```

## TableCell

```
p-4 align-middle [&:has([role=checkbox])]:pr-0
data-slot="table-cell"
```

## TableCaption

```
mt-4 text-sm text-foreground font-base
data-slot="table-caption"
```
