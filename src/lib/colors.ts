export type ThemeColor = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';

export const bgColorMap: Record<ThemeColor, string> = {
  black: 'bg-black',
  red: 'bg-red',
  green: 'bg-green',
  yellow: 'bg-yellow',
  blue: 'bg-blue',
  magenta: 'bg-magenta',
  cyan: 'bg-cyan',
  white: 'bg-white',
};

export const textColorMap: Record<ThemeColor, string> = {
  black: 'text-black',
  red: 'text-red',
  green: 'text-green',
  yellow: 'text-yellow',
  blue: 'text-blue',
  magenta: 'text-magenta',
  cyan: 'text-cyan',
  white: 'text-white',
};

export const colorMap: Record<ThemeColor, string> = {
  black: 'bg-black text-on-black selection:bg-on-black selection:text-black',
  red: 'bg-red text-on-red selection:bg-on-red selection:text-red',
  green: 'bg-green text-on-green selection:bg-on-green selection:text-green',
  yellow: 'bg-yellow text-on-yellow selection:bg-on-yellow selection:text-yellow',
  blue: 'bg-blue text-on-blue selection:bg-on-blue selection:text-blue',
  magenta: 'bg-magenta text-on-magenta selection:bg-on-magenta selection:text-magenta',
  cyan: 'bg-cyan text-on-cyan selection:bg-on-cyan selection:text-cyan',
  white: 'bg-white text-on-white selection:bg-on-white selection:text-white',
};

export const evenRowColorMap: Record<ThemeColor, string> = {
  black: 'even:bg-black/90',
  red: 'even:bg-red/90',
  green: 'even:bg-green/90',
  yellow: 'even:bg-yellow/90',
  blue: 'even:bg-blue/90',
  magenta: 'even:bg-magenta/90',
  cyan: 'even:bg-cyan/90',
  white: 'even:bg-white/90',
};

export const activeColorMap: Record<ThemeColor, string> = {
  black: 'data-[state=active]:bg-black data-[state=active]:text-on-black',
  red: 'data-[state=active]:bg-red data-[state=active]:text-on-red',
  green: 'data-[state=active]:bg-green data-[state=active]:text-on-green',
  yellow: 'data-[state=active]:bg-yellow data-[state=active]:text-on-yellow',
  blue: 'data-[state=active]:bg-blue data-[state=active]:text-on-blue',
  magenta: 'data-[state=active]:bg-magenta data-[state=active]:text-on-magenta',
  cyan: 'data-[state=active]:bg-cyan data-[state=active]:text-on-cyan',
  white: 'data-[state=active]:bg-white data-[state=active]:text-on-white',
};

export const inactiveColorMap: Record<ThemeColor, string> = {
  black: 'data-[state=inactive]:bg-black data-[state=inactive]:text-on-black',
  red: 'data-[state=inactive]:bg-red data-[state=inactive]:text-on-red',
  green: 'data-[state=inactive]:bg-green data-[state=inactive]:text-on-green',
  yellow: 'data-[state=inactive]:bg-yellow data-[state=inactive]:text-on-yellow',
  blue: 'data-[state=inactive]:bg-blue data-[state=inactive]:text-on-blue',
  magenta: 'data-[state=inactive]:bg-magenta data-[state=inactive]:text-on-magenta',
  cyan: 'data-[state=inactive]:bg-cyan data-[state=inactive]:text-on-cyan',
  white: 'data-[state=inactive]:bg-white data-[state=inactive]:text-on-white',
};

export const hoverOutlineMap: Record<ThemeColor, string> = {
  black: 'hover:outline-black data-highlighted:outline-black',
  red: 'hover:outline-red data-highlighted:outline-red',
  green: 'hover:outline-green data-highlighted:outline-green',
  yellow: 'hover:outline-yellow data-highlighted:outline-yellow',
  blue: 'hover:outline-blue data-highlighted:outline-blue',
  magenta: 'hover:outline-magenta data-highlighted:outline-magenta',
  cyan: 'hover:outline-cyan data-highlighted:outline-cyan',
  white: 'hover:outline-white data-highlighted:outline-white',
};

export const hoverColorMap: Record<ThemeColor, string> = {
  black: 'hover:bg-black hover:text-on-black hover:selection:bg-on-black hover:selection:text-black',
  red: 'hover:bg-red hover:text-on-red hover:selection:bg-on-red hover:selection:text-red',
  green: 'hover:bg-green hover:text-on-green hover:selection:bg-on-green hover:selection:text-green',
  yellow: 'hover:bg-yellow hover:text-on-yellow hover:selection:bg-on-yellow hover:selection:text-yellow',
  blue: 'hover:bg-blue hover:text-on-blue hover:selection:bg-on-blue hover:selection:text-blue',
  magenta: 'hover:bg-magenta hover:text-on-magenta hover:selection:bg-on-magenta hover:selection:text-magenta',
  cyan: 'hover:bg-cyan hover:text-on-cyan hover:selection:bg-on-cyan hover:selection:text-cyan',
  white: 'hover:bg-white hover:text-on-white hover:selection:bg-on-white hover:selection:text-white',
};

export const tableRowHoverColorMap: Record<ThemeColor, string> = {
  black: 'hover:bg-on-black hover:text-black',
  red: 'hover:bg-on-red hover:text-red',
  green: 'hover:bg-on-green hover:text-green',
  yellow: 'hover:bg-on-yellow hover:text-yellow',
  blue: 'hover:bg-on-blue hover:text-blue',
  magenta: 'hover:bg-on-magenta hover:text-magenta',
  cyan: 'hover:bg-on-cyan hover:text-cyan',
  white: 'hover:bg-on-white hover:text-white',
};

export const selectedColorMap: Record<ThemeColor, string> = {
  black:
    'data-[selected]:bg-black data-[selected]:text-on-black data-[selected]:selection:bg-on-black data-[selected]:selection:text-black',
  red: 'data-[selected]:bg-red data-[selected]:text-on-red data-[selected]:selection:bg-on-red data-[selected]:selection:text-red',
  green:
    'data-[selected]:bg-green data-[selected]:text-on-green data-[selected]:selection:bg-on-green data-[selected]:selection:text-green',
  yellow:
    'data-[selected]:bg-yellow data-[selected]:text-on-yellow data-[selected]:selection:bg-on-yellow data-[selected]:selection:text-yellow',
  blue: 'data-[selected]:bg-blue data-[selected]:text-on-blue data-[selected]:selection:bg-on-blue data-[selected]:selection:text-blue',
  magenta:
    'data-[selected]:bg-magenta data-[selected]:text-on-magenta data-[selected]:selection:bg-on-magenta data-[selected]:selection:text-magenta',
  cyan: 'data-[selected]:bg-cyan data-[selected]:text-on-cyan data-[selected]:selection:bg-on-cyan data-[selected]:selection:text-cyan',
  white:
    'data-[selected]:bg-white data-[selected]:text-on-white data-[selected]:selection:bg-on-white data-[selected]:selection:text-white',
};

export const todayColorMap: Record<ThemeColor, string> = {
  black: '[&[data-today]:not([data-selected])]:bg-black [&[data-today]:not([data-selected])]:text-on-black',
  red: '[&[data-today]:not([data-selected])]:bg-red [&[data-today]:not([data-selected])]:text-on-red',
  green: '[&[data-today]:not([data-selected])]:bg-green [&[data-today]:not([data-selected])]:text-on-green',
  yellow: '[&[data-today]:not([data-selected])]:bg-yellow [&[data-today]:not([data-selected])]:text-on-yellow',
  blue: '[&[data-today]:not([data-selected])]:bg-blue [&[data-today]:not([data-selected])]:text-on-blue',
  magenta: '[&[data-today]:not([data-selected])]:bg-magenta [&[data-today]:not([data-selected])]:text-on-magenta',
  cyan: '[&[data-today]:not([data-selected])]:bg-cyan [&[data-today]:not([data-selected])]:text-on-cyan',
  white: '[&[data-today]:not([data-selected])]:bg-white [&[data-today]:not([data-selected])]:text-on-white',
};

export const invertedHighlightColorMap: Record<ThemeColor, string> = {
  black:
    'data-highlighted:bg-on-black data-highlighted:text-black data-[state=open]:bg-on-black data-[state=open]:text-black',
  red: 'data-highlighted:bg-on-red data-highlighted:text-red data-[state=open]:bg-on-red data-[state=open]:text-red',
  green:
    'data-highlighted:bg-on-green data-highlighted:text-green data-[state=open]:bg-on-green data-[state=open]:text-green',
  yellow:
    'data-highlighted:bg-on-yellow data-highlighted:text-yellow data-[state=open]:bg-on-yellow data-[state=open]:text-yellow',
  blue: 'data-highlighted:bg-on-blue data-highlighted:text-blue data-[state=open]:bg-on-blue data-[state=open]:text-blue',
  magenta:
    'data-highlighted:bg-on-magenta data-highlighted:text-magenta data-[state=open]:bg-on-magenta data-[state=open]:text-magenta',
  cyan: 'data-highlighted:bg-on-cyan data-highlighted:text-cyan data-[state=open]:bg-on-cyan data-[state=open]:text-cyan',
  white:
    'data-highlighted:bg-on-white data-highlighted:text-white data-[state=open]:bg-on-white data-[state=open]:text-white',
};

export const invertedHoverColorMap: Record<ThemeColor, string> = {
  black: 'hover:bg-on-black hover:text-black',
  red: 'hover:bg-on-red hover:text-red',
  green: 'hover:bg-on-green hover:text-green',
  yellow: 'hover:bg-on-yellow hover:text-yellow',
  blue: 'hover:bg-on-blue hover:text-blue',
  magenta: 'hover:bg-on-magenta hover:text-magenta',
  cyan: 'hover:bg-on-cyan hover:text-cyan',
  white: 'hover:bg-on-white hover:text-white',
};

export const checkedColorMap: Record<ThemeColor, string> = {
  black: 'data-[state=checked]:bg-black data-[state=checked]:text-on-black',
  red: 'data-[state=checked]:bg-red data-[state=checked]:text-on-red',
  green: 'data-[state=checked]:bg-green data-[state=checked]:text-on-green',
  yellow: 'data-[state=checked]:bg-yellow data-[state=checked]:text-on-yellow',
  blue: 'data-[state=checked]:bg-blue data-[state=checked]:text-on-blue',
  magenta: 'data-[state=checked]:bg-magenta data-[state=checked]:text-on-magenta',
  cyan: 'data-[state=checked]:bg-cyan data-[state=checked]:text-on-cyan',
  white: 'data-[state=checked]:bg-white data-[state=checked]:text-on-white',
};

export const onColorMap: Record<ThemeColor, string> = {
  black: 'data-[state=on]:bg-black data-[state=on]:text-on-black',
  red: 'data-[state=on]:bg-red data-[state=on]:text-on-red',
  green: 'data-[state=on]:bg-green data-[state=on]:text-on-green',
  yellow: 'data-[state=on]:bg-yellow data-[state=on]:text-on-yellow',
  blue: 'data-[state=on]:bg-blue data-[state=on]:text-on-blue',
  magenta: 'data-[state=on]:bg-magenta data-[state=on]:text-on-magenta',
  cyan: 'data-[state=on]:bg-cyan data-[state=on]:text-on-cyan',
  white: 'data-[state=on]:bg-white data-[state=on]:text-on-white',
};
