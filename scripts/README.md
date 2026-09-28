# scripts

به‌روزرسانی مقدار توکن از JSON فیگما. این فایل‌ها زمان بیلد import نمی‌شوند و داخل کامپوننت نیستند.

هر اسکریپت JSON پیش‌فرض را از `figma/configs` می‌خواند و فقط ثابت داده را در `src/utils` عوض می‌کند. `generateSpacingCss`، `generateBordersCss`، `generateTypographyCss` و `generateColorsCss` را بازنویسی نکن.

| اسکریپت | ثابت |
| --- | --- |
| `update-spacing.mjs` | `spacingScale` در `src/utils/spacing.ts`. ترتیب: `0`، `px`، بعد کلیدهای عددی. |
| `update-border-radius.mjs` | `borderRadiusScale` در `src/utils/borders.ts`. |
| `update-border-width.mjs` | `borderWidthScale`. `borderWidthNumericBridge` دست‌نویس می‌ماند. اگر `none`، `xs`، `sm`، `md` یا `lg` در JSON نباشد، اسکریپت خطا می‌دهد و فایلی نمی‌نویسد. |
| `update-typography.mjs` | `typeScale` و `fontFamilyBrand` در `src/utils/typography.ts`. نقش‌ها از `font-size` می‌آیند و باید در line-height، font-weight و letter-spacing هم باشند. خانوادهٔ بدون کاما `, sans-serif` می‌گیرد. |
| `update-palette.mjs` | `paletteScale` در `src/utils/colors.ts`. هگز از `$value.hex`. `semanticColors` دست‌نویس می‌ماند. اگر پلهٔ یک نقش semantic در پالت نباشد، اسکریپت خطا می‌دهد و فایلی نمی‌نویسد. |
| `update-emphasis.mjs` | `emphasisScale` در `src/utils/colors.ts`. مقدار، درصد صحیح ۰ تا ۱۰۰ است. |

خواندن مشترک DTCG در `read-figma-tokens.mjs` است. اگر مسیر مورد انتظار نباشد یا مقدار از نوع همان اسکریپت نباشد، خطا می‌دهد و فایلی نمی‌نویسد. مسیر JSON دیگر آرگومان اول است: `pnpm tokens:spacing -- ./other.json`. `jsonPath` جداکنندهٔ `--` را که pnpm به اسکریپت می‌فرستد نادیده می‌گیرد. تایپ exportها در `read-figma-tokens.d.mts` است؛ امضای تابع را عوض کردی، آن را هم عوض کن. تست: `test/scripts.spec.ts`.
