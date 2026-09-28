# src/utils

منطق زمان بیلد برای تم و آپشن ماژول. از کامپوننت Vue import نمی‌شود.

## فایل‌ها

| فایل | کار |
| --- | --- |
| `defaults.ts` | `ModuleOptions`, `ThemeOptions`, `defaultOptions`, `getDefaultConfig()`. `theme.colors` پیش‌فرض همان هفت نقش فیگماست (`primary` تا `error`، با `tertiary`)؛ رنگ تازه با `defu` به این آرایه اضافه می‌شود و کلیدهای `@theme` لازمش در JSDoc همان فیلد است. |
| `spacing.ts` | `spacingScale` و `generateSpacingCss`: پلهٔ فیگما به پیکسل، و CSS متغیر `--ui-spacing-*`. |
| `borders.ts` | `borderRadiusScale`، `borderWidthScale` و `generateBordersCss`: توکن فیگما به پیکسل، و CSS متغیر `--ui-radius-*` و `--ui-border-width-*`. |
| `typography.ts` | `typeScale`، `fontFamilyBrand` و `generateTypographyCss`: نقش RTL-Fa و CSS متغیر `--ui-font-*` به‌علاوهٔ یوتیلیتی `typo-*`. |
| `colors.ts` | `paletteScale`، `semanticColors`، `emphasisScale` و `generateColorsCss`: پلهٔ پالت، نقش semantic و درصد شفافیت. |
| `theme.ts` | `resolveTheme`: اول `defaultVariants` سراسری، بعد `unstyled`، بعد prefix کلاس. `kebabCase` برای نام فایل تولیدشده. |

## نقشه

- آپشن جدید ماژول یا تم → `ThemeOptions` / `ModuleOptions` و مقدار در `defaultOptions`.
- تبدیل روی آبجکت تم (خالی کردن کلاس، prefix، جابه‌جایی `primary`) → تابع جدید در `theme.ts` و صدا زدن آن از `resolveTheme`، به همان ترتیب فعلی.
- `applyDefaultVariants` فقط `color: 'primary'` را با `theme.defaultVariants.color` عوض می‌کند. کامپوننت‌ها variant `size` ندارند؛ variantهای دیگر را این‌جا حدس نزن.
- `getDefaultConfig` دیگر نام پالت Tailwind ندارد. رنگ از `colors.ts` می‌آید.
- پلهٔ spacing از `figma/configs/spacing.system.tokens.json` می‌آید. `pnpm tokens:spacing` همان را در `spacingScale` می‌نویسد. `generateThemeCss` آن آرایه را می‌خواند. کلید، نام یوتیلیتی است (`4` → `p-4`) و مقدار، پیکسل است (`4` = ۸px، `8` = ۱۶px، `px` = ۱px).
- شعاع و ضخامت border از `figma/configs/border-radius.system.tokens.json` و `border-width.system.tokens.json` می‌آیند. `pnpm tokens:radius` و `pnpm tokens:border-width` آرایه‌ها را می‌نویسند. `borderWidthNumericBridge` را اسکریپت عوض نمی‌کند. کلید، نام یوتیلیتی است (`sm` → `rounded-sm` و `border-sm`) و مقدار، پیکسل است (`rounded-sm` = ۸px، `rounded-xs` = ۴px، `border-xs` = ۱px). اورراید با `--ui-radius-*` و `--ui-border-width-*` است. `--ui-radius` دیگر خوانده نمی‌شود.
- پلهٔ رنگ از `figma/configs/reference.palettes.json` می‌آید. `pnpm tokens:palette` همان را در `paletteScale` می‌نویسد و چک می‌کند پلهٔ هر ردیف `semanticColors` هنوز باشد. `semanticColors` دست‌نویس است و رمپ نیست. درصد شفافیت از `figma/configs/emphasis.levels.json` می‌آید و `pnpm tokens:emphasis` آن را در `emphasisScale` می‌نویسد. شمارهٔ پله تبدیل نمی‌شود: `0` تیره‌ترین است و `100` روشن‌ترین. کلاس پله `bg-primary-50` است و هگزش روی همان کلید `@theme default` می‌نشیند (`--color-primary-50: #00DBBF`). شفافیت همان پله `bg-primary-50/high` است (`--opacity-high` به `--ui-emphasis-high`). نقش semantic کلاس معتبر است (`hover:bg-on-primary`) و مقدارش `var(--color-<palette>-<step>)` است. `bg-primary` بدون شماره نقش جامد است، نه پلهٔ `50`. `generateThemeCss` با `--color-*: initial` پالت پیش‌فرض Tailwind را برمی‌دارد (`--color-red-100` ساخته نمی‌شود). اپ همان کلید را در `@theme` خودش عوض می‌کند؛ مقدار فیگما آن کلید در خروجی بیلد اپ نمی‌ماند. درصد emphasis با `--ui-emphasis-*` عوض می‌شود.
- نقش تایپوگرافی از `figma/configs/RTL-Fa.system.tokens.json` می‌آید. `pnpm tokens:typography` همان را در `typeScale` و `fontFamilyBrand` می‌نویسد. `generateThemeCss` آن آرایه را می‌خواند. نام نقش، بخش دوم کلاس است (`label-large` → `typo-label-large`). هر ردیف اندازه، ارتفاع خط، وزن و فاصلهٔ حروف است. اورراید با `--ui-font-size-*`، `--ui-leading-*`، `--ui-font-weight-*`، `--ui-tracking-*` و `--ui-font-family-brand` است. یوتیلیتی تک‌خاصیت `typo-size-*`، `typo-leading-*`، `typo-weight-*`، `typo-tracking-*` و `typo-family-brand` است.

`templates.ts` و هر دو آداپتر از همین‌جا می‌خوانند تا Nuxt و Vue از یک resolve استفاده کنند.
