import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { ViteUserConfig } from 'vitest/config'

export const config = defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
} as ViteUserConfig)

export default config
