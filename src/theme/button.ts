import type { ModuleOptions } from '../utils/defaults'

const accentColors = ['primary', 'secondary', 'tertiary', 'error', 'success', 'warning', 'info'] as const
const inverseColors = [
  'inverse-primary',
  'inverse-secondary',
  'inverse-tertiary',
  'inverse-error',
  'inverse-success',
  'inverse-warning',
  'inverse-info'
] as const
const neutralColors = ['neutral', 'neutral-low', 'neutral-container', 'neutral-variant', 'inverse-neutral'] as const
const fixedColors = ['primary-fixed', 'secondary-fixed', 'tertiary-fixed'] as const

const surfaceOutline = 'bg-surface-container-low hover:not-disabled:bg-surface-container-low-hover active:not-disabled:bg-surface-container-low-focused focus-visible:not-disabled:bg-surface-container-low-focused'
const inverseSurfaceOutline = 'bg-inverse-surface hover:not-disabled:bg-inverse-surface-hover active:not-disabled:bg-inverse-surface-focused focus-visible:not-disabled:bg-inverse-surface-focused'

const inlinePadding = {
  dense: 'px-2',
  compact: 'px-4',
  cozy: 'px-6',
  comfortable: 'px-8'
} as const

const minHeight = {
  bold: {
    dense: 'min-h-12',
    compact: 'min-h-14',
    cozy: 'min-h-16',
    comfortable: 'min-h-17'
  },
  light: {
    dense: 'min-h-10',
    compact: 'min-h-12',
    cozy: 'min-h-14',
    comfortable: 'min-h-16'
  }
} as const

function solid(bg: string, fg: string) {
  return `bg-${bg} text-${fg} hover:not-disabled:bg-${bg}/high active:not-disabled:bg-${bg}/strong focus-visible:not-disabled:bg-${bg}/strong`
}

function softContainer(bg: string, fg: string) {
  return `bg-${bg} text-${fg} hover:not-disabled:bg-${bg}-hover active:not-disabled:bg-${bg}-focused focus-visible:not-disabled:bg-${bg}-focused`
}

function softAlpha(bg: string, fg: string) {
  return `bg-${bg}/weak text-${fg} hover:not-disabled:bg-${bg}/low active:not-disabled:bg-${bg}/light focus-visible:not-disabled:bg-${bg}/light`
}

function softFixed(bg: string, fg: string, hover: string) {
  return `bg-${bg} text-${fg} hover:not-disabled:bg-${hover} active:not-disabled:bg-${hover} focus-visible:not-disabled:bg-${hover}`
}

function outline(border: string, fg: string, background = surfaceOutline) {
  return `border-xs border-solid border-${border}/light text-${fg} ${background} hover:not-disabled:border-${border}/medium`
}

function ghost(fg: string, overlay = fg) {
  return `bg-transparent text-${fg} hover:not-disabled:bg-${overlay}/weak active:not-disabled:bg-${overlay}/low focus-visible:not-disabled:bg-${overlay}/low`
}

function recipes(color: string, classes: Record<'solid' | 'soft' | 'outline' | 'ghost', string>) {
  return (Object.keys(classes) as Array<keyof typeof classes>).map(variant => ({
    color,
    variant,
    class: classes[variant]
  }))
}

function accent(color: string) {
  return recipes(color, {
    solid: solid(color, `on-${color}`),
    soft: softContainer(`${color}-container`, `on-${color}-container`),
    outline: outline(color, color),
    ghost: ghost(color)
  })
}

function inverse(color: string) {
  return recipes(color, {
    solid: solid(color, `on-${color}`),
    soft: softAlpha(color, `on-${color}`),
    outline: outline(color, color),
    ghost: ghost(color)
  })
}

function fixed(color: string) {
  return recipes(color, {
    solid: solid(color, `on-${color}`),
    soft: softFixed(color, `on-${color}`, `${color}-dim`),
    outline: outline(color, color),
    ghost: ghost(color)
  })
}

export default (options: Required<ModuleOptions> & { theme: { colors: string[], transitions?: boolean } }) => {
  const known = new Set<string>([...accentColors, ...inverseColors, ...neutralColors, ...fixedColors, 'white-fixed'])
  const accents = [...accentColors, ...(options.theme.colors || []).filter(color => !known.has(color))]
  const colors = [...accents, ...neutralColors, ...inverseColors, ...fixedColors, 'white-fixed']

  return {
    slots: {
      base: [
        'relative inline-flex flex-nowrap items-center justify-center gap-0 align-middle text-center whitespace-nowrap no-underline appearance-none cursor-pointer select-none border-0 border-transparent disabled:cursor-not-allowed',
        'focus-visible:not-disabled:border-transparent focus-visible:not-disabled:shadow-[0_0_0_3px_var(--color-primary),0_0_0_1px_var(--color-surface)]',
        options.theme.transitions && 'transition-[background-color,color,border-color,box-shadow] duration-200 ease-[ease]'
      ],
      leading: 'inline-flex shrink-0 items-center justify-center leading-none [&_svg]:shrink-0',
      label: 'inline-flex min-w-0 items-center justify-center',
      trailing: 'inline-flex shrink-0 items-center justify-center leading-none [&_svg]:shrink-0',
      spinner: 'shrink-0 animate-spinner-rotate',
      spinnerPath: 'animate-spinner-dash'
    },
    variants: {
      color: Object.fromEntries(colors.map(color => [color, ''])),
      variant: {
        solid: '',
        soft: '',
        outline: '',
        ghost: ''
      },
      weight: {
        bold: 'typo-title-medium',
        light: 'typo-caption-medium'
      },
      paddingX: {
        dense: '',
        compact: '',
        cozy: '',
        comfortable: ''
      },
      paddingY: {
        dense: 'py-2',
        compact: 'py-4',
        cozy: 'py-6',
        comfortable: 'py-8'
      },
      radius: {
        none: 'rounded-none',
        xs: 'rounded-xs',
        sm: 'rounded-sm',
        full: 'rounded-full'
      },
      block: {
        true: 'w-full'
      },
      loading: {
        true: 'cursor-progress!'
      },
      loadingLabel: {
        true: ''
      },
      icon: {
        none: '',
        leading: '',
        trailing: ''
      }
    },
    compoundVariants: [
      ...accents.flatMap(color => accent(color)),
      ...inverseColors.flatMap(color => inverse(color)),
      ...fixedColors.flatMap(color => fixed(color)),
      ...recipes('neutral', {
        solid: solid('on-surface', 'surface-container-lowest'),
        soft: softContainer('surface-container-low', 'on-surface'),
        outline: outline('on-surface', 'on-surface'),
        ghost: ghost('on-surface')
      }),
      ...recipes('neutral-low', {
        solid: solid('on-surface', 'surface-container-lowest'),
        soft: softContainer('surface-container-high', 'on-surface'),
        outline: outline('on-surface', 'on-surface'),
        ghost: ghost('on-surface')
      }),
      ...recipes('neutral-container', {
        solid: solid('on-surface', 'surface-container-lowest'),
        soft: softContainer('surface-container-highest', 'on-surface'),
        outline: outline('on-surface', 'on-surface'),
        ghost: ghost('on-surface')
      }),
      ...recipes('neutral-variant', {
        solid: solid('on-surface-variant', 'surface-variant'),
        soft: softContainer('surface-variant', 'on-surface-variant'),
        outline: outline('on-surface-variant', 'on-surface-variant'),
        ghost: ghost('on-surface-variant')
      }),
      ...recipes('inverse-neutral', {
        solid: solid('on-inverse-surface', 'inverse-surface'),
        soft: softAlpha('on-inverse-surface', 'on-inverse-surface'),
        outline: outline('on-inverse-surface', 'on-inverse-surface', inverseSurfaceOutline),
        ghost: ghost('on-inverse-surface')
      }),
      ...recipes('white-fixed', {
        solid: solid('white-fixed', 'black-fixed'),
        soft: softFixed('white-fixed', 'black-fixed', 'white-fixed'),
        outline: outline('white-fixed', 'white-fixed'),
        ghost: ghost('white-fixed')
      }),
      { variant: 'solid', class: 'disabled:bg-surface-container-low disabled:text-on-surface-variant' },
      { variant: 'soft', class: 'disabled:bg-on-surface/weak disabled:text-on-surface/regular' },
      { variant: 'outline', class: 'disabled:bg-transparent disabled:text-on-surface-variant disabled:border-outline-variant' },
      { variant: 'ghost', class: 'disabled:bg-transparent disabled:text-on-surface-variant' },
      ...(Object.keys(inlinePadding) as Array<keyof typeof inlinePadding>).map(paddingX => ({
        paddingX,
        icon: 'none',
        class: inlinePadding[paddingX]
      })),
      ...(Object.keys(minHeight.bold) as Array<keyof typeof minHeight.bold>).flatMap(paddingY => ([
        { weight: 'bold', paddingY, class: minHeight.bold[paddingY] },
        { weight: 'light', paddingY, class: minHeight.light[paddingY] }
      ])),
      { weight: 'bold', icon: 'leading', class: 'gap-4 ps-8 pe-10' },
      { weight: 'bold', icon: 'trailing', class: 'gap-4 ps-10 pe-8' },
      { weight: 'light', icon: 'leading', class: 'gap-2 ps-6 pe-8' },
      { weight: 'light', icon: 'trailing', class: 'gap-2 ps-8 pe-6' },
      { weight: 'bold', loadingLabel: true, class: 'gap-4' },
      { weight: 'light', loadingLabel: true, class: 'gap-2' },
      { block: true, loadingLabel: true, class: { label: 'flex-1 justify-center' } },
      { weight: 'bold', class: { leading: '[&_svg]:size-10', trailing: '[&_svg]:size-10', spinner: 'size-10' } },
      { weight: 'light', class: { leading: '[&_svg]:size-8', trailing: '[&_svg]:size-8', spinner: 'size-8' } }
    ],
    defaultVariants: {
      color: 'primary',
      variant: 'solid',
      weight: 'bold',
      paddingX: 'compact',
      paddingY: 'compact',
      radius: 'xs',
      icon: 'none'
    }
  }
}
