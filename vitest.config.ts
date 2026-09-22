import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: /^#build\//,
        replacement: fileURLToPath(new URL('./.nuxt/', import.meta.url))
      },
      {
        find: '#imports',
        replacement: fileURLToPath(new URL('./test/mocks/imports.ts', import.meta.url))
      }
    ]
  },
  test: {
    environment: 'happy-dom',
    setupFiles: ['./test/setup.ts'],
    root
  }
})
