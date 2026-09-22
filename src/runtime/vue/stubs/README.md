# src/runtime/vue/stubs

جایگزین اجرایی APIهای Nuxt وقتی کد runtime زیر Vite است. `unplugin.ts` ماژول `#imports` را به همین `imports.ts` وصل می‌کند.

## فایل‌ها

| فایل | کار |
| --- | --- |
| `imports.ts` | `appConfig` واکنش‌گرا از `#build/app.config`، `useAppConfig`، `applyUiOverrides`، `defineNuxtPlugin`، `useHead` که `<style id="achareh-ui-colors">` را در `document.head` می‌نویسد. |

## سه جعل را قاطی نکن

| محیط | فایل | رفتار |
| --- | --- | --- |
| `vue-tsc` کتابخانه | `src/shims/imports.ts` | تابع خالی، فقط تایپ |
| Vite / playground Vue | همین پوشه | DOM و state واقعی |
| Vitest | `test/mocks/imports.ts` | `appConfig` قابل دستکاری در تست |

## قرارداد

- امضای `useAppConfig`، `useHead` و `defineNuxtPlugin` را با shim و mock همسان نگه دار، وگرنه یا بیلد Vite می‌شکند یا تست دروغ می‌گوید.
- `useHead` این‌جا فقط آرایهٔ `style` را می‌فهمد. قابلیت دیگر Nuxt `useHead` را تقلید نکن مگر پلاگین runtime واقعاً به آن نیاز داشته باشد.
- در SSR ویو (`document` نیست) `useHead` باید بی‌صدا برگردد.
