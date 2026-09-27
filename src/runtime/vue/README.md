# src/runtime/vue

نصب کتابخانه در اپ Vue معمولی، بدون Nuxt. مسیر پکیج: `@achareh/ui/vue-plugin`.

## فایل‌ها

| فایل | کار |
| --- | --- |
| `plugin.ts` | `install`: `applyUiOverrides`. |
| `stubs/imports.ts` | پیاده‌سازی `#imports` و `#build/app.config` در Vite. قراردادش در README همان پوشه است. |

## نقشه

`vite.ts` کامپوننت و `useComponentProps` را auto-import می‌کند. CSS رنگ با `@import "@achareh/ui"` می‌آید. override کانفیگ را `app.use(ui)` این‌جا انجام می‌دهد.

- گزینهٔ `ui` در `install` همان شکل `app.config.ui` است و با `defu` روی پیش‌فرض می‌نشیند.
- اگر پلاگین Nuxt جدیدی در `runtime/plugins` آمد که اپ Vite هم به آن نیاز دارد، از همین `install` صدا زده شود، با همان `runPlugin` که هم تابع و هم `{ setup }` را می‌فهمد.
- تایپ خروجی در `vue-plugin.d.ts` ریشهٔ ریپو است، نه این‌جا، چون `exports['./vue-plugin'].types` به آن فایل اشاره می‌کند.
