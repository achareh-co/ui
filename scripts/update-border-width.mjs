import { readFileSync, writeFileSync } from 'node:fs'
import {
  jsonPath,
  numericEntries,
  quote,
  readTokens,
  replaceExportedArray,
  repoFile
} from './read-figma-tokens.mjs'

const required = ['none', 'xs', 'sm', 'md', 'lg']
const file = jsonPath('figma/configs/border-width.system.tokens.json')
const entries = numericEntries(readTokens(file), ['sana', 'sys', 'border', 'width'])
const keys = new Set(entries.map(([key]) => key))

for (const key of required) {
  if (!keys.has(key)) {
    throw new Error(`border width is missing "${key}", which borderWidthNumericBridge still uses`)
  }
}

const target = repoFile('src/utils/borders.ts')
const next = replaceExportedArray(
  readFileSync(target, 'utf8'),
  'borderWidthScale',
  entries.map(([key, px]) => `  [${quote(key)}, ${px}]`)
)

writeFileSync(target, next)
console.log(`Updated borderWidthScale (${entries.length} steps) from ${file}`)
