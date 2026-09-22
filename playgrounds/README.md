# playgrounds

دو مصرف‌کنندهٔ واقعی کتابخانه. این‌جا کامپوننت جدید ساخته نمی‌شود؛ فقط ثابت می‌شود که آداپتر آن را بدون import دستی نشان می‌دهد.

| پوشه | آداپتر | رنگ primary نمونه |
| --- | --- | --- |
| `nuxt/` | `modules: ['@achareh/ui']` | `blue` در `app.config.ts` |
| `vue/` | `ui()` در Vite + `app.use` | `violet` در `vite.config.ts` |

اگر رفتار در یکی درست و در دیگری غلط است، باگ آداپتر است نه کامپوننت. هر مثال UI را در هر دو بگذار.

`components.d.ts` و `auto-imports.d.ts` ساختهٔ پلاگین‌اند و gitignore شده‌اند.
