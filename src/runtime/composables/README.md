# src/runtime/composables

ادغام prop کامپوننت با کانفیگ اپ. الان یک تابع است: `useComponentProps`.

## فایل‌ها

| فایل | کار |
| --- | --- |
| `useComponentProps.ts` | پراکسی prop. |
| `index.ts` | export عمومی. مسیر پکیج `./composables`. |

## رفتار پراکسی

`useComponentProps(name, props)` این‌ها را عوض می‌کند:

- `ui`: `defu(props.ui, appConfig.ui[name].slots)` — آبجکت نمونه برنده است.
- هر کلید دیگر: اگر روی props مقدار `undefined` نباشد همان برمی‌گردد؛ وگرنه `appConfig.ui[name].defaultVariants[key]`.
- `theme.defaultVariants` را این پراکسی نمی‌خواند. آن فقط ورودی `tv()` است.

## نقشهٔ composable جدید

1. اگر به تم یا DOM مربوط است، این‌جا نیاید؛ تم در `src/theme`، مارک‌آپ در `components`.
2. اگر فقط Nuxt است، پلاگین در `runtime/plugins` بماند.
3. تابع را از `index.ts` export کن.
4. auto-import را در هر دو آداپتر ثبت کن: `addImports` در `module.ts` و آرایهٔ `imports` در `createViteIntegrations`.
5. نام `useComponentProps` را عوض نکن؛ playground و مصرف‌کننده روی همین اسم‌اند.

`useAppConfig` از `#imports` می‌آید. پیاده‌سازی واقعی‌اش بسته به محیط در shim، stub ویو، یا mock تست است.
