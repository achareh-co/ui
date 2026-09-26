# src/utils

منطق زمان بیلد برای تم و آپشن ماژول. از کامپوننت Vue import نمی‌شود.

## فایل‌ها

| فایل | کار |
| --- | --- |
| `defaults.ts` | `ModuleOptions`, `ThemeOptions`, `defaultOptions`, `getDefaultConfig()` (پالت پیش‌فرض semantic). |
| `spacing.ts` | `spacingScale` و `generateSpacingCss`: پلهٔ فیگما به پیکسل، و CSS متغیر `--ui-spacing-*`. |
| `theme.ts` | `resolveTheme`: اول `defaultVariants` سراسری، بعد `unstyled`، بعد prefix کلاس. `kebabCase` برای نام فایل تولیدشده. |

## نقشه

- آپشن جدید ماژول یا تم → `ThemeOptions` / `ModuleOptions` و مقدار در `defaultOptions`.
- تبدیل روی آبجکت تم (خالی کردن کلاس، prefix، جابه‌جایی `primary`/`md`) → تابع جدید در `theme.ts` و صدا زدن آن از `resolveTheme`، به همان ترتیب فعلی.
- `applyDefaultVariants` فقط `color: 'primary'` و `size: 'md'` را با پیش‌فرض سراسری عوض می‌کند. variantهای دیگر را این‌جا حدس نزن.
- پالت پیش‌فرض (`primary: 'green'` و بقیه) در `getDefaultConfig` است. کامپوننت‌ها این پالت را نمی‌خوانند؛ پلاگین رنگ می‌خواند.
- پلهٔ تازهٔ spacing را فقط در `spacingScale` اضافه کن. `generateThemeCss` همان آرایه را می‌خواند. کلید، نام یوتیلیتی است (`4` → `p-4`) و مقدار، پیکسل است (`4` = ۸px، `8` = ۱۶px، `px` = ۱px).

`templates.ts` و هر دو آداپتر از همین‌جا می‌خوانند تا Nuxt و Vue از یک resolve استفاده کنند.
