# playgrounds/nuxt

اپ Nuxt 4 که ماژول را از ورک‌اسپیس می‌گیرد. دستور از ریشه: `pnpm dev`.

## فایل‌ها

| فایل | کار |
| --- | --- |
| `nuxt.config.ts` | `modules: ['@achareh/ui']` و CSS اپ. |
| `app/app.config.ts` | `ui.colors` و در صورت نیاز `defaultVariants`. |
| `app/app.vue` | پوستهٔ Nuxt. |
| `app/pages/index.vue` | نمونهٔ `UButton` / `UCard` و کلاس `dark` روی `documentElement`. |
| `app/assets/css/main.css` | `@import "tailwindcss"` سپس `@import "@achareh/ui"`. کامنت `--ui-spacing-*`، `--ui-radius-*` و `--ui-border-width-*` نمونهٔ اورراید است. |

## قرارداد

- کامپوننت را دستی import نکن. پیشوند `U` را ماژول می‌چسباند.
- تغییر آپشن ماژول این‌جا یعنی همان را در `playgrounds/vue/vite.config.ts` هم معنی کن، مگر تفاوت عمدی دو آداپتر باشد.
- `UApp` در صفحهٔ فعلی نیست؛ `isolate` را خود ماژول روی `rootAttrs` می‌گذارد. اگر مثال به `dir` یا `ConfigProvider` نیاز دارد، آن را با `UApp` بپیچ.
- تم یا SFC کتابخانه را این‌جا کپی نکن.
