import type { App } from 'vue'
import { applyUiOverrides } from './stubs/imports'

export interface AcharehUIVuePluginOptions {
  ui?: Record<string, any>
}

export default {
  install(_app: App, options?: AcharehUIVuePluginOptions) {
    applyUiOverrides(options?.ui)
  }
}
