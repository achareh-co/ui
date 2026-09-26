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

رنگ‌های semantic را در `app.config.ts` عوض کنید:

```ts
export default defineAppConfig({
  ui: {
    colors: { primary: 'blue', neutral: 'zinc' },
    button: { defaultVariants: { size: 'sm' } }
  }
})
```

## نصب در Vue + Vite

```ts
import vue from '@vitejs/plugin-vue'
import ui from '@achareh/ui/vite'

export default {
  // `ui()` must come after `vue()` so component resolvers see compiled SFCs.
  plugins: [vue(), ui({ ui: { colors: { primary: 'violet' } } })]
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

## کامپوننت جدید

1. تم را در `src/theme/<name>.ts` بنویسید و از `src/theme/index.ts` export کنید.
2. کامپوننت را در `src/runtime/components` بسازید و تم را از `#build/ui/<name>` بگیرید.
3. `useComponentProps('<name>', props)` و `tv({ extend: theme })` را همان الگوی `Button` استفاده کنید.
4. روی هر عنصر `data-slot` بگذارید. به‌جای `ml`/`mr` از `ms`/`me` استفاده کنید.
5. تست را در `test/components` اضافه کنید.

کلاس‌های رنگی را به‌صورت رشته کامل داخل تم تولیدشده بگذارید (`bg-primary`)، نه `` `bg-${color}` `` داخل فایل Vue. Tailwind فقط رشته‌ای را می‌بیند که در فایل اسکن‌شده وجود دارد؛ `templates.ts` همین کار را موقع بیلد انجام می‌دهد.

## عمداً در این اسکلت نیست

فرم، `UTheme`، i18n، آیکون، docs، CLI و tree-shaking آزمایشی CSS. `tailwind-variants` روی `3.2.2` پین شده چون نسخه‌های بعدی کندتر بوده‌اند.
