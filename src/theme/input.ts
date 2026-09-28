import type { ModuleOptions } from '../utils/defaults'

const states = ['neutral', 'error', 'success', 'warning'] as const

const focusShadow = {
  neutral: 'focus-within:shadow-[0_0_0_3px_var(--color-primary),0_0_0_4px_var(--color-surface)]',
  error: 'focus-within:shadow-[0_0_0_3px_var(--color-error),0_0_0_4px_var(--color-surface)]',
  success: 'focus-within:shadow-[0_0_0_3px_var(--color-success),0_0_0_4px_var(--color-surface)]',
  warning: 'focus-within:shadow-[0_0_0_3px_var(--color-warning),0_0_0_4px_var(--color-surface)]'
} as const

const hoverBorder = {
  neutral: 'hover:not-focus-within:border-on-surface',
  error: 'hover:not-focus-within:border-error',
  success: 'hover:not-focus-within:border-success',
  warning: 'hover:not-focus-within:border-warning'
} as const

function addon(color: string) {
  return {
    leading: color,
    trailing: color,
    prefix: color,
    suffix: color
  }
}

export default (options: Required<ModuleOptions> & { theme: { colors: string[], transitions?: boolean } }) => ({
  slots: {
    root: [
      'flex min-w-0 items-center gap-4 border-xs border-solid border-outline-variant bg-surface-container-lowest text-on-surface typo-family-brand cursor-text',
      options.theme.transitions && 'transition-[background-color,border-color,box-shadow] duration-200 ease-[ease]'
    ],
    leading: 'inline-flex shrink-0 items-center justify-center [&_svg]:shrink-0',
    field: 'flex min-w-0 flex-1 items-center gap-4',
    content: 'flex min-w-0 flex-1 flex-wrap items-center gap-2',
    prefix: 'inline-flex shrink-0 items-center whitespace-nowrap text-on-surface-variant/strong',
    base: 'min-w-0 flex-1 border-0 bg-transparent p-0 text-inherit outline-none placeholder:text-on-surface/regular read-only:cursor-default',
    clear: 'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-xs border-0 bg-transparent p-0 leading-none text-primary hover:opacity-[0.85] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&_svg]:shrink-0',
    suffix: 'inline-flex shrink-0 items-center whitespace-nowrap text-on-surface-variant/strong',
    trailing: 'inline-flex shrink-0 items-center justify-center [&_svg]:shrink-0'
  },
  variants: {
    weight: {
      bold: {
        base: 'typo-body-large',
        leading: 'typo-body-large [&_svg]:size-10',
        trailing: 'typo-body-large [&_svg]:size-10',
        prefix: 'typo-body-large',
        suffix: 'typo-body-large',
        clear: '[&_svg]:size-8'
      },
      light: {
        base: 'typo-body-small',
        leading: 'typo-label-medium [&_svg]:size-8',
        trailing: 'typo-label-medium [&_svg]:size-8',
        prefix: 'typo-label-medium',
        suffix: 'typo-label-medium',
        clear: '[&_svg]:size-6'
      }
    },
    state: {
      neutral: {
        base: 'caret-primary'
      },
      error: {
        root: 'border-error/medium text-error',
        base: 'caret-error',
        clear: 'focus-visible:outline-error'
      },
      success: {
        root: 'border-success/medium text-success',
        base: 'caret-success',
        clear: 'focus-visible:outline-success'
      },
      warning: {
        root: 'border-warning/medium text-warning',
        base: 'caret-warning',
        clear: 'focus-visible:outline-warning'
      }
    },
    radius: {
      none: { root: 'rounded-none' },
      xs: { root: 'rounded-xs' },
      sm: { root: 'rounded-sm' }
    },
    paddingX: {
      dense: { root: 'px-2' },
      compact: { root: 'px-4' },
      cozy: { root: 'px-6' },
      comfortable: { root: 'px-8' }
    },
    paddingY: {
      dense: { root: 'py-2' },
      compact: { root: 'py-4' },
      cozy: { root: 'py-6' },
      comfortable: { root: 'py-8' }
    },
    align: {
      start: { content: 'text-start' },
      center: { content: 'text-center' },
      end: { content: 'text-end' }
    },
    disabled: {
      true: ''
    },
    readonly: {
      true: ''
    }
  },
  compoundVariants: [
    ...states.map(state => ({
      state,
      disabled: false,
      class: { root: focusShadow[state] }
    })),
    ...states.map(state => ({
      state,
      disabled: false,
      readonly: false,
      class: { root: `${hoverBorder[state]} hover:not-focus-within:bg-surface-container-lowest-hover` }
    })),
    {
      disabled: false,
      readonly: false,
      class: { root: 'focus-within:bg-surface-container-lowest-focused' }
    },
    {
      readonly: true,
      disabled: false,
      class: {
        root: 'cursor-default border-outline-variant/weak bg-surface-variant text-on-surface-variant/strong focus-within:border-outline-variant',
        ...addon('text-on-surface-variant/strong')
      }
    },
    {
      state: 'error',
      readonly: true,
      disabled: false,
      class: {
        root: 'text-error/strong',
        ...addon('text-error/strong')
      }
    },
    {
      state: 'success',
      readonly: true,
      disabled: false,
      class: {
        root: 'text-success/strong',
        ...addon('text-success/strong')
      }
    },
    {
      state: 'warning',
      readonly: true,
      disabled: false,
      class: {
        root: 'text-warning/strong',
        ...addon('text-warning/strong')
      }
    },
    {
      disabled: true,
      class: {
        root: 'pointer-events-none cursor-not-allowed border-outline-variant/light bg-surface-container-lowest text-on-surface/regular',
        ...addon('text-on-surface/regular')
      }
    }
  ],
  defaultVariants: {
    weight: 'bold',
    state: 'neutral',
    radius: 'xs',
    paddingX: 'cozy',
    paddingY: 'comfortable',
    align: 'start'
  }
})
