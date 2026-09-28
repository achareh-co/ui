# src/runtime/utils

کمک‌تابع‌هایی که موقع رندر اجرا می‌شوند. با `src/utils` (بیلد) اشتباه نشود.

## فایل‌ها

| فایل | کار |
| --- | --- |
| `tv.ts` | `createTV({ twMerge: true })`. wrapper کلید slot را بعد از spread شدن `app.config` حفظ می‌کند، چون `tailwind-variants` آن‌ها را پاک می‌کند. پهنای `border-xs` تا `border-lg` را به tailwind-merge می‌شناساند تا با رنگ border قاطی نشود. |
| `digits.ts` | `toEnglishDigits`: رقم فارسی و عربی را انگلیسی می‌کند. |

## قرارداد

- نسخهٔ `tailwind-variants` را بالا نبر. پین `3.2.2` در `pnpm-workspace.yaml` است.
- امضای `tv()` را طوری نگه دار که `ui.<slot>({ class })` رشته برگرداند. کامپوننت‌ها روی همین شکل‌اند.
- این پوشه کلاس کامپوننت نمی‌سازد و تم را import نمی‌کند. رنگ پالت و semantic در `src/utils/colors.ts` است، نه این‌جا.
