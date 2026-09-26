/**
 * Figma `sana.sys.typescale`, mode RTL-Fa.
 * Each row is the role name, font-size (px), line-height (px), font-weight, and letter-spacing (px).
 * The brand family is shared. Utilities are `typo-<role>` and `typo-size-<role>` and the other single properties.
 */
export const fontFamilyBrand = 'KalamehFaNum, sans-serif'

export const typeScale = [
  ['display-large', 57, 80, 600, 0],
  ['display-medium', 45, 64, 600, 0],
  ['display-small', 36, 56, 600, 0],
  ['headline-large', 32, 48, 600, 0],
  ['headline-medium', 28, 40, 600, 0],
  ['headline-small', 24, 32, 500, 0],
  ['title-large', 22, 32, 600, 0],
  ['title-semilarge', 18, 32, 600, 0],
  ['title-medium', 16, 24, 600, 0],
  ['title-small', 14, 20, 600, 0],
  ['body-large', 16, 24, 400, 0],
  ['body-medium', 14, 20, 400, 0],
  ['body-small', 12, 16, 400, 0],
  ['label-large', 14, 20, 500, 0],
  ['label-medium', 12, 16, 500, 0],
  ['label-medium-emphasized', 12, 16, 600, 0],
  ['label-small', 11, 16, 400, 0],
  ['caption-large', 16, 16, 400, 0],
  ['caption-medium', 14, 16, 400, 0]
] as const

export function generateTypographyCss() {
  const values = [
    `    --ui-font-family-brand: ${fontFamilyBrand};`,
    ...typeScale.flatMap(([role, size, leading, weight, tracking]) => [
      `    --ui-font-size-${role}: ${size}px;`,
      `    --ui-leading-${role}: ${leading}px;`,
      `    --ui-font-weight-${role}: ${weight};`,
      `    --ui-tracking-${role}: ${tracking}px;`
    ])
  ].join('\n')

  const familyUtility = `@utility typo-family-brand {
  font-family: var(--ui-font-family-brand);
}`

  const utilities = typeScale.flatMap(([role]) => [
    `@utility typo-size-${role} {
  font-size: var(--ui-font-size-${role});
}`,
    `@utility typo-leading-${role} {
  line-height: var(--ui-leading-${role});
}`,
    `@utility typo-weight-${role} {
  font-weight: var(--ui-font-weight-${role});
}`,
    `@utility typo-tracking-${role} {
  letter-spacing: var(--ui-tracking-${role});
}`,
    `@utility typo-${role} {
  font-family: var(--ui-font-family-brand);
  font-size: var(--ui-font-size-${role});
  line-height: var(--ui-leading-${role});
  font-weight: var(--ui-font-weight-${role});
  letter-spacing: var(--ui-tracking-${role});
}`
  ]).join('\n\n')

  return `@layer theme {
  :root, :host {
${values}
  }
}

${familyUtility}

${utilities}`
}
