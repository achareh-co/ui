# src/utils

منطق زمان بیلد برای تم و آپشن ماژول. از کامپوننت Vue import نمی‌شود.

## فایل‌ها

| فایل | کار |
| --- | --- |
| `defaults.ts` | `ModuleOptions`, `ThemeOptions`, `defaultOptions`, `getDefaultConfig()` (پالت پیش‌فرض semantic). |
| `theme.ts` | `resolveTheme`: اول `defaultVariants` سراسری، بعد `unstyled`، بعد prefix کلاس. `kebabCase` برای نام فایل تولیدشده. |

## نقشه

- آپشن جدید ماژول یا تم → `ThemeOptions` / `ModuleOptions` و مقدار در `defaultOptions`.
- تبدیل روی آبجکت تم (خالی کردن کلاس، prefix، جابه‌جایی `primary`/`md`) → تابع جدید در `theme.ts` و صدا زدن آن از `resolveTheme`، به همان ترتیب فعلی.
- `applyDefaultVariants` فقط `color: 'primary'` و `size: 'md'` را با پیش‌فرض سراسری عوض می‌کند. variantهای دیگر را این‌جا حدس نزن.
- پالت پیش‌فرض (`primary: 'green'` و بقیه) در `getDefaultConfig` است. کامپوننت‌ها این پالت را نمی‌خوانند؛ پلاگین رنگ می‌خواند.

`templates.ts` و هر دو آداپتر از همین‌جا می‌خوانند تا Nuxt و Vue از یک resolve استفاده کنند.
