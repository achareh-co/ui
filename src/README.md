# src

ریشهٔ کتابخانه. سه لایه این‌جا از هم جدا می‌مانند: دادهٔ تم، runtime ویو، و آداپتر بیلد.

## فایل‌ها

| مسیر | کار |
| --- | --- |
| `theme/` | تعریف ظاهر. کامپوننت این فایل‌ها را مستقیم import نمی‌کند. |
| `runtime/` | Vue، composable و CSS توکن. |
| `utils/` | `defaultOptions`، `resolveTheme` و مقیاس توکن. فقط موقع تولید تم. |
| `shims/` | جایگزین تایپ‌چک برای `#imports` و `#build/app.config`. |
| `module.ts` | ماژول Nuxt: alias `#ui`، `addComponentsDir`، `addImports`، تمپلیت‌ها، پلاگین Tailwind. |
| `unplugin.ts` | نوشتن `#build/*` در `node_modules/.nuxt-ui` و alias. `createViteIntegrations` پلاگین‌های واقعی Vite را برمی‌گرداند. |
| `vite.ts` | `ui()` = `[AcharehUIPlugin.vite, ...createViteIntegrations].flat()`. |
| `templates.ts` | از exportهای `theme/index.ts` فایل `ui/<kebab>.ts`، `ui.css`، `ui.static.css` و `types/ui.d.ts` می‌سازد. |

## نقشهٔ تغییر بیلد

هر چیزی که alias، auto-import، ثبت کامپوننت یا فایل تولیدشده را عوض می‌کند:

1. رفتار مشترک را در `templates.ts` یا `utils/` بگذار، نه کپی در هر آداپتر.
2. Nuxt را در `module.ts` وصل کن (`addTemplate` / `addComponentsDir` / `addImports` / `addPlugin`).
3. Vue را در `unplugin.ts` وصل کن. پلاگین Tailwind، auto-import و resolver کامپوننت را داخل `config()` برنگردان؛ آن‌ها فقط از `createViteIntegrations` و بعد `vite.ts` وارد آرایهٔ سطح بالا می‌شوند.
4. resolver کامپوننت `enforce: 'post'` می‌ماند تا بعد از کامپایل SFC توسط `@vitejs/plugin-vue` ببیندشان.
5. هر دو playground را اجرا کن.

## قرارداد

- پیشوند پیش‌فرض کامپوننت `U` است (`ModuleOptions.prefix`).
- نام پکیج منتشرشده `@achareh/ui` است. خروجی‌ها در `package.json` → `exports`.
- کلاس رنگی را داخل `.vue` با قالب رشته‌ای نساز. رشتهٔ کامل (`bg-primary`) باید در تم تولیدشده باشد تا Tailwind اسکنش کند.
- `export type` از `runtime/types` را به `module.ts` اضافه نکن.

جزئیات هر زیرپوشه در `README.md` خودش است. ورود کل ریپو: [`AGENTS.md`](../AGENTS.md).
