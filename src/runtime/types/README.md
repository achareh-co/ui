# src/runtime/types

تایپ مشترک تم و درِ خروجی پراپ کامپوننت‌ها. منطق این‌جا نیست.

## فایل‌ها

| فایل | کار |
| --- | --- |
| `tv.ts` | `ThemeConfig`, `ComponentConfig<typeof theme>`, `SlotClasses`. |
| `index.ts` | `export type` از اینترفیس‌های داخل SFC (`ButtonProps`, `InputSlots`, …). |

## نقشه

- کامپوننت جدید: یک خط به `index.ts`. اینترفیس باید در بلوک `<script>` بدون `setup` باشد وگرنه export از فایل `.vue` دیده نمی‌شود.
- `SlotClasses` را برای پراپ `ui` استفاده کن تا کلیدها همان slotهای تم باشند.
- به `defaults.ts` یا `theme.ts` از این پوشه وابسته نشو؛ آن‌ها بیلد هستند.
- این تایپ‌ها را از `src/module.ts` export نکن. مصرف‌کننده از خود کامپوننت یا مسیر `runtime` تایپ می‌گیرد.
