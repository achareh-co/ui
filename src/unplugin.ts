import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defu } from 'defu'
import { createUnplugin } from 'unplugin'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { appConfigFromOptions, getTemplates } from './templates'
import { defaultOptions, type ModuleOptions } from './utils/defaults'

export interface AcmeUIOptions extends ModuleOptions {
  /** Generate `components.d.ts` and `auto-imports.d.ts`. @default true */
  dts?: boolean
  /** Same shape as Nuxt `app.config.ts` `ui`. */
  ui?: Record<string, any>
  /** Set `false` to skip composable auto-imports. */
  autoImport?: false | Record<string, any>
  /** Set `false` to skip component auto-imports. */
  components?: false | Record<string, any>
}

export function resolveRuntimeDir(metaUrl = import.meta.url) {
  return fileURLToPath(new URL('./runtime', metaUrl))
}

function resolveWithExtension(base: string) {
  for (const extension of ['.ts', '.mjs', '.js']) {
    if (existsSync(base + extension)) {
      return base + extension
    }
  }
  return `${base}.ts`
}

export const AcmeUIPlugin = createUnplugin<AcmeUIOptions>((rawOptions = {}) => {
  const options = defu(rawOptions, defaultOptions) as AcmeUIOptions & { theme: NonNullable<ModuleOptions['theme']> }
  const appConfig = appConfigFromOptions(options.ui)
  const runtimeDir = resolveRuntimeDir()
  const importsStub = resolveWithExtension(join(runtimeDir, 'vue/stubs/imports'))
  const templates = getTemplates(options)

  async function writeTemplates(root: string) {
    const dir = join(root, 'node_modules', '.nuxt-ui')
    const aliases: Record<string, string> = {}

    for (const template of templates) {
      if (!template.write || !template.filename || !template.getContents) {
        continue
      }

      const filePath = join(dir, template.filename)
      mkdirSync(dirname(filePath), { recursive: true })
      const contents = await template.getContents({} as any)
      let existing: string | null = null
      try {
        existing = readFileSync(filePath, 'utf8')
      }
      catch (error: any) {
        if (error.code !== 'ENOENT') {
          throw error
        }
      }
      if (existing !== contents) {
        writeFileSync(filePath, contents)
      }

      const id = `#build/${template.filename.replace(/\.ts$/, '')}`
      aliases[id] = filePath
      aliases[`#build/${template.filename}`] = filePath
    }

    return aliases
  }

    return [
    {
      name: 'acme:ui:nuxt-env',
      enforce: 'pre',
      resolveId(id) {
        if (id === '#imports') {
          return importsStub
        }
        if (id === '#build/app.config') {
          return '\0acme-ui-app-config'
        }
      },
      load(id) {
        if (id === '\0acme-ui-app-config') {
          return `export default ${JSON.stringify(appConfig)}\n`
        }
      }
    },
    {
      name: 'acme:ui:templates',
      enforce: 'pre',
      vite: {
        async config(config) {
          const root = resolve(config.root || '.')
          const alias = await writeTemplates(root)
          return {
            resolve: {
              alias
            },
            optimizeDeps: {
              exclude: ['@acme/ui']
            }
          }
        }
      }
    }
  ]
})

/**
 * Tailwind, auto-import, and component resolvers as real Vite plugins.
 * Vite 7 drops plugins returned from another plugin's `config()` hook, and
 * component resolvers must run after `@vitejs/plugin-vue` compiles the SFC.
 */
export function createViteIntegrations(rawOptions?: AcmeUIOptions): any[] {
  const options = defu(rawOptions, defaultOptions) as AcmeUIOptions
  const runtimeDir = resolveRuntimeDir()

  const autoImport = options.autoImport !== false && AutoImport({
    dts: options.dts === false ? false : 'auto-imports.d.ts',
    imports: [
      {
        from: resolveWithExtension(join(runtimeDir, 'composables/useComponentProps')),
        imports: ['useComponentProps']
      }
    ],
    ...(options.autoImport || {})
  })

  const components = options.components !== false && Components({
    dts: options.dts === false ? false : 'components.d.ts',
    resolvers: [
      (componentName: string) => {
        const prefix = options.prefix || 'U'
        if (!componentName.startsWith(prefix)) {
          return
        }
        const file = join(runtimeDir, 'components', `${componentName.slice(prefix.length)}.vue`)
        if (!existsSync(file)) {
          return
        }
        return {
          name: 'default',
          from: file
        }
      }
    ],
    ...(options.components || {})
  })

  const componentPlugins = [components].flat(2).filter(Boolean).map(plugin => ({
    ...plugin,
    enforce: 'post' as const
  }))

  return [tailwindcss(), autoImport, ...componentPlugins].flat(2).filter(Boolean)
}

export default AcmeUIPlugin
