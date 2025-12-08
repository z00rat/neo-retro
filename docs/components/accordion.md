# Accordion Component - Style Mapping

## AccordionItem

```
rounded-base overflow-hidden border-2 border-b border-border shadow-shadow
data-slot="accordion-item"
```

## AccordionTrigger

```
flex flex-1 items-center justify-between text-left text-base text-main-foreground
border-border focus-visible:ring-[3px] bg-main p-4 font-heading transition-all
[&[data-state=open]>svg]:rotate-180
data-[state=open]:rounded-b-none data-[state=open]:border-b-2
disabled:pointer-events-none disabled:opacity-50
data-slot="accordion-trigger"
```

## AccordionContent

```
overflow-hidden rounded-b-base bg-secondary-background text-sm font-base transition-all
data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down
data-slot="accordion-content"
```

## AccordionContent Inner Div

```
p-4
```
