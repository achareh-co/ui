# playgrounds/vue

اپ Vite + Vue که پلاگین منتشرشده را مصرف می‌کند. دستور از ریشه: `pnpm dev:vue`.

## فایل‌ها

| فایل | کار |
| --- | --- |
| `vite.config.ts` | `plugins: [vue(), ui()]`. ترتیب اجباری است. |
| `src/main.ts` | `createApp(App).use(ui)` از `@achareh/ui/vue-plugin`، بعد CSS. |
| `src/App.vue` | نمونه داخل `UApp`. |
| `src/assets/main.css` | `@import "tailwindcss"` سپس `@import "@achareh/ui"`. بلوک `@theme` پله‌های `primary` را با `#0055ff`، `#99bbff`، `#ffffff` و `#003322` عوض می‌کند. کامنت `--ui-spacing-*`، `--ui-radius-*`، `--ui-border-width-*`، `--ui-font-size-*` و `--ui-emphasis-*` نمونهٔ اورراید بقیه است. |
| `src/env.d.ts` | ارجاع به `components.d.ts` و `auto-imports.d.ts`. |

## قرارداد

- `ui()` را قبل از `vue()` نگذار. Vite 7 پلاگین‌های برگشتی از `config()` را دور می‌ریزد؛ `ui()` باید آرایهٔ سطح بالا باشد و resolver بعد از کامپایل SFC برسد.
- `ui({ ui })` در Vite تم تولیدشده و alias را می‌سازد. متغیر رنگ داخل CSS تولیدشده است. `app.use(ui)` در `main.ts` اورراید `ui` را اعمال می‌کند.
- کامپوننت و `useComponentProps` را دستی import نکن، مگر داری خود auto-import را تست می‌کنی.
- بعد از تغییر `src/vite.ts` یا `src/unplugin.ts`، dev server را از نو بالا بیاور تا پلاگین دوباره لود شود.
