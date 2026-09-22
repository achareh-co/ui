# src/runtime/plugins

پلاگین‌های Nuxt که باید سمت سرور/کلاینت Nuxt ثبت شوند. منطق قابل اشتراک این‌جا کپی نمی‌شود.

## فایل‌ها

| فایل | کار |
| --- | --- |
| `colors.ts` | `useHead` با استایل `achareh-ui-colors` از `generateColorCss(appConfig.ui.colors, prefix)`. |

## نقشه

- محاسبهٔ CSS در `runtime/utils/colors.ts` می‌ماند. این پوشه فقط آن را به `useHead` می‌دهد.
- ثبت فقط در `module.ts` با `addPlugin`. آداپتر Vue همین فایل را از `runtime/vue/plugin.ts` صدا می‌زند و `useHead` جعل‌شده در stub یک `<style>` می‌سازد.
- پلاگین جدید اگر به Nuxt (`useHead`, هوک) نیاز دارد این‌جا می‌آید و باید معادلش در `runtime/vue` هم وصل شود. اگر فقط تابع خالص است، جایش `runtime/utils` است.
