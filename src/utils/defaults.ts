export type Color = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | (string & {})
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | (string & {})

export interface ThemeOptions {
  /**
   * Semantic color aliases that generate component variants.
   * @defaultValue ['primary', 'secondary', 'success', 'info', 'warning', 'error']
   */
  colors?: Color[]
  /**
   * Add `transition-colors` on interactive components.
   * @defaultValue true
   */
  transitions?: boolean
  /**
   * Strip default theme classes and keep structure only.
   * @defaultValue false
   */
  unstyled?: boolean
  /**
   * Replace default `color: primary` and `size: md` across themes.
   */
  defaultVariants?: {
    color?: Color
    size?: Size
  }
  /**
   * Tailwind prefix, matching `@import "tailwindcss" prefix(tw)`.
   */
  prefix?: string
}

export interface ModuleOptions {
  /**
   * Component name prefix.
   * @defaultValue 'U'
   */
  prefix?: string
  theme?: ThemeOptions
}

export const defaultOptions: Required<Pick<ModuleOptions, 'prefix'>> & { theme: Required<ThemeOptions> } = {
  prefix: 'U',
  theme: {
    colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
    transitions: true,
    unstyled: false,
    defaultVariants: {
      color: 'primary',
      size: 'md'
    },
    prefix: ''
  }
}

export interface AppConfigUIColors {
  primary?: string
  secondary?: string
  success?: string
  info?: string
  warning?: string
  error?: string
  neutral?: string
  [key: string]: string | undefined
}

export function getDefaultConfig() {
  return {
    colors: {
      primary: 'green',
      secondary: 'blue',
      success: 'green',
      info: 'blue',
      warning: 'yellow',
      error: 'red',
      neutral: 'slate'
    } satisfies AppConfigUIColors
  }
}
