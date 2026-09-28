# .storybook

استوری‌بوک کامپوننت‌های `src/runtime/components`. الگو از استوری‌های آچاره کالا است: همان ماتریس variant و کنترل‌ها، با نام کامپوننت‌های همین ریپو.

این ریپو اپ Nuxt نیست، پس فریم‌ورک `@storybook/vue3-vite` است نه `@storybook-vue/nuxt`. `viteFinal` خروجی `ui()` از `@achareh/ui/vite` را به پلاگین‌های Vite استوری‌بوک اضافه می‌کند تا `#build/ui/*`، `#imports` و Tailwind مثل playground Vue حل شوند. فریم‌ورک Vue 3 در Storybook 10 پلاگین Vue را خودش ثبت نمی‌کند، پس `viteFinal` اول `vue()` و بعد `ui()` را می‌گذارد. قبل از اجرا `pnpm dev:prepare` لازم است تا همان export ساخته شود. `main.ts` سورس `src/vite.ts` را مستقیم import نمی‌کند؛ ارزیاب استوری‌بوک import بدون پسوند را مثل ESM نود رد می‌کند.

## فایل‌ها

| فایل | کار |
| --- | --- |
| `main.ts` | glob استوری‌ها، addonهای docs و themes و pseudo-states، و `ui({ dts: false })`. استوری‌بوک `components.d.ts` و `auto-imports.d.ts` ریشه را بازنویسی نمی‌کند |
| `preview.ts` | کلاس `light` / `dark` روی `html`، و پیچیدن هر استوری در `App` با `dir="rtl"` (همان پیش‌فرض `App`؛ `App` آن را روی ریشهٔ DOM و `ConfigProvider` می‌گذارد) |
| `preview.css` | `@import "tailwindcss"` و CSS ران‌تایم. `html` و `body` چپ‌به‌راست می‌مانند تا خود استوری‌بوک نچرخد. فقط قاب `App` راست‌به‌چپ است |
| [`src/runtime/storybook/StoryIcon.vue`](../src/runtime/storybook/README.md) | SVG اینلاین استوری‌ها. کنار runtime می‌ماند تا از داخل پکیج هم import شود |

استوری هر کامپوننت کنار خود SFC است: `Button.stories.ts` و `Input.stories.ts`. عنوان‌ها `Components/Button` و `Components/Input` هستند. اسلات آیکون دکمه `leading` و `trailing` است. variantها در `args` نیستند تا `defaultVariants` کانفیگ دیده شود؛ پیش‌فرض تم در جدول کنترل از `table.defaultValue` می‌آید. قاب استوری راست‌به‌چپ است. متن نمونه فارسی است. نام و مقدار prop، مثل `solid` و `primary`، انگلیسی می‌ماند. این پوشه استوری‌بوک خود لایبرری است و پیش‌فرض فیگما را نشان می‌دهد. نحوهٔ اجرای همین استوری‌ها در اپ مصرف‌کننده در [README](../README.md) بخش «استوری‌بوک» است.

حالت hover / pressed / focused در استوری `States` دکمه با `storybook-addon-pseudo-states` روی کلاس‌های `is-hover` و `is-pressed` و `is-focused` ثابت می‌شود، چون این کامپوننت متغیر CSS جدا برای آن حالت‌ها ندارد.

```bash
pnpm storybook         # http://localhost:6006
pnpm storybook:build   # خروجی در .storybook/dist
```
