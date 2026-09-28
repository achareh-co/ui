# src/runtime/plugins

پلاگین‌های Nuxt که باید سمت سرور/کلاینت Nuxt ثبت شوند. منطق قابل اشتراک این‌جا کپی نمی‌شود.

الان پلاگینی این‌جا نیست. رنگ در زمان بیلد از `src/utils/colors.ts` داخل `#build/ui.css` ساخته می‌شود و از `app.config` نمی‌آید.

## نقشه

- پلاگین جدید اگر به Nuxt (`useHead`, هوک) نیاز دارد این‌جا می‌آید و باید معادلش در `runtime/vue` هم وصل شود. جعل `#imports` امروز فقط `useAppConfig` دارد؛ `defineNuxtPlugin` و `useHead` را در همان تغییر به `src/shims`، `runtime/vue/stubs` و `test/mocks` اضافه کن. اگر فقط تابع خالص است، جایش `runtime/utils` یا، برای دادهٔ تم، `src/utils` است.
- ثبت فقط در `module.ts` با `addPlugin`. آداپتر Vue همان فایل را از `runtime/vue/plugin.ts` صدا می‌زند.
