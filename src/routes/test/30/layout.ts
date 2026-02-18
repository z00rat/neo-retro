// src/lib/layout.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- CONFIGURATION ---

const BREAKPOINTS = ['sm', 'md', 'lg', 'xl', 'xxl'] as const;
type Breakpoint = (typeof BREAKPOINTS)[number];

// The map of physical locations to Tailwind classes
const MAP = {
  // If <X> (Row)
  x: {
    top: 'items-start',
    bottom: 'items-end',
    left: 'justify-start',
    right: 'justify-end',
    center: 'justify-center items-center',
    'center-x': 'justify-center',
    'center-y': 'items-center',
    between: 'justify-between',
    evenly: 'justify-evenly',
    stretch: 'items-stretch',
    reverse: 'flex-row-reverse',
    col: 'flex-col', // Override
    row: 'flex-row',
  },
  // If <Y> (Col)
  y: {
    top: 'justify-start',
    bottom: 'justify-end',
    left: 'items-start',
    right: 'items-end',
    center: 'justify-center items-center',
    'center-x': 'items-center',
    'center-y': 'justify-center',
    between: 'justify-between',
    evenly: 'justify-evenly',
    stretch: 'items-stretch',
    reverse: 'flex-col-reverse',
    col: 'flex-col',
    row: 'flex-row', // Override
  },
};

type Axis = 'x' | 'y';
type Keys = keyof typeof MAP.x;

// --- THE PARSER ---

export function getLayoutClasses(restProps: Record<string, any>, axis: Axis): string {
  const classes: string[] = [];
  const lookup = MAP[axis];

  // Handle 'xxl' -> '2xl' conversion for Tailwind
  const getBp = (bp: string) => (bp === 'xxl' ? '2xl' : bp);

  for (const [key, val] of Object.entries(restProps)) {
    if (val !== true) continue; // Only boolean flags

    // 1. Base Props (e.g. "top")
    if (key in lookup) {
      classes.push(lookup[key as Keys]);
      continue;
    }

    // 2. Responsive Props (e.g. "md-top")
    const index = key.indexOf('-');
    if (index === -1) continue;

    const bp = key.substring(0, index);
    const token = key.substring(index + 1);

    if (BREAKPOINTS.includes(bp as any) && token in lookup) {
      classes.push(`${getBp(bp)}:${lookup[token as Keys]}`);
    }
  }

  return classes.join(' ');
}

// --- TYPES FOR AUTOCOMPLETE ---

// This magic creates the type: "sm-top" | "md-top" | "lg-center-x" ...
type ResponsiveKeys = `${Breakpoint}-${Keys}`;

// The base interface for your components
export interface LayoutProps {
  tag?: string;
  class?: string;
  gap?: number | string;

  // Base booleans
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  center?: boolean;
  'center-x'?: boolean;
  'center-y'?: boolean;
  between?: boolean;
  evenly?: boolean;
  stretch?: boolean;
  reverse?: boolean;

  // This allows arbitrary extra props (like onclick),
  // but the intersection below adds the autocomplete "sugar"
  [key: string]: any;
}

// We export this specifically for the Component Props
export type GeneratedProps = LayoutProps & {
  [K in ResponsiveKeys]?: boolean;
};
