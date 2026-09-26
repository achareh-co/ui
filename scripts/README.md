# scripts

به‌روزرسانی مقدار توکن از JSON فیگما. این فایل‌ها زمان بیلد import نمی‌شوند و داخل کامپوننت نیستند.

هر اسکریپت JSON پیش‌فرض را از `figma/configs` می‌خواند و فقط ثابت داده را در `src/utils` عوض می‌کند. `generateSpacingCss`، `generateBordersCss` و `generateTypographyCss` را بازنویسی نکن.

| اسکریپت | ثابت |
| --- | --- |
| `update-spacing.mjs` | `spacingScale` در `src/utils/spacing.ts`. ترتیب: `0`، `px`، بعد کلیدهای عددی. |
| `update-border-radius.mjs` | `borderRadiusScale` در `src/utils/borders.ts`. |
| `update-border-width.mjs` | `borderWidthScale`. `borderWidthNumericBridge` دست‌نویس می‌ماند. اگر `none`، `xs`، `sm`، `md` یا `lg` در JSON نباشد، اسکریپت خطا می‌دهد و فایلی نمی‌نویسد. |
| `update-typography.mjs` | `typeScale` و `fontFamilyBrand` در `src/utils/typography.ts`. نقش‌ها از `font-size` می‌آیند و باید در line-height، font-weight و letter-spacing هم باشند. خانوادهٔ بدون کاما `, sans-serif` می‌گیرد. |

خواندن مشترک DTCG در `read-figma-tokens.mjs` است. مسیر `sana.sys...` یا مقدار غیرعددی یعنی خطا و بدون نوشتن فایل.
