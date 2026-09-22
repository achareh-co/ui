import type { App } from 'vue'
import colors from '../plugins/colors'
import { applyUiOverrides } from './stubs/imports'

export interface AcharehUIVuePluginOptions {
  ui?: Record<string, any>
}

function runPlugin(plugin: unknown) {
  if (typeof plugin === 'function') {
    plugin()
    return
  }
  if (plugin && typeof plugin === 'object' && 'setup' in plugin && typeof plugin.setup === 'function') {
    plugin.setup()
  }
}

export default {
  install(_app: App, options?: AcharehUIVuePluginOptions) {
    applyUiOverrides(options?.ui)
    runPlugin(colors)
  }
}
