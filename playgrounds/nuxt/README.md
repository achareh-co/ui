# playgrounds/nuxt

اپ Nuxt 4 که ماژول را از ورک‌اسپیس می‌گیرد. دستور از ریشه: `pnpm dev`.

## فایل‌ها

| فایل | کار |
| --- | --- |
| `nuxt.config.ts` | `modules: ['@achareh/ui']`، CSS اپ و `htmlAttrs` با `lang="fa"` و `dir="rtl"`. |
| `app/app.config.ts` | خالی؛ در صورت نیاز `ui.<name>.defaultVariants` یا `slots`. رنگ این‌جا نیست. |
| `app/app.vue` | `NuxtPage` داخل `UApp`. |
| `app/pages/index.vue` | نمونهٔ `UButton` / `UInput` و کلاس `dark` روی `documentElement`. |
| `app/assets/css/main.css` | `@import "tailwindcss"` سپس `@import "@achareh/ui"`. بلوک `@theme` پالت آچاره کالا است (`primary-40` = `#482b9e`). `:root` خانوادهٔ فونت را `KalamehWebFaNum` می‌کند و وزن display / headline / title را ۷۰۰ می‌گذارد. فایل فونت در `app/assets/fonts/` است. فاصله، شعاع، ضخامت border و emphasis از قبل همان مقیاس فیگما هستند و این‌جا اورراید نمی‌شوند. |
| `.storybook/main.ts` | فریم‌ورک `@storybook-vue/nuxt`. استوری جدید این‌جا نیست؛ glob همان `src/runtime/components/**/*.stories.ts` کتابخانه است. `viteFinal` فقط `paths.mjs` تولیدی Nuxt را مثل حالت dev اینلاین می‌کند، چون فریم‌ورک Nuxt را با `dev: false` بالا می‌آورد. |
| `.storybook/preview.ts` | CSS همین اپ، کلاس `light` / `dark` روی `html`، و پیچیدن هر استوری در `App` با `dir="rtl"`. |
| `.storybook/preview.css` | `html` راست‌به‌چپ، هم‌جهت با `App`. |

## قرارداد

- کامپوننت را دستی import نکن. پیشوند `U` را ماژول می‌چسباند.
- تغییر آپشن ماژول این‌جا یعنی همان را در `playgrounds/vue/vite.config.ts` هم معنی کن، مگر تفاوت عمدی دو آداپتر باشد.
- `UApp` در `app.vue` همهٔ صفحه‌ها را می‌پیچد و `dir="rtl"` و `ConfigProvider` را می‌دهد. `isolate` را جدا از آن خود ماژول روی `rootAttrs` می‌گذارد. مثالی که جهت دیگری لازم دارد `UApp dir="ltr"` تو در تو یا prop `direction` کامپوننت را نشان دهد.
- تم یا SFC کتابخانه را این‌جا کپی نکن.
- استوری را این‌جا ننویس. `.storybook` همان استوری‌های کتابخانه را داخل Nuxt این اپ اجرا می‌کند تا CSS و `#build/ui` مصرف‌کننده دیده شود. پیشوند `U` را صفحهٔ `app/pages/index.vue` با `pnpm dev` نشان می‌دهد، نه استوری، چون استوری کامپوننت را مستقیم import می‌کند.
- `vite` را مستقیم روی `^8.2.0` بگذار، همان بازه‌ای که `@nuxt/vite-builder` این نسخهٔ Nuxt می‌خواهد. ریشهٔ مونوریپو Vite 7 دارد. اگر استوری‌بوک آن را بردارد، پلاگین `replace` با خطای `Missing field moduleType` می‌میرد.

```bash
pnpm storybook:nuxt   # از ریشه؛ http://localhost:6006
```
