import { reactive } from 'vue'
import { getDefaultConfig } from '../../src/utils/defaults'

export const appConfig = reactive({
  ui: getDefaultConfig() as Record<string, any>
})

export function useAppConfig() {
  return appConfig
}

export function defineNuxtPlugin<T>(plugin: T): T {
  return plugin
}

export function useHead(_input?: unknown) {}
