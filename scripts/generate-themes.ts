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

  // Print Table Header
  const header = `| ${'Status'.padEnd(6)} | ${'Theme Name'.padEnd(26)} | ${'Main BG/FG'.padEnd(10)} | ${'Blk'.padEnd(5)} | ${'Red'.padEnd(5)} | ${'Grn'.padEnd(5)} | ${'Yel'.padEnd(5)} | ${'Blu'.padEnd(5)} | ${'Mag'.padEnd(5)} | ${'Cya'.padEnd(5)} | ${'Wht'.padEnd(5)} |`;
  const separator = `+${'-'.repeat(8)}+${'-'.repeat(28)}+${'-'.repeat(12)}+${'-'.repeat(7)}+${'-'.repeat(7)}+${'-'.repeat(7)}+${'-'.repeat(7)}+${'-'.repeat(7)}+${'-'.repeat(7)}+${'-'.repeat(7)}+${'-'.repeat(7)}+`;

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

    if (themeContrast < 3.0) {
      failCount++;
      const nameStr = rawName.substring(0, 26).padEnd(26);
      const mainStr = `${themeContrast.toFixed(1)}:1`.padEnd(10);
      console.log(
        `| ${RED}SKIP${RESET}   | ${DIM}${nameStr}${RESET} | ${RED}${mainStr}${RESET} | ${'-'.padEnd(5)} | ${'-'.padEnd(5)} | ${'-'.padEnd(5)} | ${'-'.padEnd(5)} | ${'-'.padEnd(5)} | ${'-'.padEnd(5)} | ${'-'.padEnd(5)} | ${'-'.padEnd(5)} |`,
      );
      continue;
    }

    passCount++;
    generatedIds.add(id);

    const black = content.black || '#000000';
    const red = content.red || '#ff0000';
    const green = content.green || '#00ff00';
    const yellow = content.yellow || '#ffff00';
    const blue = content.blue || '#0000ff';
    const magenta = content.purple || '#ff00ff';
    const cyan = content.cyan || '#00ffff';
    const white = content.white || '#ffffff';

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

    const cBlk = getContrastRatio(black, textOnBlack).toFixed(1).padEnd(5);
    const cRed = getContrastRatio(red, textOnRed).toFixed(1).padEnd(5);
    const cGrn = getContrastRatio(green, textOnGreen).toFixed(1).padEnd(5);
    const cYel = getContrastRatio(yellow, textOnYellow).toFixed(1).padEnd(5);
    const cBlu = getContrastRatio(blue, textOnBlue).toFixed(1).padEnd(5);
    const cMag = getContrastRatio(magenta, textOnMagenta).toFixed(1).padEnd(5);
    const cCya = getContrastRatio(cyan, textOnCyan).toFixed(1).padEnd(5);
    const cWht = getContrastRatio(white, textOnWhite).toFixed(1).padEnd(5);

    const nameStr = rawName.substring(0, 26).padEnd(26);
    const mainStr = `${themeContrast.toFixed(1)}:1`.padEnd(10);

    console.log(
      `| ${GREEN}KEEP${RESET}   | ${BOLD}${nameStr}${RESET} | ${GREEN}${mainStr}${RESET} | ${cBlk} | ${cRed} | ${cGrn} | ${cYel} | ${cBlu} | ${cMag} | ${cCya} | ${cWht} |`,
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

  --text-on-black: ${textOnBlack};
  --text-on-red: ${textOnRed};
  --text-on-green: ${textOnGreen};
  --text-on-yellow: ${textOnYellow};
  --text-on-blue: ${textOnBlue};
  --text-on-magenta: ${textOnMagenta};
  --text-on-cyan: ${textOnCyan};
  --text-on-white: ${textOnWhite};

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
