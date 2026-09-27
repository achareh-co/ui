import { readFileSync, writeFileSync } from 'node:fs'
import {
  jsonPath,
  quote,
  readTokens,
  replaceExportedArray,
  repoFile
} from './read-figma-tokens.mjs'

function paletteEntries(root) {
  const group = root?.sana?.ref?.palette
  if (!group || typeof group !== 'object' || Array.isArray(group)) {
    throw new Error('Missing token path: sana.ref.palette')
  }

  const rows = []
  for (const [name, steps] of Object.entries(group)) {
    if (!steps || typeof steps !== 'object' || Array.isArray(steps) || '$value' in steps) {
      throw new Error(`Palette "${name}" has no steps`)
    }
    for (const [step, token] of Object.entries(steps)) {
      const hex = token?.$value?.hex
      if (typeof hex !== 'string' || !/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        throw new Error(`Palette ${name}/${step} has no #RRGGBB hex`)
      }
      if (!/^\d+$/.test(step)) {
        throw new Error(`Palette ${name}/${step} step is not numeric`)
      }
      rows.push([name, step, hex.toUpperCase()])
    }
  }

  if (rows.length === 0) {
    throw new Error('Palette sana.ref.palette is empty')
  }

  rows.sort((a, b) => a[0].localeCompare(b[0]) || Number(a[1]) - Number(b[1]))
  return rows
}

function semanticSteps(source) {
  const match = source.match(/export const semanticColors = \[[\s\S]*?\] as const/)
  if (!match) {
    throw new Error('Expected one export const semanticColors array')
  }
  const rows = [...match[0].matchAll(/\[\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*\]/g)]
  if (rows.length === 0) {
    throw new Error('semanticColors has no rows')
  }
  return rows.map(row => [row[1], row[2], row[3], row[4], row[5]])
}

const file = jsonPath('figma/configs/reference.palettes.json')
const entries = paletteEntries(readTokens(file))
const target = repoFile('src/utils/colors.ts')
const source = readFileSync(target, 'utf8')
const known = new Set(entries.map(([name, step]) => `${name}/${step}`))

for (const [name, lightPalette, lightStep, darkPalette, darkStep] of semanticSteps(source)) {
  for (const step of [`${lightPalette}/${lightStep}`, `${darkPalette}/${darkStep}`]) {
    if (!known.has(step)) {
      throw new Error(`Semantic color "${name}" references missing palette step ${step}`)
    }
  }
}

const next = replaceExportedArray(
  source,
  'paletteScale',
  entries.map(([name, step, hex]) => `  [${quote(name)}, ${quote(step)}, ${quote(hex)}]`)
)

writeFileSync(target, next)
console.log(`Updated paletteScale (${entries.length} steps) from ${file}`)
