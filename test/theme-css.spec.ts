import { describe, expect, it } from 'vitest'
import { generateThemeCss } from '../src/templates'
import { borderRadiusScale, borderWidthScale } from '../src/utils/borders'
import { spacingScale } from '../src/utils/spacing'
import { emphasisScale, paletteScale, semanticColors } from '../src/utils/colors'
import { fontFamilyBrand, typeScale } from '../src/utils/typography'

describe('generateThemeCss colors', () => {
  const css = generateThemeCss({})

  it('replaces the Tailwind color palette and bridges Figma steps', () => {
    expect(css).toContain('@theme default {\n  --color-*: initial;')
    expect(css).toContain('--color-inherit: inherit;')
    expect(css).toContain('--color-current: currentcolor;')
    expect(css).toContain('--color-transparent: transparent;')
    expect(css).not.toContain('old-neutral')
    expect(css).not.toContain('--ui-palette-')
    expect(css).not.toContain('--color-red-500:')
    expect(css).not.toContain('--color-red-100:')
    expect(css).not.toContain('--color-primary-500:')

    const primary40 = paletteScale.find(([name, step]) => name === 'primary' && step === '40')
    expect(primary40).toBeTruthy()
    expect(css).toContain(`--color-primary-40: ${primary40![2]};`)
    expect(css).toContain('--color-primary-50: #00DBBF;')
    expect(css).toContain('--ui-color-on-primary: var(--color-primary-100);')
    expect(css).toContain('--color-on-primary: var(--ui-color-on-primary);')
    expect(css).toContain('--opacity-high: var(--ui-emphasis-high);')
    expect(css).not.toContain('--color-primary-high:')
    expect(css).not.toContain('--ui-color-primary-high:')
    expect(css).toContain('--ui-color-surface-container-high: var(--color-neutral-92);')

    for (const [name, step, hex] of paletteScale) {
      expect(css).toContain(`--color-${name}-${step}: ${hex};`)
    }
    for (const [level, percent] of emphasisScale) {
      expect(css).toContain(`--ui-emphasis-${level}: ${percent}%;`)
      expect(css).toContain(`--opacity-${level}: var(--ui-emphasis-${level});`)
    }
    for (const [name, lightPalette, lightStep, darkPalette, darkStep] of semanticColors) {
      expect(css).toContain(`--ui-color-${name}: var(--color-${lightPalette}-${lightStep});`)
      expect(css).toContain(`--ui-color-${name}: var(--color-${darkPalette}-${darkStep});`)
    }
  })
})

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

describe('generateThemeCss typography', () => {
  const css = generateThemeCss({})

  it('emits each RTL-Fa role inside @layer theme', () => {
    const marker = '--ui-font-size-label-large: 14px;'
    const layerStart = css.lastIndexOf('@layer theme {\n  :root, :host {', css.indexOf(marker))
    const layerEnd = css.indexOf('\n}', layerStart)
    const values = css.slice(layerStart, layerEnd)

    expect(layerStart).toBeGreaterThan(-1)
    expect(values).toContain(`--ui-font-family-brand: ${fontFamilyBrand};`)
    expect(values).toContain('--ui-leading-label-large: 20px;')
    expect(values).toContain('--ui-font-weight-label-large: 500;')
    expect(values).toContain('--ui-tracking-label-large: 0px;')

    for (const [role, size, leading, weight, tracking] of typeScale) {
      expect(values).toContain(`--ui-font-size-${role}: ${size}px;`)
      expect(values).toContain(`--ui-leading-${role}: ${leading}px;`)
      expect(values).toContain(`--ui-font-weight-${role}: ${weight};`)
      expect(values).toContain(`--ui-tracking-${role}: ${tracking}px;`)
    }
  })

  it('emits a composite utility and a font-size-only utility', () => {
    expect(css).toContain(`@utility typo-label-large {
  font-family: var(--ui-font-family-brand);
  font-size: var(--ui-font-size-label-large);
  line-height: var(--ui-leading-label-large);
  font-weight: var(--ui-font-weight-label-large);
  letter-spacing: var(--ui-tracking-label-large);
}`)
    expect(css).toContain(`@utility typo-size-label-large {
  font-size: var(--ui-font-size-label-large);
}`)
    expect(css).toContain(`@utility typo-family-brand {
  font-family: var(--ui-font-family-brand);
}`)
    expect(css).not.toContain('--text-label-large:')
  })
})
