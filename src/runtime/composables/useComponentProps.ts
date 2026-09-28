import { defu } from 'defu'
import { useAppConfig } from '#imports'

/**
 * Resolves component props against app config.
 * Priority: explicit prop > withDefaults > app.config.ui.<name>.defaultVariants.
 * `theme.defaultVariants` is intentionally not applied here; `tv()` reads it.
 * The `ui` prop is deep-merged so per-instance slot classes win. `tv()` also receives
 * `app.config.ui.<name>.slots`, but only here do they land after variant classes and override them.
 */
export function useComponentProps<T extends Record<string, any>>(name: string, props: T): T {
  const appConfig = useAppConfig()

  return new Proxy(props, {
    get(target, key, receiver) {
      if (typeof key !== 'string') {
        return Reflect.get(target, key, receiver)
      }

      if (key === 'ui') {
        const configSlots = appConfig.ui?.[name]?.slots
        return defu(target.ui || {}, configSlots || {})
      }

      const value = Reflect.get(target, key, receiver)
      if (value !== undefined) {
        return value
      }

      const defaults = appConfig.ui?.[name]?.defaultVariants
      if (defaults && key in defaults) {
        return defaults[key]
      }

      return value
    }
  }) as T
}
