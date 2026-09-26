import { readFileSync, writeFileSync } from 'node:fs'
import {
  jsonPath,
  numericEntries,
  quote,
  readTokens,
  replaceExportedArray,
  repoFile
} from './read-figma-tokens.mjs'

const file = jsonPath('figma/configs/border-radius.system.tokens.json')
const entries = numericEntries(readTokens(file), ['sana', 'sys', 'border', 'radius'])
const target = repoFile('src/utils/borders.ts')
const next = replaceExportedArray(
  readFileSync(target, 'utf8'),
  'borderRadiusScale',
  entries.map(([key, px]) => `  [${quote(key)}, ${px}]`)
)

writeFileSync(target, next)
console.log(`Updated borderRadiusScale (${entries.length} steps) from ${file}`)
