import React from 'react';
import * as icons from '../../src/lib/icons/ui3';

interface IconPreviewProps {
  icon: string;
  size?: number;
}

const IconPreview: React.FC<IconPreviewProps> = ({ icon, size = 24 }) => {
  // If icon is a path (starts with $ or contains /)
  if (icon.startsWith('$') || icon.includes('/')) {
    // For dynamic imports, we need to use React.lazy
    const IconComponent = React.lazy(() => {
      const path = icon.startsWith('$') ? icon.replace('#icons', '../../src/lib/icons') : icon;
      return import(path);
    });

    return (
      <React.Suspense fallback={<div style={{ width: size, height: size }} />}>
        <div style={{ width: size, height: size }}>
          <IconComponent width={size} height={size} />
        </div>
      </React.Suspense>
    );
  }

  // If icon is a name from the icons import
  const IconComponent = icons[icon as keyof typeof icons];

  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found`);
    return null;
  }

  return (
    <div style={{ width: size, height: size }}>
      <IconComponent width={size} height={size} />
    </div>
  );
};

export default IconPreview;
