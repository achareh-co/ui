import { defu } from 'defu'
import { defaultOptions, type ModuleOptions } from './defaults'

function blankClasses(value: unknown): unknown {
  if (typeof value === 'string') {
    return ''
  }
  if (Array.isArray(value)) {
    return value.map(item => blankClasses(item))
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, blankClasses(item)]))
  }
  return value
}

export function applyDefaultVariants(theme: any, defaults?: { color?: string, size?: string }) {
  if (!defaults || !theme?.defaultVariants) {
    return theme
  }

  const defaultVariants = { ...theme.defaultVariants }
  if (defaults.color && defaultVariants.color === 'primary') {
    defaultVariants.color = defaults.color
  }
  if (defaults.size && defaultVariants.size === 'md') {
    defaultVariants.size = defaults.size
  }

  return {
    ...theme,
    defaultVariants
  }
}

export function applyUnstyled(theme: any, unstyled?: boolean) {
  if (!unstyled || !theme || typeof theme !== 'object') {
    return theme
  }

  const next = { ...theme }
  if (next.base) {
    next.base = blankClasses(next.base)
  }
  if (next.slots) {
    next.slots = blankClasses(next.slots)
  }
  if (next.variants) {
    next.variants = blankClasses(next.variants)
  }
  if (Array.isArray(next.compoundVariants)) {
    next.compoundVariants = next.compoundVariants.map((item: any) => ({
      ...item,
      class: item.class ? blankClasses(item.class) : item.class
    }))
  }
  return next
}

function prefixClasses(value: string, prefix: string) {
  if (!value.trim()) {
    return value
  }

  return value.split(/\s+/).filter(Boolean).map((token) => {
    const important = token.startsWith('!')
    const raw = important ? token.slice(1) : token
    if (raw.startsWith(`${prefix}:`)) {
      return token
    }
    return `${important ? '!' : ''}${prefix}:${raw}`
  }).join(' ')
}

function prefixValue(value: unknown, prefix: string): unknown {
  if (typeof value === 'string') {
    return prefixClasses(value, prefix)
  }
  if (Array.isArray(value)) {
    return value.map(item => prefixValue(item, prefix))
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, prefixValue(item, prefix)]))
  }
  return value
}

export function applyPrefixToObject(theme: any, prefix?: string) {
  if (!prefix || !theme || typeof theme !== 'object') {
    return theme
  }

  const next = { ...theme }
  if (next.base) {
    next.base = prefixValue(next.base, prefix)
  }
  if (next.slots) {
    next.slots = prefixValue(next.slots, prefix)
  }
  if (next.variants) {
    next.variants = Object.fromEntries(Object.entries(next.variants).map(([name, values]) => [
      name,
      Object.fromEntries(Object.entries(values as Record<string, unknown>).map(([key, value]) => [
        key,
        prefixValue(value, prefix)
      ]))
    ]))
  }
  if (Array.isArray(next.compoundVariants)) {
    next.compoundVariants = next.compoundVariants.map((item: any) => ({
      ...item,
      class: item.class ? prefixValue(item.class, prefix) : item.class
    }))
  }
  return next
}

export function resolveTheme(theme: any, options?: ModuleOptions) {
  const resolvedOptions = defu(options, defaultOptions) as ModuleOptions & { theme: Required<NonNullable<ModuleOptions['theme']>> }
  const result = typeof theme === 'function' ? theme(resolvedOptions) : theme

  return applyPrefixToObject(
    applyUnstyled(
      applyDefaultVariants(result, resolvedOptions.theme?.defaultVariants),
      resolvedOptions.theme?.unstyled
    ),
    resolvedOptions.theme?.prefix || undefined
  )
}

export function kebabCase(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}
