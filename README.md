# Acme UI

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
pnpm add @acme/ui tailwindcss
```

```ts
export default defineNuxtConfig({
  modules: ['@acme/ui'],
  css: ['~/assets/css/main.css']
})
```

```css
@import "tailwindcss";
@import "@acme/ui";
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
import ui from '@acme/ui/vite'

export default {
  // `ui()` must come after `vue()` so component resolvers see compiled SFCs.
  plugins: [vue(), ui({ ui: { colors: { primary: 'violet' } } })]
}
```

```ts
import ui from '@acme/ui/vue-plugin'

app.use(ui)
```

```css
@import "tailwindcss";
@import "@acme/ui";
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

## کامپوننت جدید

1. تم را در `src/theme/<name>.ts` بنویسید و از `src/theme/index.ts` export کنید.
2. کامپوننت را در `src/runtime/components` بسازید و تم را از `#build/ui/<name>` بگیرید.
3. `useComponentProps('<name>', props)` و `tv({ extend: theme })` را همان الگوی `Button` استفاده کنید.
4. روی هر عنصر `data-slot` بگذارید. به‌جای `ml`/`mr` از `ms`/`me` استفاده کنید.
5. تست را در `test/components` اضافه کنید.

کلاس‌های رنگی را به‌صورت رشته کامل داخل تم تولیدشده بگذارید (`bg-primary`)، نه `` `bg-${color}` `` داخل فایل Vue. Tailwind فقط رشته‌ای را می‌بیند که در فایل اسکن‌شده وجود دارد؛ `templates.ts` همین کار را موقع بیلد انجام می‌دهد.

## عمداً در این اسکلت نیست

فرم، `UTheme`، i18n، آیکون، docs، CLI و tree-shaking آزمایشی CSS. `tailwind-variants` روی `3.2.2` پین شده چون نسخه‌های بعدی کندتر بوده‌اند.
