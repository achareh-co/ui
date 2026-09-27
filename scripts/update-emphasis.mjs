import { readFileSync, writeFileSync } from 'node:fs'
import {
  jsonPath,
  numericEntries,
  quote,
  readTokens,
  replaceExportedArray,
  repoFile
} from './read-figma-tokens.mjs'

const rank = ['high', 'strong', 'medium', 'regular', 'light', 'low', 'weak']

const file = jsonPath('figma/configs/emphasis.levels.json')
const entries = numericEntries(readTokens(file), ['sana', 'sys', 'emphasis level'])
  .map(([level, percent]) => {
    if (!Number.isInteger(percent) || percent < 0 || percent > 100) {
      throw new Error(`Emphasis "${level}" must be an integer percent from 0 to 100`)
    }
    return [level, percent]
  })
  .sort((a, b) => {
    const left = rank.indexOf(a[0])
    const right = rank.indexOf(b[0])
    return (left === -1 ? rank.length : left) - (right === -1 ? rank.length : right) || String(a[0]).localeCompare(String(b[0]))
  })

const target = repoFile('src/utils/colors.ts')
const next = replaceExportedArray(
  readFileSync(target, 'utf8'),
  'emphasisScale',
  entries.map(([level, percent]) => `  [${quote(level)}, ${percent}]`)
)

writeFileSync(target, next)
console.log(`Updated emphasisScale (${entries.length} levels) from ${file}`)
