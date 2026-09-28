export type Color = 'primary' | 'secondary' | 'tertiary' | 'success' | 'info' | 'warning' | 'error' | (string & {})

export interface ThemeOptions {
  /**
   * Semantic colors that get `color` variants. A name outside the built-in Figma roles also needs
   * `--color-<name>`, `--color-on-<name>`, `--color-<name>-container`, `--color-<name>-container-hover`,
   * `--color-<name>-container-focused` and `--color-on-<name>-container` in the app `@theme`.
   * @defaultValue ['primary', 'secondary', 'tertiary', 'success', 'info', 'warning', 'error']
   */
  colors?: Color[]
  /**
   * Add the background, color, border and shadow transition on interactive components.
   * @defaultValue true
   */
  transitions?: boolean
  /**
   * Strip default theme classes and keep structure only.
   * @defaultValue false
   */
  unstyled?: boolean
  /**
   * Replace the default `color: 'primary'` across themes.
   */
  defaultVariants?: {
    color?: Color
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
    colors: ['primary', 'secondary', 'tertiary', 'success', 'info', 'warning', 'error'],
    transitions: true,
    unstyled: false,
    defaultVariants: {
      color: 'primary'
    },
    prefix: ''
  }
}

export function getDefaultConfig() {
  return {}
}
