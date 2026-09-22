export type ThemeConfig = {
  slots?: Record<string, any>
  variants?: Record<string, Record<string, any>>
  defaultVariants?: Record<string, any>
  compoundVariants?: any[]
  base?: any
}

export type ComponentConfig<T> = T extends (...args: any) => infer R
  ? R extends ThemeConfig
    ? R
    : ThemeConfig
  : T extends ThemeConfig
    ? T
    : ThemeConfig

export type SlotClasses<T extends ThemeConfig | undefined> = T extends { slots: infer S }
  ? { [K in keyof S]?: any }
  : Record<string, any>
