import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '../src/lib/icons');

type IconSize = 8 | 12 | 16 | 32;

interface IconSizeMap {
  [key: string]: IconSize[];
}

function generateIconMapping(): IconSizeMap {
  const iconMap: IconSizeMap = {};
  const sizes: IconSize[] = [8, 12, 16, 32];

  for (const size of sizes) {
    const sizeDir = path.join(iconsDir, `size-${size}`);
    if (fs.existsSync(sizeDir)) {
      const files = fs.readdirSync(sizeDir);
      for (const file of files) {
        if (file.endsWith('.svg')) {
          const iconName = file.replace(`-${size}.svg`, '');
          if (!iconMap[iconName]) {
            iconMap[iconName] = [];
          }
          iconMap[iconName].push(size);
        }
      }
    }
  }

  return iconMap;
}

const iconMap = generateIconMapping();

const iconNames = Object.keys(iconMap);
const iconsBySize: { [key in IconSize]: string[] } = {
  8: [],
  12: [],
  16: [],
  32: [],
};

for (const [name, sizes] of Object.entries(iconMap)) {
  for (const size of sizes) {
    iconsBySize[size as IconSize].push(name);
  }
}

const output = `
// 🚨 DO NOT EDIT DIRECTLY! 🚨
// This file was auto-generated by scripts/generate-icons-types.mts
// Changes will be overwritten when the script is run again.
// To add an icon, create a [NAME]-[SIZE].svg file in the src/icons/size-[SIZE] directory.
export type IconColor =
	| 'icon'
	| 'icon-brand'
	| 'icon-brand-pressed'
	| 'icon-brand-secondary'
	| 'icon-brand-tertiary'
	| 'icon-component'
	| 'icon-component-pressed'
	| 'icon-component-secondary'
	| 'icon-component-tertiary'
	| 'icon-danger'
	| 'icon-danger-hover'
	| 'icon-danger-pressed'
	| 'icon-danger-secondary'
	| 'icon-danger-secondary-hover'
	| 'icon-danger-tertiary'
	| 'icon-disabled'
	| 'icon-hover'
	| 'icon-onbrand'
	| 'icon-onbrand-secondary'
	| 'icon-onbrand-tertiary'
	| 'icon-oncomponent'
	| 'icon-oncomponent-secondary'
	| 'icon-oncomponent-tertiary'
	| 'icon-ondanger'
	| 'icon-ondanger-secondary'
	| 'icon-ondanger-tertiary'
	| 'icon-ondisabled'
	| 'icon-oninverse'
	| 'icon-onselected'
	| 'icon-onselected-secondary'
	| 'icon-onselected-strong'
	| 'icon-onselected-tertiary'
	| 'icon-onsuccess'
	| 'icon-onsuccess-secondary'
	| 'icon-onsuccess-tertiary'
	| 'icon-onwarning'
	| 'icon-onwarning-secondary'
	| 'icon-onwarning-tertiary'
	| 'icon-pressed'
	| 'icon-secondary'
	| 'icon-secondary-hover'
	| 'icon-selected'
	| 'icon-selected-secondary'
	| 'icon-selected-tertiary'
	| 'icon-success'
	| 'icon-success-pressed'
	| 'icon-success-secondary'
	| 'icon-success-tertiary'
	| 'icon-tertiary'
	| 'icon-tertiary-hover'
	| 'icon-warning'
	| 'icon-warning-pressed'
	| 'icon-warning-secondary'
	| 'icon-warning-tertiary';

export type IconSize = 8 | 12 | 16 | 32;

export type IconName =
${iconNames.map((name) => `  | "${name}"`).join('\n')};

type IconSizesByName = {
${iconNames.map((name) => `  "${name}": [${iconMap[name].join(', ')}]`).join(',\n')}
};

type IconsBySize = {
${Object.entries(iconsBySize)
  .map(
    ([size, icons]) =>
      `  ${size}: [${icons.map((icon) => `"${icon}"`).join(', ')}]`,
  )
  .join(',\n')}
};

// Utility types
export type IconOfSize<S extends IconSize> = IconsBySize[S][number];
export type SizeForIcon<T extends IconName> = IconSizesByName[T][number];
export type Icon<S extends IconSize | IconName> = S extends IconSize
  ? IconOfSize<S>
  : S extends IconName
    ? SizeForIcon<S>
    : never;
`;

fs.writeFileSync(path.join(iconsDir, 'icon-types.ts'), output);
console.log('Icon types generated successfully!');
