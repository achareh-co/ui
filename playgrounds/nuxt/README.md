# playgrounds/nuxt

اپ Nuxt 4 که ماژول را از ورک‌اسپیس می‌گیرد. دستور از ریشه: `pnpm dev`.

## فایل‌ها

| فایل | کار |
| --- | --- |
| `nuxt.config.ts` | `modules: ['@achareh/ui']`، CSS اپ و `htmlAttrs` با `lang="fa"` و `dir="rtl"`. |
| `app/app.config.ts` | خالی؛ در صورت نیاز `ui.<name>.defaultVariants` یا `slots`. رنگ این‌جا نیست. |
| `app/app.vue` | `NuxtPage` داخل `UApp`. |
| `app/pages/index.vue` | نمونهٔ `UButton` / `UInput` و کلاس `dark` روی `documentElement`. |
| `app/assets/css/main.css` | `@import "tailwindcss"` سپس `@import "@achareh/ui"`. بلوک `@theme` پله‌های `primary` را با `#0055ff`، `#99bbff`، `#ffffff` و `#003322` عوض می‌کند. کامنت `--ui-spacing-*`، `--ui-radius-*`، `--ui-border-width-*`، `--ui-font-size-*` و `--ui-emphasis-*` نمونهٔ اورراید بقیه است. |

## قرارداد

- کامپوننت را دستی import نکن. پیشوند `U` را ماژول می‌چسباند.
- تغییر آپشن ماژول این‌جا یعنی همان را در `playgrounds/vue/vite.config.ts` هم معنی کن، مگر تفاوت عمدی دو آداپتر باشد.
- `UApp` در `app.vue` همهٔ صفحه‌ها را می‌پیچد و `dir="rtl"` و `ConfigProvider` را می‌دهد. `isolate` را جدا از آن خود ماژول روی `rootAttrs` می‌گذارد. مثالی که جهت دیگری لازم دارد `UApp dir="ltr"` تو در تو یا prop `direction` کامپوننت را نشان دهد.
- تم یا SFC کتابخانه را این‌جا کپی نکن.
