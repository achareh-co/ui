import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')

/** pnpm forwards the `--` separator to the script, so it is not a path. */
export function jsonPath(defaultRelative, argv = process.argv.slice(2)) {
  const args = argv.filter(arg => arg !== '--')
  if (args.length > 1) {
    throw new Error('Pass at most one JSON path')
  }
  return args.length === 1 ? resolve(args[0]) : resolve(root, defaultRelative)
}

export function readTokens(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'))
}

function walk(rootNode, segments) {
  let node = rootNode
  for (const segment of segments) {
    if (!node || typeof node !== 'object' || !(segment in node)) {
      throw new Error(`Missing token path: ${segments.join('.')}`)
    }
    node = node[segment]
  }
  return node
}

export function numericEntries(rootNode, segments) {
  const group = walk(rootNode, segments)
  if (!group || typeof group !== 'object' || Array.isArray(group)) {
    throw new Error(`Token group ${segments.join('.')} is missing`)
  }

  const entries = []
  for (const [key, token] of Object.entries(group)) {
    if (!token || typeof token !== 'object' || !('$value' in token)) {
      throw new Error(`Token ${segments.join('.')}.${key} has no $value`)
    }
    const value = token.$value
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      throw new Error(`Token ${segments.join('.')}.${key} is not a finite number`)
    }
    entries.push([key, value])
  }

  if (entries.length === 0) {
    throw new Error(`Token group ${segments.join('.')} is empty`)
  }

  return entries
}

export function stringToken(rootNode, segments) {
  const token = walk(rootNode, segments)
  if (!token || typeof token !== 'object' || typeof token.$value !== 'string' || token.$value.trim() === '') {
    throw new Error(`Token ${segments.join('.')} is not a string`)
  }
  return token.$value.trim()
}

/** `0`, then `px`, then numeric keys in numeric order, then any other keys. */
export function sortSpacing(entries) {
  const byKey = new Map(entries)
  const numeric = entries
    .map(([key]) => key)
    .filter(key => key !== '0' && key !== 'px' && /^\d+$/.test(key))
    .sort((a, b) => Number(a) - Number(b))
  const other = entries
    .map(([key]) => key)
    .filter(key => key !== '0' && key !== 'px' && !/^\d+$/.test(key))
  const keys = []
  if (byKey.has('0')) keys.push('0')
  if (byKey.has('px')) keys.push('px')
  keys.push(...numeric, ...other)
  return keys.map(key => [key, byKey.get(key)])
}

export function quote(value) {
  return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, '\\\'')}'`
}

export function replaceExportedArray(source, name, rowLines) {
  const pattern = new RegExp(`export const ${name} = \\[[\\s\\S]*?\\] as const`, 'g')
  const found = source.match(pattern)
  if (!found || found.length !== 1) {
    throw new Error(`Expected one export const ${name} array, found ${found?.length ?? 0}`)
  }
  const next = `export const ${name} = [\n${rowLines.join(',\n')}\n] as const`
  return source.replace(pattern, next)
}

export function replaceExportedString(source, name, value) {
  const pattern = new RegExp(`export const ${name} = '(?:\\\\'|[^'])*'`, 'g')
  const found = source.match(pattern)
  if (!found || found.length !== 1) {
    throw new Error(`Expected one export const ${name} string, found ${found?.length ?? 0}`)
  }
  const escaped = value.replace(/\\/g, '\\\\').replace(/'/g, '\\\'')
  return source.replace(pattern, `export const ${name} = '${escaped}'`)
}

export function repoFile(relativePath) {
  return resolve(root, relativePath)
}
