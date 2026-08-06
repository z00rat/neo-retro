import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function getComponentName(name: string): string {
  // convert kebab-case to title case
  return name.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

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
