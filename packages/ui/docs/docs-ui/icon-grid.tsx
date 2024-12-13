import { IconGallery, IconItem } from '@storybook/blocks';
import type React from 'react';

interface IconGridProps {
  groups: Record<string, { largestSvg: string }>;
  filter: string;
  size: number;
}

export const IconGrid: React.FC<IconGridProps> = ({ groups, filter, size }) => (
  <div
    style={{
      '--sb-icon-gallery-columns': '4',
      '--icon-item-size': `${Math.max(size + 32, 64)}px`,
    }}
  >
    <IconGallery>
      {Object.entries(groups)
        .sort(([a], [b]) => a.localeCompare(b))
        .filter(([name]) => name.toLowerCase().includes(filter.toLowerCase()))
        .map(([name, { largestSvg }]) => (
          <IconItem name={name}>
            <div
              className="icon-container"
              style={{
                borderRadius: '4px',
                color: 'rgba(255, 255, 255, 0.9)',
                width: size,
                height: size,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '--icon-scale': `${size / 32}`,
              }}
              dangerouslySetInnerHTML={{
                __html: largestSvg,
              }}
            />
          </IconItem>
        ))}
    </IconGallery>
  </div>
);
