import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { jsonPath, sortSpacing } from '../scripts/read-figma-tokens.mjs'

const root = resolve(import.meta.dirname, '..')

describe('jsonPath', () => {
  it('uses the repo default when no path is passed', () => {
    expect(jsonPath('figma/configs/spacing.system.tokens.json', [])).toBe(resolve(root, 'figma/configs/spacing.system.tokens.json'))
  })

  it('ignores the -- separator pnpm forwards', () => {
    expect(jsonPath('figma/configs/spacing.system.tokens.json', ['--', '/tmp/tokens.json'])).toBe('/tmp/tokens.json')
  })

  it('rejects more than one path', () => {
    expect(() => jsonPath('figma/configs/spacing.system.tokens.json', ['a.json', 'b.json'])).toThrow('Pass at most one JSON path')
  })
})

describe('sortSpacing', () => {
  it('puts 0 and px first, then numeric keys in order', () => {
    expect(sortSpacing([['10', 24], ['px', 1], ['2', 4], ['0', 0]])).toEqual([['0', 0], ['px', 1], ['2', 4], ['10', 24]])
  })
})
