import { describe, expect, it } from 'vitest'
import { tv } from '../../src/runtime/utils/tv'

const classes = (base: string, extra: string) => tv({ slots: { base } })().base!({ class: extra }).split(' ')

describe('tv', () => {
  it('keeps border width and border color apart', () => {
    expect(classes('border-0 border-outline', 'border-xs')).toEqual(['border-outline', 'border-xs'])
  })

  it('replaces one typo role with another', () => {
    expect(classes('typo-body-large', 'typo-body-small')).toEqual(['typo-body-small'])
  })

  it('lets a typo role replace single-property typo utilities', () => {
    expect(classes('typo-size-label-large typo-weight-label-large typo-family-brand', 'typo-title-medium')).toEqual(['typo-title-medium'])
  })

  it('merges single-property typo utilities per property', () => {
    expect(classes('typo-size-label-large typo-leading-label-large', 'typo-size-body-small')).toEqual(['typo-leading-label-large', 'typo-size-body-small'])
  })

  it('keeps a single-property typo utility after a role', () => {
    expect(classes('typo-body-large', 'typo-size-label-large')).toEqual(['typo-body-large', 'typo-size-label-large'])
  })

  it('does not merge typo roles with Tailwind font utilities', () => {
    expect(classes('typo-body-large', 'text-sm font-bold')).toEqual(['typo-body-large', 'text-sm', 'font-bold'])
  })
})
