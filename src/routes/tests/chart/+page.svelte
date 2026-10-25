<script lang="ts">
  import * as Card from '#lib/registry/ui/card/index.js';
  import * as Chart from '#lib/registry/ui/chart/index.js';
  import { neoretroColors } from '#lib/utils.js';
  import {
    forceCollide,
    forceManyBody,
    forceX,
    forceY,
    type SimulationLinkDatum,
    type SimulationNodeDatum,
  } from 'd3-force';
  import { hierarchy } from 'd3-hierarchy';
  import { scaleBand, scaleLinear, scalePoint, scaleQuantize } from 'd3-scale';
  import { curveBasis } from 'd3-shape';
  import {
    Arc,
    ArcLabel,
    Area,
    AreaChart,
    Axis,
    BarChart,
    defaultChartPadding,
    Group,
    Layer,
    Chart as LayerChart,
    Tooltip as LayerTooltip,
    LinearGradient,
    LineChart,
    Link,
    PieChart,
    Rect,
    Rule,
    sankeyGraphFromHierarchy,
    Spline,
    Text,
  } from 'layerchart';
  import { ForceSimulation, type Data as ForceData } from 'layerchart/force';
  import * as Graph from 'layerchart/graph';
  import { Tree } from 'layerchart/hierarchy';

  import chartExamplesData from './chart-examples.json';
  import chordData from './chord.json';
  import flareData from './flare.json';
  import forceNodeData from './force-nodes.json';
  import populationRankData from './population-ranks.json';
  import radialTemperatureData from './radial-temperature-data.json';
  import ridgelineRawData from './ridgeline.json';
  import tcpStateGraphData from './tcp-state.json';
  import temperatureDataJson from './temperature.json';
  import treeHierarchyData from './tree.json';

  type NetworkNode = SimulationNodeDatum & {
    id: string;
    group: number;
    color: string;
    radius: number;
  };

  type NetworkLink = SimulationLinkDatum<NetworkNode>;

  const forceColors = [neoretroColors.blue, neoretroColors.magenta, neoretroColors.green, neoretroColors.yellow];
  const networkData: ForceData<NetworkNode, NetworkLink> = {
    nodes: forceNodeData.map(({ group, ...node }) => ({
      ...node,
      group,
      color: forceColors[Math.max(0, group - 1)],
    })),
    links: [],
  };

  let forceChartWidth = $state(600);
  const networkForces = {
    x: forceX<NetworkNode>().strength(0.01),
    y: forceY<NetworkNode>().strength(0.01),
    charge: forceManyBody<NetworkNode>().strength((_, index) => (index === 0 ? (-forceChartWidth * 2) / 3 : 0)),
    collide: forceCollide<NetworkNode>((node) => node.radius + 1).iterations(3),
  };

  const treeData = hierarchy(treeHierarchyData);
  const temperatureData = temperatureDataJson.observations;

  // Daily SFO temperature averages and historic extremes aggregated by day of year.
  const radialTemperature = radialTemperatureData.map((day) => ({
    ...day,
    date: new Date(`${day.date}T00:00:00.000Z`),
  }));
  const radialConfig = {
    min_max: { label: 'Min/Max', color: neoretroColors.cyan },
    minmin_maxmax: { label: 'MinMin/MaxMax', color: neoretroColors.blue },
  } satisfies Chart.ChartConfig;

  const thresholdConfig = {
    temperature: { label: 'Temperature', color: neoretroColors.blue },
  } satisfies Chart.ChartConfig;
  const thresholdValue = temperatureDataJson.threshold;

  const chordMatrix = chordData.matrix;
  const chordLabels = chordData.labels;

  const chordColors = [
    neoretroColors.blue,
    neoretroColors.magenta,
    neoretroColors.green,
    neoretroColors.yellow,
    neoretroColors.cyan,
  ];

  type ChordDatum = {
    source: { index: number; value: number };
    target: { index: number; value: number };
  };

  let hoveredChordGroup = $state<number | null>(null);
  let hoveredChord = $state<ChordDatum | null>(null);
  const hasChordHover = $derived(hoveredChordGroup !== null || hoveredChord !== null);

  let bumpChartWidth = $state(800);
  let treeChartWidth = $state(800);
  let chordChartWidth = $state(800);
  let sankeyChartWidth = $state(760);
  let dagreChartWidth = $state(760);

  const populationRanks = populationRankData.states;
  const bumpYears = populationRankData.years;
  const bumpMaxRank = Math.max(...populationRanks.flatMap((state) => state.ranks));
  const bumpRowHeight = 18;
  const bumpData: Record<string, string | number>[] = bumpYears.map((year, index) => ({
    year,
    ...Object.fromEntries(populationRanks.map((state) => [state.name, state.ranks[index]])),
  }));
  const bumpKeys = populationRanks.map((state) => state.name);
  let hoveredState = $state<string | null>(null);
  const bumpSegmentStroke = (
    datum: Record<string, string | number>,
    index: number,
    rows: Record<string, string | number>[],
    state: string,
  ) => {
    if (index === rows.length - 1) return neoretroColors.border;
    const from = datum[state];
    const to = rows[index + 1][state];
    return typeof from === 'number' && typeof to === 'number' && from > to
      ? 'url(#bump-improved)'
      : typeof from === 'number' && typeof to === 'number' && from < to
        ? 'url(#bump-declined)'
        : neoretroColors.border;
  };

  const weatherColors = [
    neoretroColors.blue,
    neoretroColors.brightBlue,
    neoretroColors.cyan,
    neoretroColors.brightCyan,
    neoretroColors.green,
    neoretroColors.yellow,
    neoretroColors.red,
  ];
  const averageTemperatureExtent = [
    Math.min(...radialTemperature.map((day) => day.avg)),
    Math.max(...radialTemperature.map((day) => day.avg)),
  ];
  const weatherMonthTicks = [0, 3, 6, 9].map((month) => new Date(Date.UTC(2000, month, 1)));

  const categories: string[] = ridgelineRawData.categories;
  const rawData: Record<string, number[]> = ridgelineRawData.responses;

  const ridgeThresholds = Array.from({ length: 51 }, (_, index) => index * 2);
  const ridgeBandwidth = 7;
  const ridgelineData = categories.map((name) => ({
    name,
    values: ridgeThresholds.map((x) => ({
      x,
      value:
        rawData[name].reduce((total, datum) => {
          const distance = (x - datum) / ridgeBandwidth;
          return total + (Math.abs(distance) <= 1 ? (0.75 * (1 - distance * distance)) / ridgeBandwidth : 0);
        }, 0) / rawData[name].length,
    })),
  }));
  const maxRidgeDensity = Math.max(...ridgelineData.flatMap((series) => series.values.map((datum) => datum.value)));
  const ridgeHeight = 500;
  const ridgePadding = { top: 20, bottom: 30, left: 140, right: 10 };
  const ridgeInnerHeight = ridgeHeight - ridgePadding.top - ridgePadding.bottom;
  const ridgeStep = ridgeInnerHeight / ridgelineData.length;
  const ridgeScale = scaleLinear()
    .domain([0, maxRidgeDensity])
    .range([0, -ridgeStep * 4]);
  const ridgelineColors = [
    neoretroColors.blue,
    neoretroColors.magenta,
    neoretroColors.green,
    neoretroColors.red,
    neoretroColors.yellow,
  ];

  type EnergyDatum = { name: string; value?: number; children?: EnergyDatum[] };
  const sankeyHierarchy = hierarchy<EnergyDatum>(flareData)
    .sum((node) => node.value ?? 0)
    .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
  const sankeyRightColumnCount = sankeyHierarchy.leaves().length;
  const sankeyChartHeight = Math.max(2000, sankeyRightColumnCount * 20);
  let highlightedSankeyLinks = $state<number[]>([]);

  const sankeyGraph = sankeyGraphFromHierarchy(
    sankeyHierarchy as unknown as Parameters<typeof sankeyGraphFromHierarchy>[0],
  );
  const tcpStateGraph = tcpStateGraphData;

  function getChordGradientStops(chord: ChordDatum) {
    const { source, target } = chord;
    return [chordColors[source.index], chordColors[target.index]];
  }

  function getChordGradientAngle(chord: ChordDatum, groups: { startAngle: number; endAngle: number }[]) {
    const { source, target } = chord;
    const sourceGroup = groups[source.index];
    const targetGroup = groups[target.index];
    const sourceMid = (sourceGroup.startAngle + sourceGroup.endAngle) / 2;
    const targetMid = (targetGroup.startAngle + targetGroup.endAngle) / 2;
    return ((sourceMid + targetMid) / 2) * (180 / Math.PI) - 90;
  }

  function isChordActive(chord: ChordDatum) {
    if (hoveredChordGroup !== null) {
      return chord.source.index === hoveredChordGroup || chord.target.index === hoveredChordGroup;
    }
    if (hoveredChord !== null) {
      return chord.source.index === hoveredChord.source.index && chord.target.index === hoveredChord.target.index;
    }
    return true;
  }

  function isChordGroupActive(groupIndex: number) {
    if (hoveredChordGroup !== null) return groupIndex === hoveredChordGroup;
    if (hoveredChord !== null) {
      return groupIndex === hoveredChord.source.index || groupIndex === hoveredChord.target.index;
    }
    return true;
  }

  const monthlyData = chartExamplesData.monthlyVisitors;

  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: neoretroColors.blue,
    },
    mobile: {
      label: 'Mobile',
      color: neoretroColors.magenta,
    },
  } satisfies Chart.ChartConfig;

  const singleSeriesConfig = {
    visitors: {
      label: 'Visitors',
      color: neoretroColors.green,
    },
  } satisfies Chart.ChartConfig;

  const visitorData = chartExamplesData.visitors;
  const chartPalette: Record<string, string> = {
    blue: neoretroColors.blue,
    magenta: neoretroColors.magenta,
    yellow: neoretroColors.yellow,
  };
  const browserData = chartExamplesData.browsers.map((browser) => ({
    ...browser,
    color: chartPalette[browser.color],
  }));

  const browserConfig = {
    desktop: { label: 'Desktop', color: neoretroColors.blue },
    mobile: { label: 'Mobile', color: neoretroColors.magenta },
    tablet: { label: 'Tablet', color: neoretroColors.yellow },
  } satisfies Chart.ChartConfig;
</script>

<svelte:head>
  <title>Chart | Neo Retro</title>
  <meta name="description" content="Chart component examples styled with the Neo-Retro palette." />
</svelte:head>

<div class="max-w-6xl gap-6 px-4 py-12 container mx-auto grid">
  <Card.Root color="white">
    <Card.Header>
      <Card.Title>Monthly visitors</Card.Title>
      <Card.Description>Desktop and mobile visits from January through June.</Card.Description>
    </Card.Header>
    <Card.Content>
      <Chart.Container config={chartConfig} class="h-75 aspect-auto w-full">
        <BarChart
          data={monthlyData}
          xScale={scaleBand().padding(0.25)}
          x="month"
          axis="x"
          seriesLayout="group"
          legend
          series={[
            { key: 'desktop', label: chartConfig.desktop.label, color: chartConfig.desktop.color },
            { key: 'mobile', label: chartConfig.mobile.label, color: chartConfig.mobile.color },
          ]}
          props={{ xAxis: { format: (month) => month.slice(0, 3) } }}
        >
          {#snippet tooltip()}
            <Chart.Tooltip color="white" indicator="dot" />
          {/snippet}
        </BarChart>
      </Chart.Container>
    </Card.Content>
  </Card.Root>

  <Card.Root color="cyan">
    <Card.Header>
      <Card.Title>Visitors by month</Card.Title>
      <Card.Description>One series with a separate chart configuration.</Card.Description>
    </Card.Header>
    <Card.Content>
      <Chart.Container config={singleSeriesConfig} class="h-65 aspect-auto w-full">
        <BarChart
          data={visitorData}
          xScale={scaleBand().padding(0.25)}
          x="month"
          axis="x"
          tooltipContext={false}
          series={[
            {
              key: 'visitors',
              label: singleSeriesConfig.visitors.label,
              color: singleSeriesConfig.visitors.color,
            },
          ]}
          props={{ xAxis: { format: (month) => month.slice(0, 3) } }}
        />
      </Chart.Container>
    </Card.Content>
  </Card.Root>

  <Card.Root color="yellow">
    <Card.Header>
      <Card.Title>Line chart</Card.Title>
      <Card.Description>Compare desktop and mobile trends.</Card.Description>
    </Card.Header>
    <Card.Content>
      <Chart.Container config={chartConfig} class="h-70 aspect-auto w-full">
        <LineChart
          data={monthlyData}
          x="month"
          axis="x"
          series={[
            { key: 'desktop', label: chartConfig.desktop.label, color: chartConfig.desktop.color },
            { key: 'mobile', label: chartConfig.mobile.label, color: chartConfig.mobile.color },
          ]}
        >
          {#snippet tooltip()}
            <Chart.Tooltip color="yellow" indicator="line" />
          {/snippet}
        </LineChart>
      </Chart.Container>
    </Card.Content>
  </Card.Root>

  <Card.Root color="white">
    <Card.Header>
      <Card.Title>Bump chart · state population ranks</Card.Title>
      <Card.Description>Population rank changes for all states from 1920 to 2020.</Card.Description>
    </Card.Header>
    <Card.Content class="min-w-0 overflow-hidden">
      <div class="h-[64rem] w-full" bind:clientWidth={bumpChartWidth}>
        <LayerChart
          data={bumpData}
          x="year"
          xScale={scalePoint()}
          y={bumpKeys}
          yScale={scaleLinear()}
          yDomain={[bumpMaxRank + 0.5, 0.5]}
          padding={{ top: 30, bottom: 30, left: 14, right: 18 }}
          height={bumpMaxRank * bumpRowHeight + 60}
          width={bumpChartWidth}
        >
          {#snippet children({ context })}
            <Layer>
              <LinearGradient id="bump-improved" stops={[neoretroColors.green, neoretroColors.brightGreen]} />
              <LinearGradient id="bump-declined" stops={[neoretroColors.brightRed, neoretroColors.red]} />
              <Axis
                placement="top"
                rule={false}
                tickLabelProps={{ fontSize: 10, 'font-weight': 300, class: 'bump-year-tick' }}
              />
              <Axis
                placement="bottom"
                rule={false}
                tickLabelProps={{ fontSize: 10, 'font-weight': 300, class: 'bump-year-tick' }}
              />

              {#each populationRanks as state (state.name)}
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <g
                  class="transition-opacity duration-150"
                  opacity={hoveredState === null ? 0.72 : hoveredState === state.name ? 1 : 0.08}
                  onmouseenter={() => (hoveredState = state.name)}
                  onmouseleave={() => (hoveredState = null)}
                >
                  {#each bumpData as point, index (point.year)}
                    {@const next = bumpData[index + 1]}
                    {#if next}
                      {@const x1 = context.xScale(point.year)}
                      {@const x2 = context.xScale(next.year)}
                      {@const y1 = context.yScale(point[state.name])}
                      {@const y2 = context.yScale(next[state.name])}
                      {@const middleX = (x1 + x2) / 2}
                      {@const pathData = `M ${x1},${y1} C ${middleX},${y1} ${middleX},${y2} ${x2},${y2}`}
                      <path
                        d={pathData}
                        fill="none"
                        stroke="transparent"
                        stroke-width={16}
                        pointer-events="stroke"
                        aria-hidden="true"
                      />
                      <path
                        d={pathData}
                        fill="none"
                        stroke={bumpSegmentStroke(point, index, bumpData, state.name)}
                        stroke-width={hoveredState === state.name ? 2.5 : 1.25}
                      />
                    {/if}
                  {/each}
                </g>
              {/each}

              {#each populationRanks as state (state.name)}
                <g
                  class="transition-opacity duration-150"
                  opacity={hoveredState === null ? 0.72 : hoveredState === state.name ? 1 : 0.08}
                >
                  {#each bumpData as point, index (point.year)}
                    {@const x = context.xScale(point.year)}
                    {@const y = context.yScale(point[state.name])}
                    {@const from = state.ranks[index === 0 ? 0 : index - 1]}
                    {@const to = state.ranks[index === 0 ? 1 : index]}
                    <rect
                      x={x - 16}
                      y={y - bumpRowHeight / 2}
                      width={32}
                      height={bumpRowHeight}
                      fill={neoretroColors.white}
                    />
                    <text
                      {x}
                      {y}
                      text-anchor="middle"
                      dominant-baseline="central"
                      pointer-events="none"
                      font-size="10"
                      font-family="monospace"
                      font-weight="400"
                      fill={from > to ? neoretroColors.green : from < to ? neoretroColors.red : neoretroColors.black}
                    >
                      {state.name}
                    </text>
                  {/each}
                </g>
              {/each}
            </Layer>
          {/snippet}
        </LayerChart>
      </div>
    </Card.Content>
  </Card.Root>

  <Card.Root color="white">
    <Card.Header>
      <Card.Title>Stacked area chart</Card.Title>
      <Card.Description>Show each series as part of the monthly total.</Card.Description>
    </Card.Header>
    <Card.Content>
      <Chart.Container config={chartConfig} class="h-70 aspect-auto w-full">
        <AreaChart
          data={monthlyData}
          x="month"
          axis="x"
          seriesLayout="stack"
          series={[
            { key: 'desktop', label: chartConfig.desktop.label, color: chartConfig.desktop.color },
            { key: 'mobile', label: chartConfig.mobile.label, color: chartConfig.mobile.color },
          ]}
        >
          {#snippet tooltip()}
            <Chart.Tooltip color="blue" indicator="dashed" />
          {/snippet}
        </AreaChart>
      </Chart.Container>
    </Card.Content>
  </Card.Root>

  <Card.Root color="white">
    <Card.Header>
      <Card.Title>Radial temperature range</Card.Title>
      <Card.Description>Twenty years of San Francisco daily temperatures grouped by day of year.</Card.Description>
    </Card.Header>
    <Card.Content>
      <Chart.Container
        config={radialConfig}
        class="h-105 [&_.lc-highlight-line]:stroke-foreground aspect-auto w-full [&_.lc-highlight-line]:stroke-2"
      >
        <AreaChart
          data={radialTemperature}
          x="date"
          y={['minmin', 'maxmax']}
          yRange={({ height }) => [height / 5, height / 2]}
          radial
          rule={{ class: 'stroke-border' }}
          props={{
            area: { line: false },
            xAxis: { format: 'month', tickMarks: false },
            yAxis: { ticks: 4, format: (value) => `${value}° F` },
            highlight: { points: false, lines: { class: 'stroke-foreground' } },
            tooltip: { context: { mode: 'bisect-x' } },
          }}
          series={[
            {
              key: 'min_max',
              label: radialConfig.min_max.label,
              value: ['min', 'max'],
              color: radialConfig.min_max.color,
            },
            {
              key: 'minmin_maxmax',
              label: radialConfig.minmin_maxmax.label,
              value: ['minmin', 'maxmax'],
              color: radialConfig.minmin_maxmax.color,
            },
          ]}
        >
          {#snippet aboveMarks()}
            <Spline y="avg" class="stroke-yellow" />
          {/snippet}
          {#snippet tooltip()}
            <Chart.Tooltip
              color="white"
              indicator="line"
              dataLabelKey="date"
              labelFormatter={(value) =>
                value.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            />
          {/snippet}
        </AreaChart>
      </Chart.Container>
    </Card.Content>
  </Card.Root>

  <Card.Root color="white">
    <Card.Header>
      <Card.Title>Ridgeline density</Card.Title>
      <Card.Description>Kernel density estimates for 17 probability phrases rated by 46 respondents.</Card.Description>
    </Card.Header>
    <Card.Content class="min-w-0 overflow-hidden">
      <LayerChart
        data={ridgelineData[0].values}
        x="x"
        y="value"
        yDomain={[0, ridgeInnerHeight]}
        yRange={({ height }) => [0, height]}
        padding={ridgePadding}
        height={ridgeHeight}
      >
        <Layer>
          {#each ridgelineData as series, index (series.name)}
            {@const rowY = ridgeStep * (index + 1)}
            {@const color = ridgelineColors[index % ridgelineColors.length]}
            <Group y={rowY}>
              <Area
                data={series.values}
                y0={() => 0}
                y1={(datum) => ridgeScale(datum.value)}
                curve={curveBasis}
                fill={color}
                line={{ stroke: color, strokeWidth: 2 }}
              />
            </Group>
            <Text
              value={series.name}
              x={-10}
              y={rowY}
              textAnchor="end"
              verticalAnchor="middle"
              fill={neoretroColors.black}
              class="text-xs"
            />
          {/each}
          <Axis placement="bottom" rule />
        </Layer>
      </LayerChart>
    </Card.Content>
  </Card.Root>

  <Card.Root color="cyan">
    <Card.Header>
      <Card.Title>Radial weather</Card.Title>
      <Card.Description>Daily minimum and maximum temperatures, colored by average temperature.</Card.Description>
    </Card.Header>
    <Card.Content class="min-w-0 overflow-hidden">
      <Chart.Container
        config={{
          min: { label: 'Minimum', color: neoretroColors.blue },
          max: { label: 'Maximum', color: neoretroColors.magenta },
        }}
        class="mx-auto aspect-square w-full max-w-[600px]"
      >
        <BarChart
          data={radialTemperature}
          x="date"
          y={['min', 'max']}
          yDomain={[null, null]}
          yRange={({ height }) => [height / 5, height / 2]}
          c="avg"
          cScale={scaleQuantize<string>()}
          cDomain={averageTemperatureExtent}
          cRange={weatherColors}
          radial
          padding={defaultChartPadding({ top: 15, bottom: 15 })}
          height={600}
          props={{
            xAxis: {
              ticks: weatherMonthTicks,
              format: (date) => date.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }),
              tickMarks: false,
            },
            yAxis: { ticks: 4, format: (value) => `${value}° F` },
            grid: { xTicks: 12 },
            tooltip: { context: { mode: 'bisect-x' } },
          }}
        >
          {#snippet tooltip()}
            <Chart.Tooltip
              color="white"
              indicator="line"
              dataLabelKey="date"
              labelFormatter={(value) =>
                value.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            />
          {/snippet}
        </BarChart>
      </Chart.Container>
    </Card.Content>
  </Card.Root>

  <Card.Root color="cyan">
    <Card.Header>
      <Card.Title>Pie chart</Card.Title>
      <Card.Description>Browser share with labels and a legend.</Card.Description>
    </Card.Header>
    <Card.Content>
      <Chart.Container config={browserConfig} class="h-80 aspect-auto w-full">
        <PieChart data={browserData} key="key" label="label" value="value" c="color" labels legend>
          {#snippet tooltip()}
            <Chart.Tooltip color="cyan" hideLabel hideIndicator />
          {/snippet}
        </PieChart>
      </Chart.Container>
    </Card.Content>
  </Card.Root>

  <Card.Root color="white">
    <Card.Header>
      <Card.Title>Force simulation · collision detection</Card.Title>
      <Card.Description>Two hundred grouped nodes repel and settle without overlapping.</Card.Description>
    </Card.Header>
    <Card.Content class="min-w-0 overflow-hidden">
      <div class="w-full" bind:clientWidth={forceChartWidth}>
        <LayerChart width={forceChartWidth} height={600} clip>
          {#snippet children({ context })}
            <ForceSimulation data={networkData} forces={networkForces} alphaTarget={0.3} velocityDecay={0.1}>
              {#snippet children({ nodes, simulation })}
                <Layer
                  onpointermove={(event) => {
                    simulation.nodes()[0].fx = event.offsetX - context.width / 2;
                    simulation.nodes()[0].fy = event.offsetY - context.height / 2;
                  }}
                >
                  <g transform={`translate(${context.width / 2}, ${context.height / 2})`}>
                    {#each nodes as node, index (node.id)}
                      {#if index > 0}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={node.radius}
                          fill={node.color}
                          stroke={neoretroColors.border}
                          stroke-width="1"
                        />
                      {/if}
                    {/each}
                  </g>
                </Layer>
              {/snippet}
            </ForceSimulation>
          {/snippet}
        </LayerChart>
      </div>
    </Card.Content>
  </Card.Root>

  <Card.Root color="cyan">
    <Card.Header>
      <Card.Title>Tree layout</Card.Title>
      <Card.Description>A basic horizontal tree with three levels of nodes.</Card.Description>
    </Card.Header>
    <Card.Content class="min-w-0 overflow-hidden">
      <div class="w-full" bind:clientWidth={treeChartWidth}>
        <LayerChart width={treeChartWidth} height={430} padding={40} class="w-full">
          <Layer>
            <Tree hierarchy={treeData} orientation="horizontal" nodeSize={[50, 140]}>
              {#snippet children({ nodes, links })}
                <g transform={`translate(${(treeChartWidth - 360) / 2}, 188)`}>
                  {#each links as link (link.target.data.name)}
                    <line
                      x1={link.source.y}
                      y1={link.source.x}
                      x2={link.target.y}
                      y2={link.target.x}
                      stroke={neoretroColors.border}
                      stroke-width="2"
                    />
                  {/each}
                  {#each nodes as node (node.data.name)}
                    <circle
                      cx={node.y}
                      cy={node.x}
                      r={node.depth === 0 ? 12 : 9}
                      fill={node.depth === 0 ? neoretroColors.magenta : neoretroColors.blue}
                      stroke={neoretroColors.border}
                      stroke-width="2"
                    />
                    <text x={node.y} y={node.x + 25} text-anchor="middle" fill={neoretroColors.onCyan}>
                      {node.data.name}
                    </text>
                  {/each}
                </g>
              {/snippet}
            </Tree>
          </Layer>
        </LayerChart>
      </div>
    </Card.Content>
  </Card.Root>

  <Card.Root color="yellow">
    <Card.Header>
      <Card.Title>Area threshold</Card.Title>
      <Card.Description>Blue marks the series against an 18° target line.</Card.Description>
    </Card.Header>
    <Card.Content class="min-w-0 overflow-hidden">
      <Chart.Container config={thresholdConfig} class="h-70 aspect-auto w-full">
        <AreaChart
          data={temperatureData}
          x="day"
          y="value"
          axis="x"
          yDomain={[0, 32]}
          series={[{ key: 'temperature', value: 'value', color: thresholdConfig.temperature.color }]}
        >
          {#snippet marks()}
            <Area
              seriesKey="temperature"
              y0={() => thresholdValue}
              fill={neoretroColors.green}
              line={{ stroke: thresholdConfig.temperature.color, strokeWidth: 3 }}
            />
            <Rule y={thresholdValue} stroke={neoretroColors.foreground} strokeWidth={2} />
          {/snippet}
        </AreaChart>
      </Chart.Container>
    </Card.Content>
  </Card.Root>

  <Card.Root color="white">
    <Card.Header>
      <Card.Title>Sankey hierarchy</Card.Title>
      <Card.Description>The Flare software class hierarchy weighted by source file size.</Card.Description>
    </Card.Header>
    <Card.Content class="min-w-0 overflow-hidden">
      <div class="w-full" bind:clientWidth={sankeyChartWidth}>
        <LayerChart
          data={sankeyGraph}
          width={sankeyChartWidth}
          height={sankeyChartHeight}
          padding={{ top: 14, right: 100, bottom: 14, left: 14 }}
          flatData={[]}
          class="w-full"
        >
          <Layer>
            <Graph.Sankey nodeAlign="justify" nodePadding={4} nodeWidth={14}>
              {#snippet children({ links, nodes })}
                {#each links as link, index (index)}
                  <Link
                    sankey
                    data={link}
                    stroke={link.source.depth === 0
                      ? neoretroColors.blue
                      : link.source.depth === 1
                        ? neoretroColors.green
                        : neoretroColors.magenta}
                    strokeOpacity={highlightedSankeyLinks.length
                      ? highlightedSankeyLinks.includes(link.index)
                        ? 0.8
                        : 0.04
                      : 0.65}
                    strokeWidth={link.width}
                    class="transition-[stroke-opacity] duration-200"
                    onpointerenter={() => (highlightedSankeyLinks = [link.index])}
                    onpointerleave={() => (highlightedSankeyLinks = [])}
                  />
                {/each}
                {#each nodes as node, index (index)}
                  {@const nodeWidth = (node.x1 ?? 0) - (node.x0 ?? 0)}
                  {@const nodeHeight = (node.y1 ?? 0) - (node.y0 ?? 0)}
                  {@const nodeColor =
                    node.depth === 0
                      ? neoretroColors.yellow
                      : node.depth === 1
                        ? neoretroColors.blue
                        : neoretroColors.magenta}
                  <Group
                    x={node.x0}
                    y={node.y0}
                    onpointerenter={() => {
                      highlightedSankeyLinks = [
                        ...(node.sourceLinks?.map((link: { index: number }) => link.index) ?? []),
                        ...(node.targetLinks?.map((link: { index: number }) => link.index) ?? []),
                      ];
                    }}
                    onpointerleave={() => (highlightedSankeyLinks = [])}
                  >
                    <Rect
                      width={nodeWidth}
                      height={nodeHeight}
                      fill={nodeColor}
                      fillOpacity={0.65}
                      stroke={neoretroColors.border}
                      strokeWidth={2}
                    />
                    <Text
                      value={node.data.name}
                      x={nodeWidth + 6}
                      y={nodeHeight / 2}
                      dy={-2}
                      verticalAnchor="middle"
                      fill={neoretroColors.black}
                      stroke={neoretroColors.white}
                      strokeWidth={3}
                      svgProps={{ 'paint-order': 'stroke' }}
                      class="text-[10px]"
                    />
                  </Group>
                {/each}
              {/snippet}
            </Graph.Sankey>
          </Layer>
        </LayerChart>
      </div>
    </Card.Content>
  </Card.Root>

  <Card.Root color="white">
    <Card.Header>
      <Card.Title>Chord diagram · gradient</Card.Title>
      <Card.Description
        >Trade between five world regions. Hover a region or ribbon to highlight related flows.</Card.Description
      >
    </Card.Header>
    <Card.Content class="min-w-0 overflow-hidden">
      <div class="w-full" bind:clientWidth={chordChartWidth}>
        <LayerChart width={chordChartWidth} height={600} padding={{ top: 50, bottom: 30 }} class="w-full">
          {#snippet children({ context })}
            <Layer center>
              <Graph.Chord matrix={chordMatrix} padAngle={0.05} sortSubgroups={(a, b) => b - a}>
                {#snippet children({ groups, chords, innerRadius, outerRadius })}
                  {#each chords as chord, index (index)}
                    {@const chordDatum = chord as unknown as ChordDatum}
                    <LinearGradient
                      stops={getChordGradientStops(chordDatum)}
                      rotate={getChordGradientAngle(chordDatum, groups)}
                    >
                      {#snippet children({ gradient })}
                        <Graph.Ribbon
                          {chord}
                          radius={innerRadius}
                          fill={gradient}
                          fillOpacity={hasChordHover ? (isChordActive(chordDatum) ? 0.8 : 0.1) : 0.67}
                          stroke="none"
                          class="cursor-pointer transition-[fill-opacity] duration-200"
                          onpointerenter={(event) => {
                            hoveredChord = chordDatum;
                            context.tooltip.show(event, {
                              source: chordLabels[chordDatum.source.index],
                              target: chordLabels[chordDatum.target.index],
                              value: chordDatum.source.value,
                            });
                          }}
                          onpointermove={(event) => {
                            context.tooltip.show(event, {
                              source: chordLabels[chordDatum.source.index],
                              target: chordLabels[chordDatum.target.index],
                              value: chordDatum.source.value,
                            });
                          }}
                          onpointerleave={() => {
                            hoveredChord = null;
                            context.tooltip.hide();
                          }}
                        />
                      {/snippet}
                    </LinearGradient>
                  {/each}
                  {#each groups as group (group.index)}
                    <Arc
                      startAngle={group.startAngle}
                      endAngle={group.endAngle}
                      {innerRadius}
                      {outerRadius}
                      fill={chordColors[group.index]}
                      fillOpacity={hasChordHover ? (isChordGroupActive(group.index) ? 1 : 0.3) : 1}
                      stroke={neoretroColors.border}
                      strokeWidth={2}
                      class="cursor-pointer transition-[fill-opacity] duration-200"
                      onpointerenter={() => (hoveredChordGroup = group.index)}
                      onpointerleave={() => (hoveredChordGroup = null)}
                    >
                      {#snippet children(arcProps)}
                        <ArcLabel
                          {...arcProps}
                          placement="centroid-rotated"
                          offset={(outerRadius - innerRadius) / 2 + 6}
                          value={chordLabels[group.index]}
                          fill={neoretroColors.black}
                          class={hasChordHover && !isChordGroupActive(group.index)
                            ? 'text-xs font-medium opacity-30 transition-opacity duration-200'
                            : 'text-xs font-medium transition-opacity duration-200'}
                        />
                      {/snippet}
                    </Arc>
                  {/each}
                {/snippet}
              </Graph.Chord>
            </Layer>
            <LayerTooltip.Root
              variant="none"
              classes={{
                container:
                  'neoretro-border neoretro-shadow neoretro-clr min-w-36 gap-1.5 rounded-sm px-2.5 py-1.5 text-xs grid items-start',
              }}
              props={{ container: { 'data-color': 'white' } }}
            >
              {#snippet children({ data })}
                <LayerTooltip.Header value={`${data.source} → ${data.target}`} />
                <LayerTooltip.Item label="Value" value={data.value} format="integer" />
              {/snippet}
            </LayerTooltip.Root>
          {/snippet}
        </LayerChart>
      </div>
    </Card.Content>
  </Card.Root>

  <Card.Root color="yellow">
    <Card.Header>
      <Card.Title>Dagre · TCP state diagram</Card.Title>
      <Card.Description>The TCP connection state machine and its transitions.</Card.Description>
    </Card.Header>
    <Card.Content class="min-w-0 overflow-hidden">
      <div class="w-full" bind:clientWidth={dagreChartWidth}>
        <LayerChart width={dagreChartWidth} height={960} padding={28} class="w-full">
          <Layer>
            <Group>
              <Graph.Dagre
                data={tcpStateGraph}
                direction="top-bottom"
                nodeWidth={100}
                nodeHeight={50}
                nodeSeparation={50}
                rankSeparation={50}
                edgeLabelWidth={120}
                edgeLabelHeight={20}
              >
                {#snippet children({ nodes, edges })}
                  {#each edges as edge (`${edge.v}-${edge.w}`)}
                    <Spline
                      data={edge.points}
                      x="x"
                      y="y"
                      stroke={neoretroColors.border}
                      strokeWidth={2}
                      markerEnd="triangle"
                    />
                    <Text
                      value={edge.label}
                      x={edge.x}
                      y={edge.y}
                      textAnchor="middle"
                      verticalAnchor="middle"
                      fill={neoretroColors.black}
                      class="text-[10px]"
                    />
                  {/each}
                  {#each nodes as node (node.label)}
                    <Group x={node.x - node.width / 2} y={node.y - node.height / 2}>
                      <Rect
                        width={node.width}
                        height={node.height}
                        fill={node.label === 'ESTAB'
                          ? neoretroColors.green
                          : node.label === 'CLOSED'
                            ? neoretroColors.red
                            : neoretroColors.cyan}
                        stroke={neoretroColors.border}
                        strokeWidth={2}
                      />
                      <Text
                        value={node.label}
                        x={node.width / 2}
                        y={node.height / 2}
                        dy={-2}
                        textAnchor="middle"
                        verticalAnchor="middle"
                        fill={neoretroColors.black}
                        class="text-[10px]"
                      />
                    </Group>
                  {/each}
                {/snippet}
              </Graph.Dagre>
            </Group>
          </Layer>
        </LayerChart>
      </div>
    </Card.Content>
  </Card.Root>
</div>

<style>
  :global(.bump-year-tick) {
    stroke: none;
    stroke-width: 0;
    font-weight: 300;
  }
</style>
