#!/usr/bin/env bun

import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

type DeepObject = { [key: string]: any };

interface VariableInfo {
  name: string;
  value: string;
  selector: string;
}

type Format = 'json' | 'yaml' | 'text';

interface Options {
  format: Format;
  split?: string;
}

function selectorToId(selector: string): string {
  if (selector === ':root') return 'root';
  if (selector === '::backdrop') return 'backdrop';

  // Extract theme and editor values
  const themeMatch = selector.match(/data-preferred-theme="([^"]+)"/);
  const editorMatch = selector.match(/data-editor-theme="([^"]+)"/);
  const fplMatch = selector.match(/data-fpl-([^=]+)="([^"]+)"/);

  const parts: string[] = [];

  if (themeMatch) {
    parts.push(themeMatch[1]);
  }

  if (selector.includes(':not')) {
    parts.push('not');
  }

  if (editorMatch) {
    parts.push(editorMatch[1]);
  }

  if (fplMatch) {
    parts.push(`${fplMatch[1]}_${fplMatch[2]}`);
  }

  return parts.join('_') || selector;
}

function addPathToObject(
  obj: DeepObject,
  pathSegments: string[],
  valueStr: string,
  selector: string,
): void {
  const segments = pathSegments.filter((segment) => segment !== '');
  if (segments.length === 0) return;

  let current = obj;
  const lastIndex = segments.length - 1;

  // Create path
  for (let i = 0; i < lastIndex; i++) {
    const segment = segments[i];
    current[segment] = current[segment] || {};
    current = current[segment];
  }

  // Set leaf node
  const lastSegment = segments[lastIndex];
  const finalValue = valueStr.startsWith('var(--')
    ? valueStr.slice(4, -1)
    : valueStr;

  if (!current[lastSegment]) {
    current[lastSegment] = {
      value: finalValue,
      rules: [selector],
    };
  } else {
    if (!current[lastSegment].rules) {
      current[lastSegment].rules = [];
    }
    if (!current[lastSegment].rules.includes(selector)) {
      current[lastSegment].rules.push(selector);
    }
  }
}

function collectSelectors(variables: VariableInfo[]): Map<string, string> {
  const selectors = new Map<string, string>();

  for (const { selector } of variables) {
    if (selector === ':root') continue;
    const id = selectorToId(selector);
    if (id && !selectors.has(id)) {
      selectors.set(id, selector);
    }
  }

  return selectors;
}

function formatJsonOutput(
  tree: DeepObject,
  selectors: Map<string, string>,
): string {
  const output: DeepObject = {
    definitions: {
      rules: Object.fromEntries(selectors),
    },
  };

  // Add the tree
  Object.assign(output, tree);

  return JSON.stringify(output, null, 2);
}

function formatYamlOutput(
  tree: DeepObject,
  selectors: Map<string, string>,
): string {
  const definitions = selectors.entries();
  const selectorDefs = Array.from(definitions)
    .map(([id, selector]) => `    ${id}:\n      &${id} '${selector}'`)
    .join('\n');

  const yamlTree = formatValue(tree, 0);

  return `definitions:
  rules:
${selectorDefs}

${yamlTree}`;
}

function formatValue(value: any, indent: number): string {
  if (!value || typeof value !== 'object') {
    return value === ':root' ? `"${value}"` : String(value);
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const spaces = ' '.repeat(indent);
    return value
      .map((item) => {
        if (Array.isArray(item)) {
          const itemRefs = item
            .map((i) => (i === ':root' ? `"${i}"` : `*${selectorToId(i)}`))
            .join(', ');
          return `${spaces}- [${itemRefs}]`;
        }
        const itemRef =
          item === ':root' ? `"${item}"` : `*${selectorToId(item)}`;
        return `${spaces}- ${itemRef}`;
      })
      .join('\n');
  }

  const spaces = ' '.repeat(indent);
  return Object.entries(value)
    .map(([k, v]) => {
      if (k === 'rules') {
        const rulesValue = formatValue(v, indent + 2);
        return `${spaces}${k}:\n${rulesValue}`;
      }
      const propValue = formatValue(v, indent + 2);
      if (propValue.includes('\n')) {
        return `${spaces}${k}:\n${propValue}`;
      }
      return `${spaces}${k}: ${propValue}`;
    })
    .join('\n');
}

function formatTextOutput(tree: DeepObject): string {
  const paths: string[] = [];

  const traverse = (obj: DeepObject, path: string[] = []) => {
    for (const key in obj) {
      const value = obj[key];
      const currentPath = [...path, key];

      if (value && typeof value === 'object' && !Array.isArray(value.rules)) {
        traverse(value, currentPath);
      } else {
        paths.push(`--${currentPath.join('-')}`);
      }
    }
  };

  traverse(tree);
  return paths.sort().join('\n');
}

async function processCSSFile(filePath: string): Promise<VariableInfo[]> {
  const content = await readFile(filePath, 'utf-8');
  const variables: VariableInfo[] = [];
  let currentSelector = ':root';

  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.includes('{')) {
      currentSelector = line.split('{')[0].trim();
      continue;
    }

    if (!line.includes('--')) continue;

    const match = line.match(/--([a-zA-Z0-9-]+):\s*([^;]+);?/);
    if (match) {
      variables.push({
        name: match[1],
        value: match[2].trim(),
        selector: currentSelector,
      });
    }
  }

  return variables;
}

async function processDirectory(
  dirPath: string,
): Promise<{ tree: DeepObject; selectors: Map<string, string> }> {
  const tree: DeepObject = {};
  const stats = await stat(dirPath);

  if (!stats.isDirectory()) {
    throw new Error(`${dirPath} is not a directory`);
  }

  const entries = await readdir(dirPath, { withFileTypes: true });
  const cssFiles = entries.filter(
    (entry) => entry.isFile() && entry.name.endsWith('.css'),
  );

  let allVariables: VariableInfo[] = [];
  for (const file of cssFiles) {
    const filePath = join(dirPath, file.name);
    const variables = await processCSSFile(filePath);
    allVariables = allVariables.concat(variables);
  }

  const selectors = collectSelectors(allVariables);

  for (const { name, value, selector } of allVariables) {
    const path = name.split('-');
    addPathToObject(tree, path, value, selector);
  }

  return { tree, selectors };
}

async function splitByFirstSegment(
  tree: DeepObject,
  selectors: Map<string, string>,
  outputDir: string,
  format: Format,
): Promise<void> {
  await mkdir(outputDir, { recursive: true });

  for (const [segment, subtree] of Object.entries(tree)) {
    if (segment === '') continue;
    const outputPath = join(
      outputDir,
      `${segment}.${format === 'yaml' ? 'yml' : format}`,
    );
    const content =
      format === 'json'
        ? formatJsonOutput({ [segment]: subtree }, selectors)
        : format === 'yaml'
          ? formatYamlOutput({ [segment]: subtree }, selectors)
          : formatTextOutput({ [segment]: subtree });
    await writeFile(outputPath, content);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const options: Options = {
  format: 'json',
};

let directoryPath = '.';

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--format' && i + 1 < args.length) {
    const format = args[++i] as Format;
    if (!['json', 'yaml', 'text'].includes(format)) {
      console.error('Invalid format. Must be json, yaml, or text');
      process.exit(1);
    }
    options.format = format;
  } else if (arg === '--split' && i + 1 < args.length) {
    options.split = args[++i];
  } else {
    directoryPath = arg;
  }
}

try {
  const { tree, selectors } = await processDirectory(directoryPath);

  if (options.split) {
    await splitByFirstSegment(tree, selectors, options.split, options.format);
  } else {
    const output =
      options.format === 'json'
        ? formatJsonOutput(tree, selectors)
        : options.format === 'yaml'
          ? formatYamlOutput(tree, selectors)
          : formatTextOutput(tree);
    console.log(output);
  }
} catch (error) {
  console.error('Error:', error);
  process.exit(1);
}
