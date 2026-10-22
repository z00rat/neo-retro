import fs from 'node:fs';
import path from 'node:path';

/**
 * Script to compare registry.json with the actual filesystem
 * AND validate dependencies + structural integrity.
 * Run with: bun run compare_registry.js
 */

const ROOT_DIR = process.cwd();
const REGISTRY_PATH = path.join(ROOT_DIR, 'registry.json');
const REGISTRY_SRC_DIR = path.join(ROOT_DIR, 'src/lib/registry');

// Ignored files or patterns in FS that are not in registry
const ignoredFiles = ['src/lib/registry/index.ts'];

// Allowed enums from static/registry.json
const ALLOWED_ITEM_TYPES = [
  'registry:file',
  'registry:page',
  'registry:ui',
  'registry:component',
  'registry:lib',
  'registry:hook',
  'registry:theme',
  'registry:style',
  'registry:block',
  'registry:example',
  'registry:internal',
];

const ALLOWED_FILE_TYPES = [
  'registry:file',
  'registry:page',
  'registry:ui',
  'registry:component',
  'registry:lib',
  'registry:hook',
  'registry:theme',
  'registry:style',
];

if (!fs.existsSync(REGISTRY_PATH)) {
  console.error(`Error: registry.json not found at ${REGISTRY_PATH}`);
  process.exit(1);
}

if (!fs.existsSync(REGISTRY_SRC_DIR)) {
  console.error(`Error: src/lib/registry directory not found at ${REGISTRY_SRC_DIR}`);
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));
const registryItems = registry.items || [];

// HELPER: Get all files recursive
const getFilesRecursively = (dir) => {
  try {
    return fs
      .readdirSync(dir, { recursive: true })
      .map((file) => path.join(dir, file))
      .filter((fullPath) => fs.statSync(fullPath).isFile())
      .map((fullPath) => path.relative(ROOT_DIR, fullPath));
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return [];
  }
};

// Map imports
const getImports = (content) => {
  const imports = new Set();
  const regex = /(?:import|from)\s+['"]([^'"]+)['"]|import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    imports.add(match[1] || match[2]);
  }
  return Array.from(imports);
};

const importToRegistryName = (importPath) => {
  if (
    importPath === '#lib/utils' ||
    importPath.startsWith('#lib/utils.') ||
    importPath.includes('$lib/utils') ||
    importPath.includes('/utils')
  )
    return 'utils';
  const uiMatch = importPath.match(/(?:#lib\/ui|\$lib\/registry\/ui|ui)\/([^/]+)/);
  if (uiMatch) return uiMatch[1];
  const hooksMatch = importPath.match(/(?:#lib\/hooks|\$lib\/registry\/hooks|hooks)\/([^/]+)/);
  if (hooksMatch) return hooksMatch[1].replace(/\.(svelte\.ts|ts|js|svelte)$/, '');
  const libMatch = importPath.match(/(?:#lib\/lib|\$lib\/registry\/lib|lib)\/([^/]+)/);
  if (libMatch) return libMatch[1].replace(/\.(ts|js)$/, '');
  const styleMatch = importPath.match(/(?:#lib\/style|\$lib\/registry\/style|style)\/([^/]+)/);
  if (styleMatch) return styleMatch[1].replace(/\.(ts|js|svelte|css)$/, '');
  return null;
};

const importToExternalPackage = (importPath) => {
  if (importPath.startsWith('.') || importPath.startsWith('/')) return null;
  if (
    importPath.startsWith('#lib/') ||
    importPath.startsWith('$lib/') ||
    importPath.startsWith('ui/') ||
    importPath.startsWith('hooks/') ||
    importPath.startsWith('lib/') ||
    importPath.startsWith('style/') ||
    importPath.startsWith('components/')
  )
    return null;
  if (importPath.startsWith('node:')) return null;
  if (importPath.startsWith('@')) {
    const parts = importPath.split('/');
    // Check if second part is a subpath of a package or part of scoped package name
    // Scoped package name is @scope/package. If import is @scope/package/subpath, return @scope/package
    return parts.slice(0, 2).join('/');
  }
  return importPath.split('/')[0];
};

const allFsFiles = getFilesRecursively(REGISTRY_SRC_DIR).filter((f) => !ignoredFiles.includes(f));
const initItem = registryItems.find((i) => i.name === 'init');
const initDevDeps = new Set(initItem ? initItem.devDependencies || [] : []);
const initDeps = new Set(initItem ? initItem.dependencies || [] : []);

const itemFileMap = {};
registryItems.forEach((item) => {
  itemFileMap[item.name] = (item.files || []).map((f) => f.path);
});

// --- VALIDATION DATA ---
const structuralIssues = [];
const fileDeltas = [];
const depDeltas = [];
const unregisteredFiles = allFsFiles.filter(
  (f) => !registryItems.some((item) => (item.files || []).some((rf) => rf.path === f)),
);

registryItems.forEach((item) => {
  const issues = [];

  // 1. Structural Checks
  if (!item.name) issues.push('Missing name');
  if (!item.type) issues.push('Missing type');
  else if (!ALLOWED_ITEM_TYPES.includes(item.type)) issues.push(`Invalid type: ${item.type}`);

  if (!item.registryDependencies) issues.push('Missing registryDependencies array');

  if (item.files && item.files.length > 0) {
    item.files.forEach((f) => {
      if (!f.path) issues.push('File missing path');
      if (!f.type) issues.push(`File ${f.path} missing type`);
      else if (!ALLOWED_FILE_TYPES.includes(f.type)) issues.push(`File ${f.path} has invalid type: ${f.type}`);
      if (f.path && !fs.existsSync(path.join(ROOT_DIR, f.path))) {
        fileDeltas.push({ item: item.name, path: f.path, status: 'Missing in FS' });
      }
    });
  }

  if (issues.length > 0) structuralIssues.push({ item: item.name || 'Unknown', issues });

  // 2. Dependency Checks
  const actualRegistryDeps = new Set();
  const actualExternalPkgs = new Set();

  (itemFileMap[item.name] || []).forEach((f) => {
    const fullPath = path.join(ROOT_DIR, f);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
      const content = fs.readFileSync(fullPath, 'utf8');
      getImports(content).forEach((imp) => {
        const regDep = importToRegistryName(imp);
        if (regDep && regDep !== item.name && itemFileMap[regDep]) actualRegistryDeps.add(regDep);

        const extPkg = importToExternalPackage(imp);
        if (extPkg) actualExternalPkgs.add(extPkg);
      });
    }
  });

  const expectedRegDeps = new Set(item.registryDependencies || []);
  const missingReg = Array.from(actualRegistryDeps).filter((d) => d !== 'utils' && !expectedRegDeps.has(d));
  const extraReg = Array.from(expectedRegDeps).filter((d) => {
    if (item.name === 'init') return false;
    return !actualRegistryDeps.has(d);
  });

  const expectedDeps = new Set(item.dependencies || []);
  const expectedDevDeps = new Set(item.devDependencies || []);

  const missingExternal = Array.from(actualExternalPkgs).filter(
    (pkg) => !expectedDeps.has(pkg) && !expectedDevDeps.has(pkg) && !initDeps.has(pkg) && !initDevDeps.has(pkg),
  );

  const extraExternal = [...expectedDeps, ...expectedDevDeps].filter((pkg) => {
    if (item.name === 'init') return false;
    return !actualExternalPkgs.has(pkg) || initDeps.has(pkg) || initDevDeps.has(pkg);
  });

  if (missingReg.length > 0 || extraReg.length > 0 || missingExternal.length > 0 || extraExternal.length > 0) {
    depDeltas.push({ item: item.name, missingReg, extraReg, missingExternal, extraExternal });
  }
});

// --- REPORT PRINTING ---
const red = (t) => `\x1b[31m${t}\x1b[0m`;
const green = (t) => `\x1b[32m${t}\x1b[0m`;
const yellow = (t) => `\x1b[33m${t}\x1b[0m`;
const blue = (t) => `\x1b[34m${t}\x1b[0m`;
const bold = (t) => `\x1b[1m${t}\x1b[0m`;

console.log(`\n${bold(blue('=== REGISTRY VS FILESYSTEM INTEGRITY REPORT ==='))}\n`);

let hasErrors = false;

// 1. UNREGISTERED FILES
if (unregisteredFiles.length > 0) {
  hasErrors = true;
  console.log(`${bold(yellow('[!] UNREGISTERED FILES'))} (In FS but not in registry.json)`);
  unregisteredFiles.forEach((f) => console.log(`  ${red('[X]')} ${f}`));
  console.log('');
}

// 2. STRUCTURAL ISSUES
if (structuralIssues.length > 0) {
  hasErrors = true;
  console.log(`${bold(red('[X] STRUCTURAL ERRORS'))} (Missing fields or invalid enums)`);
  structuralIssues.forEach((s) => {
    console.log(`  ${bold(s.item)}:`);
    s.issues.forEach((i) => console.log(`    - ${i}`));
  });
  console.log('');
}

// 3. FILE SYNC
if (fileDeltas.length > 0) {
  hasErrors = true;
  console.log(`${bold(red('[X] FILE SYNC ERRORS'))} (Registry paths pointing to non-existent files)`);
  fileDeltas.forEach((d) => console.log(`  ${bold(d.item)}: ${red(d.path)} (${d.status})`));
  console.log('');
}

// 4. DEPENDENCY SYNC
if (depDeltas.length > 0) {
  hasErrors = true;
  console.log(`${bold(yellow('[!] DEPENDENCY MISMATCHES'))}`);
  depDeltas.forEach((d) => {
    console.log(`  ${bold(d.item)}:`);
    if (d.missingReg.length > 0) console.log(`    ${red('Missing')} Registry Dependencies: ${d.missingReg.join(', ')}`);
    if (d.extraReg.length > 0) console.log(`    ${yellow('Extra')} Registry Dependencies: ${d.extraReg.join(', ')}`);
    if (d.missingExternal.length > 0)
      console.log(
        `    ${red('Missing')} Packages: ${d.missingExternal.join(', ')} (Add to dependencies OR devDependencies)`,
      );
    if (d.extraExternal.length > 0)
      console.log(`    ${yellow('Superfluous')} Packages (or provided by init): ${d.extraExternal.join(', ')}`);
  });
  console.log('');
}

console.log(`${bold(blue('=============================================='))}`);
if (!hasErrors) {
  console.log(`${green('[OK] SUCCESS:')} System is perfectly in sync!`);
} else {
  console.log(`${red('[FAIL]:')} Integrity issues detected. Review the report above.`);
}
console.log(`${bold(blue('=============================================='))}\n`);

if (hasErrors) process.exit(1);
