import type { Warning } from 'svelte/types/compiler/interfaces';

export function formatWarningLog(warning: Warning) {
  const { filename, start, message, frame } = warning;
  const location = start
    ? `${filename}:${start.line}:${start.column}`
    : filename;

  return `[vite-plugin-svelte] ${location} ${message}\n\n${frame}`;
}
