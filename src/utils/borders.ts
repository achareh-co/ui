/**
 * Figma `sana.sys.border.radius` and `sana.sys.border.width`.
 * The key is the utility name (`rounded-sm`, `border-xs`).
 * The value is pixels. `full` is 999px.
 */
export const borderRadiusScale = [
  ['none', 0],
  ['2xs', 2],
  ['xs', 4],
  ['sm', 8],
  ['md', 12],
  ['lg', 16],
  ['xl', 24],
  ['2xl', 28],
  ['3xl', 32],
  ['full', 999]
] as const

export const borderWidthScale = [
  ['none', 0],
  ['xs', 1],
  ['sm', 2],
  ['md', 4],
  ['lg', 8]
] as const

/** Tailwind numeric widths (`border-0`, `border-2`, …) share the Figma pixel steps. */
const borderWidthNumericBridge = [
  ['0', 'none'],
  ['2', 'sm'],
  ['4', 'md'],
  ['8', 'lg']
] as const

export function generateBordersCss() {
  const values = [
    ...borderRadiusScale.map(([key, px]) => `    --ui-radius-${key}: ${px}px;`),
    ...borderWidthScale.map(([key, px]) => `    --ui-border-width-${key}: ${px}px;`)
  ].join('\n')
  const radiusBridge = borderRadiusScale
    .map(([key]) => `  --radius-${key}: var(--ui-radius-${key});`)
    .join('\n')
  const widthBridge = borderWidthScale
    .map(([key]) => `  --border-width-${key}: var(--ui-border-width-${key});`)
    .join('\n')
  const numericBridge = borderWidthNumericBridge
    .map(([step, key]) => `  --border-width-${step}: var(--ui-border-width-${key});`)
    .join('\n')

  return `@layer theme {
  :root, :host {
${values}
  }
}

@theme default inline {
${radiusBridge}
${widthBridge}
${numericBridge}
  --default-border-width: var(--ui-border-width-xs);
}`
}
