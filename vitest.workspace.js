import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./vite.config.ts",
  "./dist/config/vite.config.js",
  "./src/lib/config/vite.config.ts"
])
