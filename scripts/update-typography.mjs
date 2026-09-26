import { readFileSync, writeFileSync } from 'node:fs'
import {
  jsonPath,
  numericEntries,
  quote,
  readTokens,
  replaceExportedArray,
  replaceExportedString,
  repoFile,
  stringToken
} from './read-figma-tokens.mjs'

const file = jsonPath('figma/configs/RTL-Fa.system.tokens.json')
const tokens = readTokens(file)
const familyValue = stringToken(tokens, ['sana', 'sys', 'typescale', 'font-family', 'brand'])
const family = familyValue.includes(',') ? familyValue : `${familyValue}, sans-serif`
const sizes = numericEntries(tokens, ['sana', 'sys', 'typescale', 'font-size'])
const leading = new Map(numericEntries(tokens, ['sana', 'sys', 'typescale', 'line-height']))
const weight = new Map(numericEntries(tokens, ['sana', 'sys', 'typescale', 'font-weight']))
const tracking = new Map(numericEntries(tokens, ['sana', 'sys', 'typescale', 'letter-spacing']))

const rows = sizes.map(([role, size]) => {
  for (const [name, values] of [['line-height', leading], ['font-weight', weight], ['letter-spacing', tracking]]) {
    if (!values.has(role)) {
      throw new Error(`Role "${role}" is missing ${name}`)
    }
  }
  return [role, size, leading.get(role), weight.get(role), tracking.get(role)]
})

const target = repoFile('src/utils/typography.ts')
let source = readFileSync(target, 'utf8')
source = replaceExportedString(source, 'fontFamilyBrand', family)
source = replaceExportedArray(
  source,
  'typeScale',
  rows.map(([role, size, line, fontWeight, letterSpacing]) =>
    `  [${quote(role)}, ${size}, ${line}, ${fontWeight}, ${letterSpacing}]`
  )
)

writeFileSync(target, source)
console.log(`Updated typeScale (${rows.length} roles) and fontFamilyBrand from ${file}`)
