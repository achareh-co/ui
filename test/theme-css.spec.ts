import { describe, expect, it } from 'vitest'
import { generateThemeCss } from '../src/templates'
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
