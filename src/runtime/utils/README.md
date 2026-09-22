# src/runtime/utils

کمک‌تابع‌هایی که موقع رندر اجرا می‌شوند. با `src/utils` (بیلد) اشتباه نشود.

## فایل‌ها

| فایل | کار |
| --- | --- |
| `tv.ts` | `createTV({ twMerge: true })`. wrapper کلید slot را بعد از spread شدن `app.config` حفظ می‌کند، چون `tailwind-variants` آن‌ها را پاک می‌کند. |
| `colors.ts` | `generateColorCss`: از نقشهٔ `ui.colors` متغیر `--ui-color-<semantic>-<shade>` و `--ui-<semantic>` می‌سازد. روشن = shade 500، تیره = 400. پالت `neutral` به `--color-old-neutral-*` وصل است. |

## قرارداد

- نسخهٔ `tailwind-variants` را بالا نبر. پین `3.2.2` در `pnpm-workspace.yaml` است.
- امضای `tv()` را طوری نگه دار که `ui.<slot>({ class })` رشته برگرداند. کامپوننت‌ها روی همین شکل‌اند.
- منطق رنگ را در پلاگین Nuxt یا stub ویو کپی نکن. هر دو `generateColorCss` را صدا می‌زنند.
- این پوشه کلاس کامپوننت نمی‌سازد و تم را import نمی‌کند.
