import { describe, expect, it } from 'vitest'
import { generateThemeCss } from '../src/templates'
import { borderRadiusScale, borderWidthScale } from '../src/utils/borders'
import { spacingScale } from '../src/utils/spacing'

describe('generateThemeCss spacing', () => {
  const css = generateThemeCss({})

  it('disables the Tailwind spacing multiplier', () => {
    expect(css).toContain('@theme {\n  --spacing: initial;\n}')
  })

  it('emits each Figma step inside @layer theme and bridges it inline', () => {
    const layerStart = css.indexOf('@layer theme {\n  :root, :host {')
    const layerEnd = css.indexOf('\n}\n\n@theme {\n  --spacing: initial;', layerStart)
    const values = css.slice(layerStart, layerEnd)

    expect(layerStart).toBeGreaterThan(-1)
    expect(values).toContain('--ui-spacing-4: 8px;')
    expect(values).toContain('--ui-spacing-8: 16px;')
    expect(values).toContain('--ui-spacing-px: 1px;')
    expect(values).toContain('--ui-spacing-53: 1280px;')

    for (const [key, px] of spacingScale) {
      expect(values).toContain(`--ui-spacing-${key}: ${px}px;`)
      expect(css).toContain(`--spacing-${key}: var(--ui-spacing-${key});`)
    }
  })
})

describe('generateThemeCss borders', () => {
  const css = generateThemeCss({})

  it('emits each Figma radius and width inside @layer theme and bridges it inline', () => {
    const marker = '--ui-radius-none: 0px;'
    const layerStart = css.lastIndexOf('@layer theme {\n  :root, :host {', css.indexOf(marker))
    const layerEnd = css.indexOf('\n}\n\n@theme default inline {', layerStart)
    const values = css.slice(layerStart, layerEnd)

    expect(layerStart).toBeGreaterThan(-1)
    expect(values).toContain('--ui-radius-md: 12px;')
    expect(values).toContain('--ui-radius-2xs: 2px;')
    expect(values).toContain('--ui-border-width-xs: 1px;')
    expect(css).not.toContain('calc(var(--ui-radius)')
    expect(css).not.toContain('--ui-radius:')

    for (const [key, px] of borderRadiusScale) {
      expect(values).toContain(`--ui-radius-${key}: ${px}px;`)
      expect(css).toContain(`--radius-${key}: var(--ui-radius-${key});`)
    }

    for (const [key, px] of borderWidthScale) {
      expect(values).toContain(`--ui-border-width-${key}: ${px}px;`)
      expect(css).toContain(`--border-width-${key}: var(--ui-border-width-${key});`)
    }
  })

  it('bridges numeric Tailwind border widths onto the Figma steps', () => {
    expect(css).toContain('--border-width-0: var(--ui-border-width-none);')
    expect(css).toContain('--border-width-2: var(--ui-border-width-sm);')
    expect(css).toContain('--border-width-4: var(--ui-border-width-md);')
    expect(css).toContain('--border-width-8: var(--ui-border-width-lg);')
    expect(css).toContain('--default-border-width: var(--ui-border-width-xs);')
  })
})
