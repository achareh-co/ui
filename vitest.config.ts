import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig, type Plugin } from 'vitest/config'

const root = fileURLToPath(new URL('.', import.meta.url))
const themeIndex = fileURLToPath(new URL('./src/theme/index.ts', import.meta.url))
const resolveThemeFile = fileURLToPath(new URL('./src/utils/theme.ts', import.meta.url))

/**
 * Serves `#build/ui/<kebab>` from `src/theme` on every run, so specs never read a stale `.nuxt/ui`.
 */
function sourceTheme(): Plugin {
  const prefix = '\0achareh-test-theme:'
  const camelCase = (value: string) => value.replace(/-([a-z0-9])/g, (_, char: string) => char.toUpperCase())

  return {
    name: 'achareh:test-theme',
    enforce: 'pre',
    resolveId(id) {
      const match = id.match(/^#build\/ui\/([\w-]+?)(?:\.ts)?$/)
      if (match) {
        return prefix + match[1]
      }
    },
    load(id) {
      if (!id.startsWith(prefix)) {
        return
      }
      const name = id.slice(prefix.length)
      return `import * as themes from ${JSON.stringify(themeIndex)}
import { resolveTheme } from ${JSON.stringify(resolveThemeFile)}
const theme = themes[${JSON.stringify(camelCase(name))}]
if (!theme) throw new Error('No theme export for #build/ui/${name}')
export default resolveTheme(theme, {})
`
    }
  }
}

export default defineConfig({
  plugins: [sourceTheme(), vue()],
  resolve: {
    alias: [
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
