import { defu } from 'defu'
import { isRef, reactive, watchEffect } from 'vue'
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

export function defineNuxtPlugin<T>(plugin: T): T {
  return plugin
}

export function useHead(input?: { style?: Array<{ innerHTML?: unknown, key?: string, id?: string }> }) {
  if (typeof document === 'undefined' || !input?.style) {
    return
  }

  for (const style of input.style) {
    const id = style.id || style.key || 'acme-ui-colors'
    let el = document.getElementById(id)
    if (!el) {
      el = document.createElement('style')
      el.id = id
      document.head.appendChild(el)
    }

    const write = () => {
      const value = style.innerHTML
      el!.textContent = isRef(value) ? String(value.value ?? '') : String(value ?? '')
    }

    if (isRef(style.innerHTML)) {
      watchEffect(write)
    }
    else {
      write()
    }
  }
}
