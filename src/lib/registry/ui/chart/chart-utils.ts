import { getContext, setContext, type Component } from 'svelte';

export const THEMES = { light: '', dark: '.dark' } as const;

export type ChartConfig = {
  [k in string]: {
    label?: string;
    icon?: Component;
  } & ({ color: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> });
};

export type TooltipPayload = {
  key: string;
  label: string;
  value: unknown;
  color?: string;
};

// Helper to extract item config from a payload.
export function getPayloadConfigFromPayload(config: ChartConfig, payload: TooltipPayload, key: string) {
  if (payload.key in config) return config[payload.key];
  return config[key as keyof typeof config];
}

type ChartContextValue = {
  config: ChartConfig;
};

const chartContextKey = Symbol('chart-context');

export function setChartContext(value: ChartContextValue) {
  return setContext(chartContextKey, value);
}

export function useChart() {
  return getContext<ChartContextValue>(chartContextKey);
}
