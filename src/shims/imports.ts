/**
 * Type-only stand-in for Nuxt `#imports` while typechecking the library.
 * Nuxt replaces this at runtime. The Vue adapter resolves `#imports` to
 * `runtime/vue/stubs/imports.ts` instead.
 */
export function useAppConfig(): { ui?: Record<string, any> } {
  return {}
}

export function useHead(_input?: any) {}

export function defineNuxtPlugin<T>(plugin: T): T {
  return plugin
}
