import { defu } from 'defu'
import { addComponentsDir, addImports, addTemplate, addTypeTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'
import { getTemplates } from './templates'
import { defaultOptions, getDefaultConfig, type ModuleOptions } from './utils/defaults'

export type { ModuleOptions, ThemeOptions } from './utils/defaults'

function registerTemplates(options: ModuleOptions, nuxt: Nuxt) {
  for (const template of getTemplates(options, nuxt)) {
    if (template.filename?.endsWith('.d.ts')) {
      addTypeTemplate({
        filename: template.filename as `${string}.d.ts`,
        getContents: template.getContents
      })
    }
    else {
      addTemplate(template)
    }
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@achareh/ui',
    configKey: 'ui',
    compatibility: {
      nuxt: '>=4.1.0'
    }
  },
  defaults: defaultOptions,
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const theme = defu(options.theme, defaultOptions.theme)
    options.theme = theme

    nuxt.options.alias['#ui'] = resolver.resolve('./runtime')
    nuxt.options.appConfig.ui = defu(nuxt.options.appConfig.ui || {}, getDefaultConfig())

    const classPrefix = theme.prefix ? `${theme.prefix}:` : ''
    nuxt.options.app.rootAttrs = nuxt.options.app.rootAttrs || {}
    nuxt.options.app.rootAttrs.class = [nuxt.options.app.rootAttrs.class, `${classPrefix}isolate`].filter(Boolean).join(' ')

    nuxt.hook('vite:extend', async ({ config }) => {
      const plugin = (await import('@tailwindcss/vite')).default
      config.plugins ||= []
      config.plugins.push(plugin())
    })

    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      pattern: '**/*.vue',
      ignore: ['**/*.stories.*'],
      pathPrefix: false,
      prefix: options.prefix
    })

    addImports({
      name: 'useComponentProps',
      from: resolver.resolve('./runtime/composables/useComponentProps')
    })

    registerTemplates(options, nuxt)
  }
})
