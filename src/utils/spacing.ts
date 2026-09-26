/**
 * Figma `sana.sys.spacing`. The key is the utility step (`p-4`, `gap-4`).
 * The value is pixels. `px` is the 1px step.
 */
export const spacingScale = [
  ['0', 0],
  ['px', 1],
  ['1', 2],
  ['2', 4],
  ['3', 6],
  ['4', 8],
  ['5', 10],
  ['6', 12],
  ['7', 14],
  ['8', 16],
  ['9', 20],
  ['10', 24],
  ['11', 28],
  ['12', 32],
  ['13', 36],
  ['14', 40],
  ['15', 44],
  ['16', 48],
  ['17', 56],
  ['18', 64],
  ['19', 72],
  ['20', 80],
  ['21', 88],
  ['22', 96],
  ['23', 104],
  ['24', 112],
  ['25', 120],
  ['26', 128],
  ['27', 144],
  ['28', 160],
  ['29', 176],
  ['30', 192],
  ['31', 208],
  ['32', 224],
  ['33', 240],
  ['34', 256],
  ['35', 288],
  ['36', 320],
  ['37', 384],
  ['38', 448],
  ['39', 480],
  ['40', 512],
  ['41', 544],
  ['42', 576],
  ['43', 640],
  ['44', 704],
  ['45', 768],
  ['46', 832],
  ['47', 896],
  ['48', 960],
  ['49', 1024],
  ['50', 1088],
  ['51', 1152],
  ['52', 1216],
  ['53', 1280]
] as const

export function generateSpacingCss() {
  const values = spacingScale
    .map(([key, px]) => `    --ui-spacing-${key}: ${px}px;`)
    .join('\n')
  const bridge = spacingScale
    .map(([key]) => `  --spacing-${key}: var(--ui-spacing-${key});`)
    .join('\n')

  return `@layer theme {
  :root, :host {
${values}
  }
}

@theme {
  --spacing: initial;
}

@theme default inline {
${bridge}
}`
}
