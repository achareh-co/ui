import type { ModuleOptions } from '../utils/defaults'

export default (options: Required<ModuleOptions> & { theme: { colors: string[], transitions?: boolean } }) => ({
  slots: {
    base: [
      'rounded-md font-medium inline-flex items-center justify-center gap-3 select-none',
      'disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
      options.theme.transitions && 'transition-colors'
    ],
    leading: 'inline-flex shrink-0 items-center justify-center',
    label: 'truncate'
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: ''
    },
    variant: {
      solid: '',
      outline: '',
      soft: '',
      subtle: '',
      ghost: ''
    },
    size: {
      xs: { base: 'text-xs px-4 py-2', leading: 'size-6' },
      sm: { base: 'text-xs px-5 py-3', leading: 'size-8' },
      md: { base: 'text-sm px-5 py-3', leading: 'size-9' },
      lg: { base: 'text-sm px-6 py-4', leading: 'size-9' },
      xl: { base: 'text-base px-7 py-4', leading: 'size-10' }
    },
    disabled: {
      true: { base: 'cursor-not-allowed opacity-75' }
    }
  },
  compoundVariants: [
    ...(options.theme.colors || []).map((color: string) => ({
      color,
      variant: 'solid',
      class: `bg-${color} text-inverted hover:bg-${color}/90 active:bg-${color}/90`
    })),
    ...(options.theme.colors || []).map((color: string) => ({
      color,
      variant: 'outline',
      class: `ring ring-inset ring-${color}/50 text-${color} bg-default hover:bg-${color}/10 active:bg-${color}/10`
    })),
    ...(options.theme.colors || []).map((color: string) => ({
      color,
      variant: 'soft',
      class: `bg-${color}/10 text-${color} hover:bg-${color}/15 active:bg-${color}/15`
    })),
    ...(options.theme.colors || []).map((color: string) => ({
      color,
      variant: 'subtle',
      class: `bg-${color}/10 text-${color} ring ring-inset ring-${color}/25 hover:bg-${color}/15`
    })),
    ...(options.theme.colors || []).map((color: string) => ({
      color,
      variant: 'ghost',
      class: `text-${color} hover:bg-${color}/10 active:bg-${color}/10`
    })),
    {
      color: 'neutral',
      variant: 'solid',
      class: 'bg-inverted text-inverted hover:bg-inverted/90'
    },
    {
      color: 'neutral',
      variant: 'outline',
      class: 'ring ring-inset ring-accented text-default bg-default hover:bg-elevated'
    },
    {
      color: 'neutral',
      variant: 'soft',
      class: 'bg-elevated text-default hover:bg-accented'
    },
    {
      color: 'neutral',
      variant: 'subtle',
      class: 'bg-elevated text-default ring ring-inset ring-accented hover:bg-accented'
    },
    {
      color: 'neutral',
      variant: 'ghost',
      class: 'text-default hover:bg-elevated'
    }
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    size: 'md'
  }
})
