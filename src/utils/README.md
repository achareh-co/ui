# src/utils

منطق زمان بیلد برای تم و آپشن ماژول. از کامپوننت Vue import نمی‌شود.

## فایل‌ها

| فایل | کار |
| --- | --- |
| `defaults.ts` | `ModuleOptions`, `ThemeOptions`, `defaultOptions`, `getDefaultConfig()` (پالت پیش‌فرض semantic). |
| `spacing.ts` | `spacingScale` و `generateSpacingCss`: پلهٔ فیگما به پیکسل، و CSS متغیر `--ui-spacing-*`. |
| `borders.ts` | `borderRadiusScale`، `borderWidthScale` و `generateBordersCss`: توکن فیگما به پیکسل، و CSS متغیر `--ui-radius-*` و `--ui-border-width-*`. |
| `typography.ts` | `typeScale`، `fontFamilyBrand` و `generateTypographyCss`: نقش RTL-Fa و CSS متغیر `--ui-font-*` به‌علاوهٔ یوتیلیتی `typo-*`. |
| `theme.ts` | `resolveTheme`: اول `defaultVariants` سراسری، بعد `unstyled`، بعد prefix کلاس. `kebabCase` برای نام فایل تولیدشده. |

## نقشه

- آپشن جدید ماژول یا تم → `ThemeOptions` / `ModuleOptions` و مقدار در `defaultOptions`.
- تبدیل روی آبجکت تم (خالی کردن کلاس، prefix، جابه‌جایی `primary`/`md`) → تابع جدید در `theme.ts` و صدا زدن آن از `resolveTheme`، به همان ترتیب فعلی.
- `applyDefaultVariants` فقط `color: 'primary'` و `size: 'md'` را با پیش‌فرض سراسری عوض می‌کند. variantهای دیگر را این‌جا حدس نزن.
- پالت پیش‌فرض (`primary: 'green'` و بقیه) در `getDefaultConfig` است. کامپوننت‌ها این پالت را نمی‌خوانند؛ پلاگین رنگ می‌خواند.
- پلهٔ تازهٔ spacing را فقط در `spacingScale` اضافه کن. `generateThemeCss` همان آرایه را می‌خواند. کلید، نام یوتیلیتی است (`4` → `p-4`) و مقدار، پیکسل است (`4` = ۸px، `8` = ۱۶px، `px` = ۱px).
- پلهٔ تازهٔ radius یا border-width را فقط در `borderRadiusScale` / `borderWidthScale` اضافه کن. کلید، نام یوتیلیتی است (`sm` → `rounded-sm` و `border-sm`) و مقدار، پیکسل است (`rounded-sm` = ۸px، `rounded-xs` = ۴px، `border-xs` = ۱px). اورراید با `--ui-radius-*` و `--ui-border-width-*` است. `--ui-radius` دیگر خوانده نمی‌شود.
- نقش تازهٔ تایپوگرافی را فقط در `typeScale` اضافه کن. `generateThemeCss` همان آرایه را می‌خواند. نام نقش، بخش دوم کلاس است (`label-large` → `typo-label-large`). هر ردیف اندازه، ارتفاع خط، وزن و فاصلهٔ حروف است. خانواده در `fontFamilyBrand` است. اورراید با `--ui-font-size-*`، `--ui-leading-*`، `--ui-font-weight-*`، `--ui-tracking-*` و `--ui-font-family-brand` است. یوتیلیتی تک‌خاصیت `typo-size-*`، `typo-leading-*`، `typo-weight-*`، `typo-tracking-*` و `typo-family-brand` است.

`templates.ts` و هر دو آداپتر از همین‌جا می‌خوانند تا Nuxt و Vue از یک resolve استفاده کنند.
