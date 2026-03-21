import fs from 'node:fs';
import path from 'node:path';

/**
 * Script to sort registry.json alphabetically and deterministically.
 * This ensures clean diffs and predictable structure.
 * Run with: bun run sort_registry.js
 */

const REGISTRY_PATH = path.join(process.cwd(), 'registry.json');

if (!fs.existsSync(REGISTRY_PATH)) {
  console.error(`Error: registry.json not found at ${REGISTRY_PATH}`);
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));

/**
 * Deeply sort object keys and certain arrays
 */
function deepSort(obj, preferredKeyOrder = []) {
  if (Array.isArray(obj)) {
    // If it's the items array, sort by name
    if (obj.length > 0 && obj[0] && obj[0].name) {
      obj.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }
    // If it's a files array, sort by path
    else if (obj.length > 0 && obj[0] && obj[0].path) {
      obj.sort((a, b) => (a.path || '').localeCompare(b.path || ''));
    }
    // For simple arrays of strings (dependencies), sort them
    else if (obj.length > 0 && typeof obj[0] === 'string') {
      obj.sort();
    }

    return obj.map((item) => {
      // For each item in the items array, use a specific key order
      if (item !== null && typeof item === 'object' && item.name) {
        return deepSort(item, ['name', 'type', 'registryDependencies', 'dependencies', 'devDependencies', 'files']);
      }
      return deepSort(item);
    });
  } else if (obj !== null && typeof obj === 'object') {
    const keys = Object.keys(obj);

    // Filter out preferred keys that don't exist in the current object
    const actualPreferred = preferredKeyOrder.filter((k) => keys.includes(k));
    // Remaining keys sorted alphabetically
    const otherKeys = keys.filter((k) => !preferredKeyOrder.includes(k)).sort();

    const sortedKeys = [...actualPreferred, ...otherKeys];

    return sortedKeys.reduce((acc, key) => {
      acc[key] = deepSort(obj[key]);
      return acc;
    }, {});
  }
  return obj;
}

// Define the preferred order for the root object
const ROOT_KEY_ORDER = ['$schema', 'name', 'homepage', 'aliases', 'items'];
const sortedRegistry = deepSort(registry, ROOT_KEY_ORDER);

fs.writeFileSync(REGISTRY_PATH, JSON.stringify(sortedRegistry, null, 2) + '\n');
console.log('✅ registry.json sorted with custom ordering successfully!');
