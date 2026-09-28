# src/runtime/vue/stubs

جایگزین اجرایی APIهای Nuxt وقتی کد runtime زیر Vite است. `unplugin.ts` ماژول `#imports` را به همین `imports.ts` وصل می‌کند.

## فایل‌ها

| فایل | کار |
| --- | --- |
| `imports.ts` | `appConfig` واکنش‌گرا از `#build/app.config`، `useAppConfig` و `applyUiOverrides`. |

## سه جعل را قاطی نکن

| محیط | فایل | رفتار |
| --- | --- | --- |
| `vue-tsc` کتابخانه | `src/shims/imports.ts` | تابع خالی، فقط تایپ |
| Vite / playground Vue | همین پوشه | state واقعی |
| Vitest | `test/mocks/imports.ts` | `appConfig` قابل دستکاری در تست |

## قرارداد

- امضای `useAppConfig` را با shim و mock همسان نگه دار، وگرنه یا بیلد Vite می‌شکند یا تست دروغ می‌گوید.
- runtime امروز فقط `useAppConfig` را از `#imports` می‌خواند. اگر کدی `useHead`، `defineNuxtPlugin` یا auto-import دیگری خواست، همان را در همین تغییر به هر سه فایل اضافه کن و فقط همان بخشی را تقلید کن که واقعاً لازم است.
- کدی که به `document` دست می‌زند در SSR ویو (`document` نیست) باید بی‌صدا برگردد.
