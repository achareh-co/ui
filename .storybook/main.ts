import vue from '@vitejs/plugin-vue'
import { mergeConfig } from 'vite'
import type { StorybookConfig } from '@storybook/vue3-vite'
import ui from '@achareh/ui/vite'

const config: StorybookConfig = {
  stories: [
    '../src/runtime/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    'storybook-addon-pseudo-states'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: {
        plugin: 'vue-component-meta',
        tsconfig: 'tsconfig.json'
      }
    }
  },
  docs: {
    defaultName: 'Docs'
  },
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      plugins: [vue(), ...ui({ dts: false })]
    })
  }
}

export default config
