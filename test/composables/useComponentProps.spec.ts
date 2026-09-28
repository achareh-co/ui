import { afterEach, describe, expect, it } from 'vitest'
import { useComponentProps } from '../../src/runtime/composables/useComponentProps'
import { appConfig } from '../mocks/imports'

describe('useComponentProps', () => {
  afterEach(() => {
    delete appConfig.ui.sample
  })

  it('returns the explicit prop first', () => {
    appConfig.ui.sample = { defaultVariants: { weight: 'light' } }
    const props = useComponentProps('sample', { weight: 'bold' } as Record<string, any>)
    expect(props.weight).toBe('bold')
  })

  it('falls back to app.config defaultVariants for undefined props', () => {
    appConfig.ui.sample = { defaultVariants: { weight: 'light' } }
    const props = useComponentProps('sample', { weight: undefined } as Record<string, any>)
    expect(props.weight).toBe('light')
  })

  it('returns undefined when neither prop nor app.config has a value', () => {
    const props = useComponentProps('sample', {} as Record<string, any>)
    expect(props.weight).toBeUndefined()
  })

  it('merges ui with app.config slots and lets the instance win', () => {
    appConfig.ui.sample = { slots: { base: 'config-base', label: 'config-label' } }
    const props = useComponentProps('sample', { ui: { base: 'instance-base' } } as Record<string, any>)
    expect(props.ui).toEqual({ base: 'instance-base', label: 'config-label' })
  })
})
