# src/shims

فقط برای `vue-tsc` روی خود کتابخانه. `tsconfig.json` این‌ها را به `#imports` و `#build/app.config` وصل می‌کند. در Nuxt، Vite و Vitest استفاده نمی‌شوند.

## فایل‌ها

| فایل | کار |
| --- | --- |
| `imports.ts` | `useAppConfig` خالی. تنها auto-importی که runtime امروز می‌خواند. |
| `app-config.ts` | `{ ui: getDefaultConfig() }` برای resolve شدن تایپ. |

## قرارداد

- این‌جا DOM، watch و تزریق استایل ننویس. رفتار Vue در `runtime/vue/stubs` است.
- اگر امضای یک auto-import عوض شد، هر سه جا را با هم عوض کن: این پوشه، `runtime/vue/stubs`، `test/mocks`.
- import از `#imports` داخل runtime درست است؛ import از `src/shims` داخل runtime ممنوع است.
