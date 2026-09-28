import { defu } from 'defu'
import { reactive } from 'vue'
import config from '#build/app.config'

export const appConfig = reactive(config)

export function useAppConfig() {
  return appConfig
}

export function applyUiOverrides(ui?: Record<string, any>) {
  if (!ui) {
    return
  }
  appConfig.ui = defu(ui, appConfig.ui)
}
