import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const REPO_URL = 'https://github.com/mbadolato/iTerm2-Color-Schemes';
const TMP_DIR = join(process.cwd(), 'tmp/iTerm2-Color-Schemes');
const WINDOWS_TERMINAL_DIR = join(TMP_DIR, 'windowsterminal');
const MAIN_COLORS_CSS = join(process.cwd(), 'src/lib/registry/ui/style/colors.css');
const THEMES_JSON = join(process.cwd(), 'src/lib/registry/ui/style/themes.json');

// ANSI escape codes
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';

function cloneRepoIfNeeded() {
  if (!existsSync(WINDOWS_TERMINAL_DIR)) {
    console.log(`${CYAN}Cloning iTerm2-Color-Schemes depth 1...${RESET}`);
    mkdirSync(join(process.cwd(), 'tmp'), { recursive: true });
    execSync(`git clone --depth 1 ${REPO_URL} ${TMP_DIR}`, { stdio: 'inherit' });
  }
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleanHex = hex.replace('#', '');
  const num = parseInt(
    cleanHex.length === 3
      ? cleanHex
          .split('')
          .map((c) => c + c)
          .join('')
      : cleanHex,
    16,
  );
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function getLuminance(hex: string): number {
  try {
    const { r, g, b } = hexToRgb(hex);
    const [rs, gs, bs] = [r / 255, g / 255, b / 255].map((val) =>
      val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4),
    );
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  } catch {
    return 0.5;
  }
}

function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface WindowsTerminalScheme {
  name?: string;
  black?: string;
  red?: string;
  green?: string;
  yellow?: string;
  blue?: string;
  purple?: string;
  cyan?: string;
  white?: string;
  brightBlack?: string;
  brightRed?: string;
  brightGreen?: string;
  brightYellow?: string;
  brightBlue?: string;
  brightPurple?: string;
  brightMagenta?: string;
  brightCyan?: string;
  brightWhite?: string;
  background?: string;
  foreground?: string;
}

interface ThemeOption {
  id: string;
  label: string;
  mode: 'light' | 'dark';
}

function processSchemes() {
  const files = readdirSync(WINDOWS_TERMINAL_DIR).filter((f) => f.endsWith('.json'));
  console.log(`${BOLD}${CYAN}Found ${files.length} JSON theme files.${RESET}\n`);

  const themes: ThemeOption[] = [];
  const generatedIds = new Set<string>();
  const cssBlocks: string[] = [];

  let passCount = 0;
  let failCount = 0;

  // Helper to calculate Min, Max, Mode, and Avg contrast ratios for an array of contrast values
  const getStats = (values: number[]) => {
    if (values.length === 0) return { min: 0, max: 0, mode: 0, avg: 0 };
    const min = Math.min(...values);
    const max = Math.max(...values);
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;

    // Calculate mode rounded to 1 decimal place
    const counts: Record<string, number> = {};
    let maxCount = 0;
    let modeVal = values[0];
    for (const val of values) {
      const rounded = val.toFixed(1);
      counts[rounded] = (counts[rounded] || 0) + 1;
      if (counts[rounded] > maxCount) {
        maxCount = counts[rounded];
        modeVal = parseFloat(rounded);
      }
    }
    return { min, max, mode: modeVal, avg };
  };

  // Print Table Header
  const header = `| ${'Status'.padEnd(6)} | ${'Theme Name'.padEnd(24)} | ${'Main BG/FG'.padEnd(10)} | ${'Bright'.padEnd(6)} | ${'Min'.padEnd(5)} | ${'Max'.padEnd(5)} | ${'Mode'.padEnd(5)} | ${'Avg'.padEnd(5)} |`;
  const separator = `+${'-'.repeat(8)}+${'-'.repeat(26)}+${'-'.repeat(12)}+${'-'.repeat(8)}+${'-'.repeat(7)}+${'-'.repeat(7)}+${'-'.repeat(7)}+${'-'.repeat(7)}+`;

  console.log(separator);
  console.log(header);
  console.log(separator);

  for (const file of files) {
    const filePath = join(WINDOWS_TERMINAL_DIR, file);
    let content: WindowsTerminalScheme;
    try {
      content = JSON.parse(readFileSync(filePath, 'utf-8'));
    } catch {
      continue;
    }

    const rawName = content.name || basename(file, '.json');
    let id = slugify(rawName);
    if (!id) id = slugify(basename(file, '.json'));
    if (!id) continue;

    if (generatedIds.has(id)) {
      id = `${id}-${slugify(basename(file, '.json'))}`;
    }

    const bg = content.background || '#000000';
    const fg = content.foreground || '#ffffff';

    const themeContrast = getContrastRatio(bg, fg);

    const black = content.black || '#000000';
    const red = content.red || '#ff0000';
    const green = content.green || '#00ff00';
    const yellow = content.yellow || '#ffff00';
    const blue = content.blue || '#0000ff';
    const magenta = content.purple || content.brightMagenta || '#ff00ff';
    const cyan = content.cyan || '#00ffff';
    const white = content.white || '#ffffff';

    const brightBlack = content.brightBlack || black;
    const brightRed = content.brightRed || red;
    const brightGreen = content.brightGreen || green;
    const brightYellow = content.brightYellow || yellow;
    const brightBlue = content.brightBlue || blue;
    const brightMagenta = content.brightPurple || content.brightMagenta || magenta;
    const brightCyan = content.brightCyan || cyan;
    const brightWhite = content.brightWhite || white;

    const isBrightDifferent =
      brightBlack.toLowerCase() !== black.toLowerCase() ||
      brightRed.toLowerCase() !== red.toLowerCase() ||
      brightGreen.toLowerCase() !== green.toLowerCase() ||
      brightYellow.toLowerCase() !== yellow.toLowerCase() ||
      brightBlue.toLowerCase() !== blue.toLowerCase() ||
      brightMagenta.toLowerCase() !== magenta.toLowerCase() ||
      brightCyan.toLowerCase() !== cyan.toLowerCase() ||
      brightWhite.toLowerCase() !== white.toLowerCase();

    const getContrastText = (bgColor: string) => {
      const candidates = [fg, bg, '#ffffff', '#000000'];
      let bestCandidate = fg;
      let maxRatio = -1;

      for (const cand of candidates) {
        const ratio = getContrastRatio(bgColor, cand);
        if (ratio > maxRatio) {
          maxRatio = ratio;
          bestCandidate = cand;
        }
      }
      return bestCandidate;
    };

    const textOnBlack = getContrastText(black);
    const textOnRed = getContrastText(red);
    const textOnGreen = getContrastText(green);
    const textOnYellow = getContrastText(yellow);
    const textOnBlue = getContrastText(blue);
    const textOnMagenta = getContrastText(magenta);
    const textOnCyan = getContrastText(cyan);
    const textOnWhite = getContrastText(white);

    const textOnBrightBlack = getContrastText(brightBlack);
    const textOnBrightRed = getContrastText(brightRed);
    const textOnBrightGreen = getContrastText(brightGreen);
    const textOnBrightYellow = getContrastText(brightYellow);
    const textOnBrightBlue = getContrastText(brightBlue);
    const textOnBrightMagenta = getContrastText(brightMagenta);
    const textOnBrightCyan = getContrastText(brightCyan);
    const textOnBrightWhite = getContrastText(brightWhite);

    const all16Contrast = [
      getContrastRatio(black, textOnBlack),
      getContrastRatio(red, textOnRed),
      getContrastRatio(green, textOnGreen),
      getContrastRatio(yellow, textOnYellow),
      getContrastRatio(blue, textOnBlue),
      getContrastRatio(magenta, textOnMagenta),
      getContrastRatio(cyan, textOnCyan),
      getContrastRatio(white, textOnWhite),
      getContrastRatio(brightBlack, textOnBrightBlack),
      getContrastRatio(brightRed, textOnBrightRed),
      getContrastRatio(brightGreen, textOnBrightGreen),
      getContrastRatio(brightYellow, textOnBrightYellow),
      getContrastRatio(brightBlue, textOnBrightBlue),
      getContrastRatio(brightMagenta, textOnBrightMagenta),
      getContrastRatio(brightCyan, textOnBrightCyan),
      getContrastRatio(brightWhite, textOnBrightWhite),
    ];

    const stats = getStats(all16Contrast);
    const cMin = stats.min.toFixed(1).padEnd(5);
    const cMax = stats.max.toFixed(1).padEnd(5);
    const cMode = stats.mode.toFixed(1).padEnd(5);
    const cAvg = stats.avg.toFixed(1).padEnd(5);

    const brightCol = isBrightDifferent ? `${CYAN}Yes${RESET}   ` : `${RED}No${RESET}    `;

    if (!isBrightDifferent) {
      failCount++;
      const nameStr = rawName.substring(0, 24).padEnd(24);
      const mainStr = `${themeContrast.toFixed(1)}:1`.padEnd(10);
      console.log(
        `| ${RED}SKIP${RESET}   | ${DIM}${nameStr}${RESET} | ${mainStr} | ${brightCol} | ${cMin} | ${cMax} | ${cMode} | ${cAvg} |`,
      );
      continue;
    }

    if (themeContrast < 3.0) {
      failCount++;
      const nameStr = rawName.substring(0, 24).padEnd(24);
      const mainStr = `${themeContrast.toFixed(1)}:1`.padEnd(10);
      console.log(
        `| ${RED}SKIP${RESET}   | ${DIM}${nameStr}${RESET} | ${RED}${mainStr}${RESET} | ${brightCol} | ${cMin} | ${cMax} | ${cMode} | ${cAvg} |`,
      );
      continue;
    }

    passCount++;
    generatedIds.add(id);

    const nameStr = rawName.substring(0, 24).padEnd(24);
    const mainStr = `${themeContrast.toFixed(1)}:1`.padEnd(10);

    console.log(
      `| ${GREEN}KEEP${RESET}   | ${BOLD}${nameStr}${RESET} | ${GREEN}${mainStr}${RESET} | ${brightCol} | ${cMin} | ${cMax} | ${cMode} | ${cAvg} |`,
    );

    cssBlocks.push(`[data-theme='${id}'] {
  --black: ${black};
  --red: ${red};
  --green: ${green};
  --yellow: ${yellow};
  --blue: ${blue};
  --magenta: ${magenta};
  --cyan: ${cyan};
  --white: ${white};

  --bright-black: ${brightBlack};
  --bright-red: ${brightRed};
  --bright-green: ${brightGreen};
  --bright-yellow: ${brightYellow};
  --bright-blue: ${brightBlue};
  --bright-magenta: ${brightMagenta};
  --bright-cyan: ${brightCyan};
  --bright-white: ${brightWhite};

  --text-on-black: ${textOnBlack};
  --text-on-red: ${textOnRed};
  --text-on-green: ${textOnGreen};
  --text-on-yellow: ${textOnYellow};
  --text-on-blue: ${textOnBlue};
  --text-on-magenta: ${textOnMagenta};
  --text-on-cyan: ${textOnCyan};
  --text-on-white: ${textOnWhite};

  --text-on-bright-black: ${textOnBrightBlack};
  --text-on-bright-red: ${textOnBrightRed};
  --text-on-bright-green: ${textOnBrightGreen};
  --text-on-bright-yellow: ${textOnBrightYellow};
  --text-on-bright-blue: ${textOnBrightBlue};
  --text-on-bright-magenta: ${textOnBrightMagenta};
  --text-on-bright-cyan: ${textOnBrightCyan};
  --text-on-bright-white: ${textOnBrightWhite};

  --primary-background: ${bg};
  --primary-foreground: ${fg};
}`);

    const mode: 'light' | 'dark' = getLuminance(bg) < 0.2 ? 'dark' : 'light';
    themes.push({
      id,
      label: rawName,
      mode,
    });
  }

  console.log(separator);

  // Sort themes strictly alphabetically A-Z
  themes.sort((a, b) => a.label.localeCompare(b.label));

  for (const mode of ['dark', 'light'] as const) {
    if (!themes.some((theme) => theme.mode === mode)) {
      throw new Error(`Theme generation produced no ${mode} themes; refusing to write invalid generated data.`);
    }
  }

  console.log(`\n${BOLD}=====================================${RESET}`);
  console.log(`${GREEN}Accepted Themes: ${passCount}${RESET}`);
  console.log(`${RED}Filtered Out (Low Contrast <3.0:1): ${failCount}${RESET}`);
  console.log(`${BOLD}=====================================${RESET}\n`);

  writeFileSync(MAIN_COLORS_CSS, cssBlocks.join('\n\n') + '\n', 'utf-8');
  console.log(`${GREEN}Updated ${MAIN_COLORS_CSS} (${cssBlocks.length} rules).${RESET}`);

  writeFileSync(THEMES_JSON, JSON.stringify(themes, null, 2) + '\n', 'utf-8');
  console.log(`${GREEN}Updated ${THEMES_JSON} (${themes.length} themes).${RESET}`);
}

function main() {
  cloneRepoIfNeeded();
  processSchemes();
}

main();
