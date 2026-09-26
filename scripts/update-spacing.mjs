import { readFileSync, writeFileSync } from 'node:fs'
import {
  jsonPath,
  numericEntries,
  quote,
  readTokens,
  replaceExportedArray,
  repoFile,
  sortSpacing
} from './read-figma-tokens.mjs'

const file = jsonPath('figma/configs/spacing.system.tokens.json')
const entries = sortSpacing(numericEntries(readTokens(file), ['sana', 'sys', 'spacing']))
const target = repoFile('src/utils/spacing.ts')
const next = replaceExportedArray(
  readFileSync(target, 'utf8'),
  'spacingScale',
  entries.map(([key, px]) => `  [${quote(key)}, ${px}]`)
)

writeFileSync(target, next)
console.log(`Updated spacingScale (${entries.length} steps) from ${file}`)
