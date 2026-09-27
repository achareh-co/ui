# Achareh UI

اسکلت یک کتابخانه Vue UI با معماری [Nuxt UI](https://github.com/nuxt/ui): تم جدا از کامپوننت، دو آداپتر Nuxt و Vite، و خروجی npm. Vue-only است و React را پوشش نمی‌دهد.

## چیدمان

```
src/theme/          ظاهر هر کامپوننت (slots, variants, compoundVariants)
src/runtime/        کامپوننت، composable و توکن‌های CSS
src/module.ts       آداپتر Nuxt
src/unplugin.ts     آداپتر Vue / Vite
src/templates.ts    تولید #build/ui/* تا کلاس‌های Tailwind در بیلد دیده شوند
playgrounds/nuxt    مصرف به‌صورت ماژول
playgrounds/vue     مصرف به‌صورت پلاگین Vite
```

نقشهٔ کار هر پوشه در `README.md` همان پوشه است. نقطهٔ ورود ایجنت‌ها [`AGENTS.md`](AGENTS.md) است. داک ابزارها در [`.agents/skills/`](.agents/skills) و ایندکس [`docs/llms/`](docs/llms/README.md) است.

اولویت استایل: `prop` صریح، بعد `app.config.ui`، بعد `defaultVariants` داخل تم. `class` و `ui` با `tailwind-merge` روی کلاس‌های تم می‌نشینند.

## توسعه

```bash
pnpm install
pnpm dev:prepare
pnpm dev        # playground Nuxt
pnpm dev:vue    # playground Vue
pnpm test
pnpm build
```

## نصب در Nuxt

```bash
pnpm add @achareh/ui tailwindcss
```

```ts
export default defineNuxtConfig({
  modules: ['@achareh/ui'],
  css: ['~/assets/css/main.css']
})
```

```css
@import "tailwindcss";
@import "@achareh/ui";
```

```vue
<template>
  <UApp>
    <UButton label="Save" />
  </UApp>
</template>
```

## نصب در Vue + Vite

```ts
import vue from '@vitejs/plugin-vue'
import ui from '@achareh/ui/vite'

export default {
  // `ui()` must come after `vue()` so component resolvers see compiled SFCs.
  plugins: [vue(), ui()]
}
```

```ts
import ui from '@achareh/ui/vue-plugin'

app.use(ui)
```

```css
@import "tailwindcss";
@import "@achareh/ui";
```

برای autocomplete تم در `tsconfig`، بعد از اولین اجرا این alias را اضافه کنید:

```json
{
  "compilerOptions": {
    "paths": {
      "#build/ui/*": ["./node_modules/.nuxt-ui/ui/*"]
    }
  }
}
```

پلاگین Vite فایل‌های `components.d.ts` و `auto-imports.d.ts` را می‌سازد. آن‌ها را gitignore کنید و به `include` تایپ‌اسکریپت اضافه کنید.

## رنگ

مبنای سیستم رنگ در این پروژه، سیستم رنگ شخصی‌سازی‌شده مطابق با خروجی فیگمای پروژهٔ شماست. پالت آمادهٔ Tailwind، مثل قرمز و آبی پیش‌فرض، این‌جا رنگی نمی‌سازد.

شمارهٔ هر رنگ همان شماره‌ای است که در فیگما می‌بینید. صفر تیره‌ترین است و صد روشن‌ترین. مثلاً `primary` با شمارهٔ ۰ سیاه است (`#000000`)، با شمارهٔ ۱۰۰ سفید (`#FFFFFF`) و با شمارهٔ ۵۰ رنگ میانی (`#00DBBF`). در عادت Tailwind شمارهٔ ۵۰ روشن‌ترین است؛ این‌جا آن معنا را ندارد.

رنگ را به سه شکل می‌نویسید:

- رنگ کامل یک پله، با خط تیره: `bg-primary-50`. برای متن، حاشیه و حلقه هم همین است: `text-primary-50`، `border-primary-50`، `ring-primary-50`.
- همان رنگ با پوشش کمتر، با اسلش: `bg-primary-50/high`. `high` یعنی ۸۸٪ همان رنگ دیده شود. اگر درصد را خودتان بدهید، مثل `bg-primary-50/50`، همان درصد اعمال می‌شود.
- رنگ روی دکمه و سطح‌ها شماره ندارند: `hover:bg-on-primary` و `hover:bg-on-primary/high`. `bg-primary` بدون شماره خودِ رنگ اصلی است. در حالت روشن همان پلهٔ ۴۰ است، نه پلهٔ ۵۰.

برای هماهنگ کردن رنگ‌ها با فیگمای پروژه‌تان، بعد از `@import "@achareh/ui"` در فایل CSS بنویسید. در Nuxt این فایل `app/assets/css/main.css` است و در Vue `src/assets/main.css`.

```css
@import "tailwindcss";
@import "@achareh/ui";

@theme {
  --color-primary-40: #0055ff;
  --color-primary-80: #99bbff;
  --color-primary-100: #ffffff;
  --color-primary-20: #003322;
}
```

دکمه و کلاس‌هایی که در صفحه می‌نویسید هر دو همین رنگ‌ها را می‌گیرند. در حالت روشن پس‌زمینهٔ دکمه پلهٔ ۴۰ است و نوشتهٔ روی آن پلهٔ ۱۰۰. در حالت تیره پس‌زمینه پلهٔ ۸۰ است و نوشته پلهٔ ۲۰. اگر این چهار خط را ننویسید، پس‌زمینهٔ روشن `#00BFA5` می‌ماند. پله‌ای را که این‌جا عوض کنید، رنگ قبلی‌اش در فایل نهایی CSS کنار گذاشته می‌شود.

`secondary`، `tertiary`، `error`، `success`، `warning` و `info` هم با همین شماره‌ها کار می‌کنند: ۴۰ و ۱۰۰ در روشن، ۸۰ و ۲۰ در تیره. پس‌زمینهٔ صفحه از `neutral` می‌آید، ۹۸ در روشن و ۶ در تیره. هر شماره‌ای را که ننویسید، همان رنگی می‌ماند که از فیگما آمده.

این رنگ‌ها از `app.config` عوض نمی‌شوند. اگر بخواهید پوشش `high` به‌جای ۸۸٪ مقدار دیگری باشد:

```css
:root {
  --ui-emphasis-high: 80%;
}
```

## فاصله (spacing)

کلید کلاس همان پلهٔ فیگما است. `p-4`، `gap-4` و `w-4` پیش‌فرض ۸px هستند. شبکهٔ ۴px تیلویند این‌جا نیست: `p-8` برابر ۱۶px است. کلیدها از `0` تا `53` به‌علاوهٔ `px` (۱px) هستند.

برای عوض کردن یک یا چند پله، بعد از `@import "@achareh/ui"` در CSS اپ بنویسید. Nuxt: `app/assets/css/main.css`. Vue: `src/assets/main.css`.

```css
@import "tailwindcss";
@import "@achareh/ui";

:root {
  --ui-spacing-4: 10px;
}
```

`--ui-spacing-4: 10px` یعنی `p-4`، `gap-4` و `w-4` هر سه ۱۰px می‌شوند. همان متغیر روی margin، height، `size-*` و `space-*` هم اعمال می‌شود. پله‌ای که ننویسید روی پیش‌فرض می‌ماند. واحد px است.

`app.config.ui` و `ui({ ui })` این مقیاس را نمی‌گیرند. `@theme { --spacing-4: ... }` هم پل را عوض نمی‌کند، چون یوتیلیتی مستقیم به `--ui-spacing-*` وصل است.

## شعاع و ضخامت border

نام کلاس همان توکن فیگما است. `rounded-sm` برابر ۸px است، نه ۴px پیش‌فرض Tailwind. `rounded-xs` برابر ۴px، `rounded-md` برابر ۱۲px، `rounded-lg` برابر ۱۶px و `rounded-full` برابر ۹۹۹px است.

ضخامت: `border-xs` برابر ۱px، `border-sm` برابر ۲px، `border-md` برابر ۴px، `border-lg` برابر ۸px و `border-none` برابر ۰ است. کلاس `border` همان ۱px (`border-xs`) است. کلاس‌های عددی Tailwind به همان پله‌ها وصل‌اند: `border-0` برابر none، `border-2` برابر sm، `border-4` برابر md و `border-8` برابر lg.

`--ui-radius` دیگر مقیاس را عوض نمی‌کند. برای عوض کردن یک پله، بعد از `@import "@achareh/ui"` بنویسید:

```css
:root {
  --ui-radius-md: 10px;
  --ui-border-width-sm: 2px;
}
```

`--ui-radius-md: 10px` یعنی `rounded-md` ده پیکسل می‌شود. `--ui-border-width-xs` روی کلاس `border` هم اعمال می‌شود. پله‌ای که ننویسید روی پیش‌فرض فیگما می‌ماند. `app.config.ui` این مقیاس را نمی‌گیرد.

## تایپوگرافی

نقش‌های فیگما (حالت RTL-Fa) کلاس‌هایی با پیشوند `typo-` هستند. `typo-label-large` اندازه، ارتفاع خط، وزن، فاصلهٔ حروف و خانواده را با هم اعمال می‌کند. پیش‌فرض این نقش ۱۴px، خط ۲۰px، وزن ۵۰۰ و فاصلهٔ حروف ۰ است. خانوادهٔ مشترک `KalamehFaNum` است و اپ باید خود فونت را لود کند.

هر ویژگی کلاس جدا دارد و فقط همان ویژگی را عوض می‌کند:

- `typo-size-label-large` فقط اندازه
- `typo-leading-label-large` فقط ارتفاع خط
- `typo-weight-label-large` فقط وزن
- `typo-tracking-label-large` فقط فاصلهٔ حروف
- `typo-family-brand` فقط خانواده، برای همهٔ نقش‌ها

`text-sm` و `font-medium` مقیاس Tailwind می‌مانند و این نقش‌ها را عوض نمی‌کنند.

برای عوض کردن یک ویژگی، بعد از `@import "@achareh/ui"` در CSS اپ بنویسید. Nuxt: `app/assets/css/main.css`. Vue: `src/assets/main.css`.

```css
@import "tailwindcss";
@import "@achareh/ui";

:root {
  --ui-font-size-label-large: 18px;
  --ui-font-family-brand: KalamehFaNum, sans-serif;
}
```

`--ui-font-size-label-large: 18px` یعنی هم `typo-size-label-large` و هم `typo-label-large` هجده پیکسل می‌شوند. ارتفاع خط، وزن و فاصلهٔ حروف همان نقش سر جایشان می‌مانند. ویژگی‌ای که ننویسید روی پیش‌فرض فیگما می‌ماند. واحد اندازه، خط و فاصلهٔ حروف px است.

`app.config.ui` این مقیاس را نمی‌گیرد. اورراید از متغیر `--ui-font-size-*`، `--ui-leading-*`، `--ui-font-weight-*`، `--ui-tracking-*` و `--ui-font-family-brand` است، نه از کلاس `text-*` یا `font-*`.

## توکن‌های فیگما

خروجی فیگما در `figma/configs` است. این دستورها مقدارها را در کد کتابخانه می‌نویسند. اورراید مصرف‌کننده در CSS اپ است و این دستورها را لازم ندارد.

```bash
pnpm tokens:spacing
pnpm tokens:radius
pnpm tokens:border-width
pnpm tokens:typography
pnpm tokens:palette
pnpm tokens:emphasis
```

برای یک JSON دیگر، مسیر را بعد از `--` بده. آن اجرا فایل داخل `figma/configs` را عوض نمی‌کند.

## کامپوننت جدید

1. تم را در `src/theme/<name>.ts` بنویسید و از `src/theme/index.ts` export کنید.
2. کامپوننت را در `src/runtime/components` بسازید و تم را از `#build/ui/<name>` بگیرید.
3. `useComponentProps('<name>', props)` و `tv({ extend: theme })` را همان الگوی `Button` استفاده کنید.
4. روی هر عنصر `data-slot` بگذارید. به‌جای `ml`/`mr` از `ms`/`me` استفاده کنید.
5. تست را در `test/components` اضافه کنید.

کلاس‌های رنگی را به‌صورت رشته کامل داخل تم تولیدشده بگذارید (`bg-primary`)، نه `` `bg-${color}` `` داخل فایل Vue. Tailwind فقط رشته‌ای را می‌بیند که در فایل اسکن‌شده وجود دارد؛ `templates.ts` همین کار را موقع بیلد انجام می‌دهد.

## عمداً در این اسکلت نیست

فرم، `UTheme`، i18n، آیکون، docs، CLI و tree-shaking آزمایشی CSS. `tailwind-variants` روی `3.2.2` پین شده چون نسخه‌های بعدی کندتر بوده‌اند.
