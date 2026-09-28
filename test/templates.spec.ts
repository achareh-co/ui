import { describe, expect, it } from 'vitest'
import { getTemplates } from '../src/templates'
import { kebabCase } from '../src/utils/theme'
import * as themes from '../src/theme'

describe('getTemplates', () => {
  const templates = getTemplates({})
  const byName = new Map(templates.map(template => [template.filename, template]))

  it('emits one theme module per theme export plus the shared files', () => {
    const expected = [
      ...Object.keys(themes).map(name => `ui/${kebabCase(name)}.ts`),
      'ui/index.ts',
      'ui.css',
      'types/ui.d.ts'
    ]
    expect([...byName.keys()].sort()).toEqual(expected.sort())
  })

  it('writes a JSON theme module that tv() can extend', async () => {
    const contents = await byName.get('ui/button.ts')!.getContents!({} as any)
    const theme = JSON.parse(contents.replace(/^export default /, ''))
    expect(theme.defaultVariants.color).toBe('primary')
    expect(Object.keys(theme.slots)).toContain('base')
  })

  it('points ui.css at the generated theme folder', async () => {
    const contents = await byName.get('ui.css')!.getContents!({} as any)
    expect(contents.startsWith('@source "./ui";')).toBe(true)
  })

  it('types every theme key in AppConfigUI', async () => {
    const contents = await byName.get('types/ui.d.ts')!.getContents!({} as any)
    for (const name of Object.keys(themes)) {
      expect(contents).toContain(`  ${name}?: ComponentThemeOverride`)
    }
  })
})
