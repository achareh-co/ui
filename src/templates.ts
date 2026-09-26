import colors from 'tailwindcss/colors'
import type { Nuxt, NuxtTemplate } from '@nuxt/schema'
import { defu } from 'defu'
import { defaultOptions, getDefaultConfig, type ModuleOptions } from './utils/defaults'
import { generateBordersCss } from './utils/borders'
import { generateSpacingCss } from './utils/spacing'
import { generateTypographyCss } from './utils/typography'
import { kebabCase, resolveTheme } from './utils/theme'
import * as themes from './theme'

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

function oldNeutralBlock() {
  const neutral = colors.neutral
  if (!neutral || typeof neutral !== 'object') {
    return ''
  }

  const lines = shades
    .filter(shade => shade in neutral)
    .map(shade => `  --color-old-neutral-${shade}: ${neutral[shade]};`)

  return `@theme static {\n${lines.join('\n')}\n}`
}

export function generateThemeCss(options: ModuleOptions, optionsIn?: { includeSources?: boolean }) {
  const theme = defu(options.theme, defaultOptions.theme)
  const aliases = [...(theme.colors || []), 'neutral']
  const colorVars = aliases.flatMap(color =>
    shades.map(shade => `--color-${color}-${shade}: var(--ui-color-${color}-${shade});`)
  )
  const semantic = (theme.colors || []).flatMap(color => [
    `--color-${color}: var(--ui-${color});`,
    `--ring-color-${color}: var(--ui-${color});`,
    `--outline-color-${color}: var(--ui-${color});`
  ])
  const prefix = theme.prefix ? `${theme.prefix}:` : ''

  const themeBlock = `@theme default inline {
  ${colorVars.join('\n  ')}
  ${semantic.join('\n  ')}
  --text-color-dimmed: var(--ui-text-dimmed);
  --text-color-muted: var(--ui-text-muted);
  --text-color-toned: var(--ui-text-toned);
  --text-color-default: var(--ui-text);
  --text-color-highlighted: var(--ui-text-highlighted);
  --text-color-inverted: var(--ui-text-inverted);
  --background-color-default: var(--ui-bg);
  --background-color-muted: var(--ui-bg-muted);
  --background-color-elevated: var(--ui-bg-elevated);
  --background-color-accented: var(--ui-bg-accented);
  --background-color-inverted: var(--ui-bg-inverted);
  --border-color-default: var(--ui-border);
  --border-color-muted: var(--ui-border-muted);
  --border-color-accented: var(--ui-border-accented);
  --border-color-inverted: var(--ui-border-inverted);
  --ring-color-default: var(--ui-border);
  --ring-color-muted: var(--ui-border-muted);
  --ring-color-accented: var(--ui-border-accented);
  --ring-color-inverted: var(--ui-border-inverted);
  --divide-color-default: var(--ui-border);
  --divide-color-muted: var(--ui-border-muted);
  --divide-color-accented: var(--ui-border-accented);
  --outline-color-default: var(--ui-border);
  --outline-color-inverted: var(--ui-border-inverted);
}`

  const spacingBlock = generateSpacingCss()
  const bordersBlock = generateBordersCss()
  const typographyBlock = generateTypographyCss()

  if (!optionsIn?.includeSources) {
    return `${oldNeutralBlock()}\n\n${themeBlock}\n\n${spacingBlock}\n\n${bordersBlock}\n\n${typographyBlock}\n`
  }

  return `@source "./ui";

@layer base {
  body {
    @apply ${prefix}antialiased ${prefix}text-default ${prefix}bg-default;
  }
}

${oldNeutralBlock()}

${themeBlock}

${spacingBlock}

${bordersBlock}

${typographyBlock}
`
}

function themeModule(theme: unknown, options: ModuleOptions) {
  const resolved = resolveTheme(theme, options)
  return `export default ${JSON.stringify(resolved, null, 2)}\n`
}

function appConfigTypes() {
  return `import type { defaultConfig } from 'tailwind-variants'

interface ComponentThemeOverride {
  slots?: Record<string, any>
  variants?: Record<string, any>
  compoundVariants?: any[]
  defaultVariants?: Record<string, any>
}

interface AppConfigUI {
  colors?: {
    primary?: string
    secondary?: string
    success?: string
    info?: string
    warning?: string
    error?: string
    neutral?: string
    [key: string]: string | undefined
  }
  prefix?: string
  tv?: typeof defaultConfig
  app?: ComponentThemeOverride
  button?: ComponentThemeOverride
  card?: ComponentThemeOverride
}

declare module '@nuxt/schema' {
  interface AppConfigInput {
    /**
     * Achareh UI theme configuration
     */
    ui?: AppConfigUI
  }
  interface CustomAppConfig {
    ui: AppConfigUI
  }
}

export {}
`
}

export function getTemplates(options: ModuleOptions, nuxt?: Nuxt): NuxtTemplate[] {
  const resolved = defu(options, defaultOptions) as ModuleOptions
  const templates: NuxtTemplate[] = []

  for (const [name, theme] of Object.entries(themes)) {
    templates.push({
      filename: `ui/${kebabCase(name)}.ts`,
      write: true,
      getContents: () => themeModule(theme, resolved)
    })
  }

  templates.push({
    filename: 'ui/index.ts',
    write: true,
    getContents: () => Object.keys(themes)
      .map(name => `export { default as ${name} } from './${kebabCase(name)}'`)
      .join('\n') + '\n'
  })

  templates.push({
    filename: 'ui.css',
    write: true,
    getContents: async () => {
      let layerSources = ''
      if (nuxt) {
        const { getLayerDirectories } = await import('@nuxt/kit')
        for (const layer of getLayerDirectories(nuxt)) {
          if (layer.app) {
            layerSources += `@source "${layer.app}**/*";\n`
          }
        }
      }
      return `${layerSources}${generateThemeCss(resolved, { includeSources: true })}`
    }
  })

  templates.push({
    filename: 'ui.static.css',
    write: true,
    getContents: () => generateThemeCss(resolved, { includeSources: false })
  })

  templates.push({
    filename: 'types/ui.d.ts',
    getContents: () => appConfigTypes()
  })

  return templates
}

export function appConfigFromOptions(ui?: Record<string, any>) {
  return defu({ ui: ui || {} }, { ui: getDefaultConfig() })
}
