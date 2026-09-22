import colors from 'tailwindcss/colors'

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

function readShade(name: string, shade: number) {
  const palette = (colors as Record<string, Record<number, string> | string>)[name]
  if (palette && typeof palette === 'object' && shade in palette) {
    return palette[shade] || ''
  }
  return ''
}

export function generateColorCss(colorMap: Record<string, string | undefined>, prefix?: string) {
  const prefixStr = prefix ? `${prefix}-` : ''
  const entries = Object.entries(colorMap).filter((entry): entry is [string, string] => Boolean(entry[1]))

  const shadeLines = entries.flatMap(([key, value]) => shades.map((shade) => {
    const fallback = readShade(value, shade)
    const token = value === 'neutral' ? 'old-neutral' : value
    const fallbackArg = fallback ? `, ${fallback}` : ''
    return `--ui-color-${key}-${shade}: var(--${prefixStr}color-${token}-${shade}${fallbackArg});`
  }))

  const semantic = entries.filter(([key]) => key !== 'neutral')
  const light = semantic.map(([key]) => `--ui-${key}: var(--ui-color-${key}-500);`)
  const dark = semantic.map(([key]) => `--ui-${key}: var(--ui-color-${key}-400);`)

  return `@layer theme {
  :root, :host {
    ${shadeLines.join('\n    ')}
  }
  :root, :host, .light {
    ${light.join('\n    ')}
  }
  .dark {
    ${dark.join('\n    ')}
  }
}`
}
