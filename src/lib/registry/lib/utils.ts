import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const neoretroColors = {
  background: 'var(--color-background)',
  foreground: 'var(--color-foreground)',
  border: 'var(--color-border)',
  ring: 'var(--color-ring)',
  black: 'var(--color-black)',
  red: 'var(--color-red)',
  green: 'var(--color-green)',
  yellow: 'var(--color-yellow)',
  blue: 'var(--color-blue)',
  magenta: 'var(--color-magenta)',
  cyan: 'var(--color-cyan)',
  white: 'var(--color-white)',
  brightBlack: 'var(--color-bright-black)',
  brightRed: 'var(--color-bright-red)',
  brightGreen: 'var(--color-bright-green)',
  brightYellow: 'var(--color-bright-yellow)',
  brightBlue: 'var(--color-bright-blue)',
  brightMagenta: 'var(--color-bright-magenta)',
  brightCyan: 'var(--color-bright-cyan)',
  brightWhite: 'var(--color-bright-white)',
  onBlack: 'var(--color-on-black)',
  onRed: 'var(--color-on-red)',
  onGreen: 'var(--color-on-green)',
  onYellow: 'var(--color-on-yellow)',
  onBlue: 'var(--color-on-blue)',
  onMagenta: 'var(--color-on-magenta)',
  onCyan: 'var(--color-on-cyan)',
  onWhite: 'var(--color-on-white)',
  onBrightBlack: 'var(--color-on-bright-black)',
  onBrightRed: 'var(--color-on-bright-red)',
  onBrightGreen: 'var(--color-on-bright-green)',
  onBrightYellow: 'var(--color-on-bright-yellow)',
  onBrightBlue: 'var(--color-on-bright-blue)',
  onBrightMagenta: 'var(--color-on-bright-magenta)',
  onBrightCyan: 'var(--color-on-bright-cyan)',
  onBrightWhite: 'var(--color-on-bright-white)',
  clr: 'var(--color-clr)',
  onClr: 'var(--color-on-clr)',
  clrActive: 'var(--color-clr-active)',
  onClrActive: 'var(--color-on-clr-active)',
  clrInactive: 'var(--color-clr-inactive)',
  onClrInactive: 'var(--color-on-clr-inactive)',
  clrHover: 'var(--color-clr-hover)',
  onClrHover: 'var(--color-on-clr-hover)',
  clrHighlighted: 'var(--color-clr-highlighted)',
  onClrHighlighted: 'var(--color-on-clr-highlighted)',
} as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export type Color =
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'bright-red'
  | 'bright-green'
  | 'bright-yellow'
  | 'bright-blue'
  | 'bright-magenta'
  | 'bright-cyan'
  | 'bright-white';

export type inverseColor =
  | 'inverse'
  | 'red-inverse'
  | 'green-inverse'
  | 'yellow-inverse'
  | 'blue-inverse'
  | 'magenta-inverse'
  | 'cyan-inverse'
  | 'white-inverse'
  | 'bright-red-inverse'
  | 'bright-green-inverse'
  | 'bright-yellow-inverse'
  | 'bright-blue-inverse'
  | 'bright-magenta-inverse'
  | 'bright-cyan-inverse'
  | 'bright-white-inverse';
