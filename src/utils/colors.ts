/**
 * Figma `sana.ref.palette`. The utility is `bg-<name>-<step>` (`bg-primary-40`).
 * Each step is one `@theme` key, `--color-<name>-<step>`. A later `@theme` block in the app replaces that key.
 * Semantic roles reference these keys. They are not rewritten by the token scripts.
 */
export const paletteScale = [
  ['error', '0', '#000000'],
  ['error', '10', '#2F0407'],
  ['error', '15', '#46060B'],
  ['error', '20', '#5E080F'],
  ['error', '30', '#8C0D16'],
  ['error', '35', '#A40F1A'],
  ['error', '40', '#BC111E'],
  ['error', '45', '#D21322'],
  ['error', '50', '#EA1525'],
  ['error', '60', '#EE4451'],
  ['error', '70', '#F2737C'],
  ['error', '75', '#F48A92'],
  ['error', '80', '#F7A1A8'],
  ['error', '85', '#F9B9BE'],
  ['error', '90', '#FBD0D3'],
  ['error', '95', '#FDE8E9'],
  ['error', '99', '#FFFAFB'],
  ['error', '100', '#FFFFFF'],
  ['info', '0', '#000000'],
  ['info', '10', '#00192E'],
  ['info', '15', '#002D51'],
  ['info', '20', '#003E70'],
  ['info', '30', '#01579D'],
  ['info', '35', '#016BC1'],
  ['info', '40', '#0188F6'],
  ['info', '45', '#1093FE'],
  ['info', '50', '#259CFE'],
  ['info', '60', '#43AAFE'],
  ['info', '70', '#62B8FE'],
  ['info', '75', '#80C6FE'],
  ['info', '80', '#9FD3FE'],
  ['info', '85', '#BDE1FF'],
  ['info', '90', '#DBEFFF'],
  ['info', '95', '#F0F8FF'],
  ['info', '99', '#FAFDFF'],
  ['info', '100', '#FFFFFF'],
  ['neutral', '0', '#000000'],
  ['neutral', '4', '#1B1B1D'],
  ['neutral', '5', '#1E1E20'],
  ['neutral', '6', '#222225'],
  ['neutral', '10', '#2A2A2D'],
  ['neutral', '12', '#2F2F32'],
  ['neutral', '17', '#343437'],
  ['neutral', '20', '#36373A'],
  ['neutral', '22', '#3B3C3F'],
  ['neutral', '24', '#404145'],
  ['neutral', '25', '#45464A'],
  ['neutral', '30', '#4A4B4F'],
  ['neutral', '35', '#535459'],
  ['neutral', '40', '#62646A'],
  ['neutral', '50', '#7B7D84'],
  ['neutral', '60', '#95979D'],
  ['neutral', '70', '#AFB1B5'],
  ['neutral', '80', '#CACBCE'],
  ['neutral', '87', '#D5D5D8'],
  ['neutral', '90', '#DFDFE2'],
  ['neutral', '92', '#E5E5E6'],
  ['neutral', '94', '#EAEAEB'],
  ['neutral', '95', '#ECECEE'],
  ['neutral', '96', '#F2F2F3'],
  ['neutral', '98', '#F8FAFB'],
  ['neutral', '99', '#FCFCFD'],
  ['neutral', '100', '#FFFFFF'],
  ['neutral-variant', '0', '#000000'],
  ['neutral-variant', '10', '#181D20'],
  ['neutral-variant', '15', '#283034'],
  ['neutral-variant', '20', '#333D42'],
  ['neutral-variant', '30', '#435056'],
  ['neutral-variant', '35', '#4C5A62'],
  ['neutral-variant', '40', '#5B6D76'],
  ['neutral-variant', '45', '#667A84'],
  ['neutral-variant', '50', '#6F8590'],
  ['neutral-variant', '60', '#8C9DA6'],
  ['neutral-variant', '70', '#A9B5BC'],
  ['neutral-variant', '75', '#B7C2C7'],
  ['neutral-variant', '80', '#C5CED3'],
  ['neutral-variant', '85', '#D3DADE'],
  ['neutral-variant', '90', '#E2E6E9'],
  ['neutral-variant', '95', '#F0F3F4'],
  ['neutral-variant', '99', '#F9FAFB'],
  ['neutral-variant', '100', '#FFFFFF'],
  ['primary', '0', '#000000'],
  ['primary', '10', '#00423A'],
  ['primary', '15', '#00594D'],
  ['primary', '20', '#006D5F'],
  ['primary', '30', '#008A78'],
  ['primary', '35', '#00A38F'],
  ['primary', '40', '#00BFA5'],
  ['primary', '45', '#00CCB1'],
  ['primary', '50', '#00DBBF'],
  ['primary', '60', '#0AFFDF'],
  ['primary', '70', '#61FFEA'],
  ['primary', '75', '#91FDEF'],
  ['primary', '80', '#A3FFF3'],
  ['primary', '85', '#B2FFF5'],
  ['primary', '90', '#CCFFF8'],
  ['primary', '95', '#E0FFFB'],
  ['primary', '99', '#F0FFFD'],
  ['primary', '100', '#FFFFFF'],
  ['secondary', '0', '#000000'],
  ['secondary', '10', '#260042'],
  ['secondary', '15', '#310057'],
  ['secondary', '20', '#480080'],
  ['secondary', '30', '#5F00A8'],
  ['secondary', '35', '#6B00BD'],
  ['secondary', '40', '#7F00E0'],
  ['secondary', '45', '#8B00F5'],
  ['secondary', '50', '#950AFF'],
  ['secondary', '60', '#A938FF'],
  ['secondary', '70', '#BB61FF'],
  ['secondary', '75', '#C170FF'],
  ['secondary', '80', '#D194FF'],
  ['secondary', '85', '#D9A8FF'],
  ['secondary', '90', '#E4C2FF'],
  ['secondary', '95', '#F4E5FF'],
  ['secondary', '99', '#F9F0FF'],
  ['secondary', '100', '#FFFFFF'],
  ['success', '0', '#000000'],
  ['success', '10', '#002E11'],
  ['success', '15', '#004D1C'],
  ['success', '20', '#006625'],
  ['success', '30', '#008531'],
  ['success', '35', '#009E3A'],
  ['success', '40', '#00B843'],
  ['success', '45', '#00D14D'],
  ['success', '50', '#00EB56'],
  ['success', '60', '#1AFF6E'],
  ['success', '70', '#52FF91'],
  ['success', '75', '#70FFA5'],
  ['success', '80', '#9EFFC2'],
  ['success', '85', '#B8FFD2'],
  ['success', '90', '#D6FFE5'],
  ['success', '95', '#EBFFF2'],
  ['success', '99', '#FAFFFC'],
  ['success', '100', '#FFFFFF'],
  ['tertiary', '0', '#000000'],
  ['tertiary', '10', '#001B29'],
  ['tertiary', '15', '#002538'],
  ['tertiary', '20', '#003049'],
  ['tertiary', '30', '#004366'],
  ['tertiary', '35', '#005480'],
  ['tertiary', '40', '#00689E'],
  ['tertiary', '45', '#007CBD'],
  ['tertiary', '50', '#0094E0'],
  ['tertiary', '60', '#29B5FF'],
  ['tertiary', '70', '#5CC8FF'],
  ['tertiary', '75', '#80D3FF'],
  ['tertiary', '80', '#99DCFF'],
  ['tertiary', '85', '#B2E5FF'],
  ['tertiary', '90', '#CCEEFF'],
  ['tertiary', '95', '#E5F6FF'],
  ['tertiary', '99', '#FAFDFF'],
  ['tertiary', '100', '#FFFFFF'],
  ['warning', '0', '#000000'],
  ['warning', '10', '#2E1400'],
  ['warning', '15', '#602B00'],
  ['warning', '20', '#843B01'],
  ['warning', '30', '#A84A01'],
  ['warning', '35', '#C15601'],
  ['warning', '40', '#EF6A01'],
  ['warning', '45', '#FE7910'],
  ['warning', '50', '#FE872A'],
  ['warning', '60', '#FE9643'],
  ['warning', '70', '#FEB071'],
  ['warning', '75', '#FEBE8A'],
  ['warning', '80', '#FFCFA9'],
  ['warning', '85', '#FFDDC2'],
  ['warning', '90', '#FFE8D6'],
  ['warning', '95', '#FFF6F0'],
  ['warning', '99', '#FFFCFA'],
  ['warning', '100', '#FFFFFF']
] as const

/**
 * Light and dark palette steps for each role: name, light palette, light step, dark palette, dark step.
 */
export const semanticColors = [
  ['primary', 'primary', '40', 'primary', '80'],
  ['on-primary', 'primary', '100', 'primary', '20'],
  ['secondary', 'secondary', '40', 'secondary', '80'],
  ['on-secondary', 'secondary', '100', 'secondary', '20'],
  ['tertiary', 'tertiary', '40', 'tertiary', '80'],
  ['on-tertiary', 'tertiary', '100', 'tertiary', '20'],
  ['error', 'error', '40', 'error', '80'],
  ['on-error', 'error', '100', 'error', '20'],
  ['success', 'success', '40', 'success', '80'],
  ['on-success', 'success', '100', 'success', '20'],
  ['warning', 'warning', '40', 'warning', '80'],
  ['on-warning', 'warning', '100', 'warning', '20'],
  ['info', 'info', '40', 'info', '80'],
  ['on-info', 'info', '100', 'info', '20'],
  ['background', 'neutral', '98', 'neutral', '6'],
  ['on-background', 'neutral', '6', 'neutral', '90'],
  ['surface', 'neutral', '98', 'neutral', '6'],
  ['on-surface', 'neutral', '10', 'neutral', '80'],
  ['on-surface-variant', 'neutral-variant', '30', 'neutral-variant', '70'],
  ['surface-container-lowest', 'neutral', '100', 'neutral', '4'],
  ['surface-container-low', 'neutral', '96', 'neutral', '10'],
  ['surface-container', 'neutral', '94', 'neutral', '12'],
  ['surface-container-high', 'neutral', '92', 'neutral', '17'],
  ['surface-container-highest', 'neutral', '90', 'neutral', '22'],
  ['inverse-surface', 'neutral', '20', 'neutral', '90'],
  ['on-inverse-surface', 'neutral', '95', 'neutral', '20'],
  ['outline', 'neutral-variant', '50', 'neutral-variant', '60'],
  ['outline-variant', 'neutral-variant', '80', 'neutral-variant', '40']
] as const

/** Figma `sana.sys.emphasis level`. The value is a percent used as color alpha. */
export const emphasisScale = [
  ['high', 88],
  ['strong', 72],
  ['medium', 60],
  ['regular', 48],
  ['light', 24],
  ['low', 12],
  ['weak', 8]
] as const

function colorStep(name: string, step: string) {
  return `var(--color-${name}-${step})`
}

export function generateColorsCss() {
  const emphasisValues = emphasisScale
    .map(([level, percent]) => `    --ui-emphasis-${level}: ${percent}%;`)
    .join('\n')
  const lightValues = semanticColors
    .map(([name, palette, step]) => `    --ui-color-${name}: ${colorStep(palette, step)};`)
    .join('\n')
  const darkValues = semanticColors
    .map(([name, , , palette, step]) => `    --ui-color-${name}: ${colorStep(palette, step)};`)
    .join('\n')
  const paletteKeys = paletteScale
    .map(([name, step, hex]) => `  --color-${name}-${step}: ${hex};`)
    .join('\n')
  const semanticBridge = semanticColors
    .map(([name]) => `  --color-${name}: var(--ui-color-${name});`)
    .join('\n')
  const emphasisBridge = emphasisScale
    .map(([level]) => `  --opacity-${level}: var(--ui-emphasis-${level});`)
    .join('\n')

  return `@layer theme {
  :root, :host {
${emphasisValues}
  }

  :root, :host, .light {
${lightValues}
  }

  .dark {
${darkValues}
  }
}

@theme default {
  --color-*: initial;
  --color-inherit: inherit;
  --color-current: currentcolor;
  --color-transparent: transparent;
${paletteKeys}
${emphasisBridge}
}

@theme inline {
${semanticBridge}
}`
}
