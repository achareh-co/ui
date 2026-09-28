import type { StorybookConfig } from '@storybook-vue/nuxt'

// `@storybook-vue/nuxt` loads Nuxt with `dev: false`. Nuxt 4.5 then generates
// `paths.mjs` as `useRuntimeConfig().app`, which throws while the preview
// bundle evaluates `$fetch` before a Nuxt app exists. Inline the public app
// config the same way Nuxt does in dev.
const storybookNuxtPaths = {
  name: 'storybook-nuxt-paths',
  transform(code: string, id: string) {
    if (!id.includes('paths.mjs') || !code.includes('useRuntimeConfig().app')) return
    return code.replace(
      'const getAppConfig = () => useRuntimeConfig().app',
      'const getAppConfig = () => ({ baseURL: "/", buildAssetsDir: "/_nuxt/", cdnURL: "" })'
    )
  }
}

const config: StorybookConfig = {
  stories: [
    '../../../src/runtime/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    'storybook-addon-pseudo-states'
  ],
  framework: {
    name: '@storybook-vue/nuxt',
    options: {
      docgen: {
        plugin: 'vue-component-meta',
        tsconfig: '.nuxt/tsconfig.app.json'
      }
    }
  },
  docs: {
    defaultName: 'Docs'
  },
  async viteFinal(viteConfig) {
    viteConfig.plugins = [...(viteConfig.plugins ?? []), storybookNuxtPaths]
    return viteConfig
  }
}

export default config
