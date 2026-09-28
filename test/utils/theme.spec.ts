import { describe, expect, it } from 'vitest'
import { kebabCase, resolveTheme } from '../../src/utils/theme'

const sample = {
  slots: { base: 'px-4 hover:bg-primary', label: '!font-bold' },
  variants: { color: { primary: 'text-primary', error: { base: 'text-error' } } },
  compoundVariants: [{ color: 'error', class: { base: 'border-error' } }],
  defaultVariants: { color: 'primary' }
}

describe('resolveTheme', () => {
  it('calls a theme function with the resolved options', () => {
    const resolved = resolveTheme((options: any) => ({ slots: { base: options.theme.transitions ? 'transition' : '' } }), {})
    expect(resolved.slots.base).toBe('transition')
  })

  it('replaces the default color with theme.defaultVariants.color', () => {
    const resolved = resolveTheme(sample, { theme: { defaultVariants: { color: 'error' } } })
    expect(resolved.defaultVariants.color).toBe('error')
  })

  it('keeps structure and blanks classes when unstyled', () => {
    const resolved = resolveTheme(sample, { theme: { unstyled: true } })
    expect(resolved.slots).toEqual({ base: '', label: '' })
    expect(resolved.variants.color).toEqual({ primary: '', error: { base: '' } })
    expect(resolved.compoundVariants[0]).toEqual({ color: 'error', class: { base: '' } })
    expect(resolved.defaultVariants).toEqual({ color: 'primary' })
  })

  it('prefixes every class, including important and variant classes', () => {
    const resolved = resolveTheme(sample, { theme: { prefix: 'tw' } })
    expect(resolved.slots.base).toBe('tw:px-4 tw:hover:bg-primary')
    expect(resolved.slots.label).toBe('!tw:font-bold')
    expect(resolved.variants.color.error.base).toBe('tw:text-error')
    expect(resolved.compoundVariants[0].class.base).toBe('tw:border-error')
  })
})

describe('kebabCase', () => {
  it('turns an export key into a file name', () => {
    expect(kebabCase('fieldGroup')).toBe('field-group')
    expect(kebabCase('button')).toBe('button')
  })
})
