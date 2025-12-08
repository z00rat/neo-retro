# Chart Component - Style Mapping

## ChartContainer

```
[&_.recharts-cartesian-axis-tick_text]:fill-foreground
[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-[#80808080]
[&_.recharts-curve.recharts-tooltip-cursor]:stroke-[#80808080]
[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-black
[&_.recharts-polar-grid_[stroke='#ccc']]:dark:stroke-white
[&_.recharts-reference-line_[stroke='#ccc']]:stroke-black
[&_.recharts-reference-line_[stroke='#ccc']]:dark:stroke-white
flex aspect-video justify-center text-xs
[&_.recharts-dot[stroke='#fff']]:stroke-transparent
[&_.recharts-sector]:outline-hidden
[&_.recharts-sector[stroke='#fff']]:stroke-border
[&_.recharts-surface]:outline-hidden
[&_.recharts-layer_path]:[fill-opacity:1]
[&_.recharts-layer_path]:[stroke-width:2]
[&_.recharts-layer_path]:[stroke:var(--color-border)]
data-slot="chart"
data-chart={chartId}
```

Note: Chart component uses CSS variables for colors defined in the chart config. The component generates dynamic CSS based on the config provided.
