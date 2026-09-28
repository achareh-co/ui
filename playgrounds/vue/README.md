# playgrounds/vue

اپ Vite + Vue که پلاگین منتشرشده را مصرف می‌کند. دستور از ریشه: `pnpm dev:vue`.

## فایل‌ها

| فایل | کار |
| --- | --- |
| `vite.config.ts` | `plugins: [vue(), ui()]`. ترتیب اجباری است. |
| `src/main.ts` | `createApp(App).use(ui)` از `@achareh/ui/vue-plugin`، بعد CSS. |
| `index.html` | `<html lang="fa" dir="rtl">` و `#app` با کلاس `isolate`. |
| `src/App.vue` | نمونه داخل `UApp` (پیش‌فرض `dir="rtl"`). |
| `src/assets/main.css` | `@import "tailwindcss"` سپس `@import "@achareh/ui"`. بلوک `@theme` و فونت همان `playgrounds/nuxt/app/assets/css/main.css` است: پالت آچاره کالا و `KalamehWebFaNum`. فایل فونت در `src/assets/fonts/` است. |
| `src/env.d.ts` | فقط `vite/client`. `components.d.ts` و `auto-imports.d.ts` از `include` در `tsconfig.json` می‌آیند. |

## قرارداد

- `ui()` را قبل از `vue()` نگذار. Vite 7 پلاگین‌های برگشتی از `config()` را دور می‌ریزد؛ `ui()` باید آرایهٔ سطح بالا باشد و resolver بعد از کامپایل SFC برسد.
- `ui({ ui })` در Vite تم تولیدشده و alias را می‌سازد. متغیر رنگ داخل CSS تولیدشده است. `app.use(ui)` در `main.ts` اورراید `ui` را اعمال می‌کند.
- کامپوننت و `useComponentProps` را دستی import نکن، مگر داری خود auto-import را تست می‌کنی.
- بعد از تغییر `src/vite.ts` یا `src/unplugin.ts`، dev server را از نو بالا بیاور تا پلاگین دوباره لود شود.
