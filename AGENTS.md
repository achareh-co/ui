# AGENTS.md

راهنمای کار روی `@achareh/ui`. مخاطب هم انسان است هم ایجنت. جزئیات هر پوشه در `README.md` همان پوشه است؛ این فایل فقط نقشهٔ کل و ترتیب کار است.

الگو از [Nuxt UI `AGENTS.md`](https://github.com/nuxt/ui/blob/v4/AGENTS.md) است، با این تفاوت که فرم، `UTheme`، i18n، آیکون، سایت docs و CLI عمداً این‌جا نیستند. استوری‌بوک در [`.storybook`](.storybook/README.md) است.

## قبل از دست زدن به کد

1. `README.md` پوشه‌ای که فایل در آن است را بخوان.
2. اگر قرارداد آن پوشه عوض شد، همان `README.md` را در همان تغییر به‌روز کن.
3. تغییر بیلد (تمپلیت، alias، auto-import، ثبت کامپوننت) را در **هر دو** آداپتر چک کن: `src/module.ts` و `src/unplugin.ts` / `src/vite.ts`.
4. رفتار خودِ Nuxt، Vue، Reka، Vite، Vitest یا Tailwind را از اسکیل `.agents/skills/` و ایندکس [`docs/llms/`](docs/llms/README.md) بخوان. این‌ها مرجع بالادست‌اند. اگر با قرارداد همین ریپو فرق داشتند، همین فایل و README پوشه برنده است. اسکیل `nuxt-ui` الگوی بالادست است، نه وابستگی‌ای که باید import شود.

## سه لایه

```
src/theme/          دادهٔ ظاهر (slots, variants, compoundVariants)
src/runtime/        رفتار Vue؛ تم را از #build/ui/* می‌گیرد، نه از src/theme
src/module.ts       آداپتر Nuxt
src/unplugin.ts     آداپتر Vue؛ تمپلیت و alias
src/vite.ts         آرایهٔ پلاگین Vite (باید کنار vue() در config مصرف‌کننده بنشیند)
src/templates.ts    src/theme را به فایل‌های اسکن‌شدنی Tailwind تبدیل می‌کند
```

`src/utils/` فقط زمان بیلد است. `src/runtime/utils/` داخل کامپوننت اجرا می‌شود. این دو را قاطی نکن.

## اولویت استایل

برای propهای variant (`color`, `variant`, `size`):

1. prop صریح
2. `withDefaults` (اگر این‌جا مقدار بدهی، `app.config` دیگر نمی‌تواند آن را عوض کند)
3. `app.config.ui.<name>.defaultVariants`
4. `theme.defaultVariants` که فقط `tv()` می‌خواند

`class` و `ui` با `tailwind-merge` روی کلاس تم می‌نشینند. `ui` نمونه با `defu` روی `app.config.ui.<name>.slots` برنده است.

## کامپوننت جدید

کلید تم (مثلاً `button`) را در همهٔ این‌ها یکسان نگه دار. فایل تم kebab-case همان کلید است، فایل Vue پاسکال‌کیس.

- [ ] `src/theme/<kebab>.ts` و export در `src/theme/index.ts`
- [ ] `src/runtime/components/<Pascal>.vue` با import از `#build/ui/<kebab>`
- [ ] re-export تایپ‌ها در `src/runtime/types/index.ts`
- [ ] فیلد `AppConfigUI` در `src/templates.ts` (`appConfigTypes`)
- [ ] `test/components/<Pascal>.spec.ts`
- [ ] `src/runtime/components/<Pascal>.stories.ts`
- [ ] یک مثال در `playgrounds/nuxt` و `playgrounds/vue`
- [ ] `pnpm test` و `pnpm typecheck`

`pnpm dev:prepare` باید قبل از تست خورده باشد تا `.nuxt/ui/*` ساخته شود.

## دستورها

```bash
pnpm dev:prepare   # stub ماژول + تولید #build
pnpm dev           # playground Nuxt
pnpm dev:vue       # playground Vue
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm storybook      # http://localhost:6006
```

## نقشهٔ پوشه‌ها

| پوشه | قرارداد |
| --- | --- |
| [`src`](src/README.md) | مرز لایه‌ها و دو آداپتر |
| [`src/theme`](src/theme/README.md) | فایل تم |
| [`src/utils`](src/utils/README.md) | پیش‌فرض‌ها و resolve تم، فقط بیلد |
| [`src/runtime`](src/runtime/README.md) | چه چیزی runtime است |
| [`src/runtime/components`](src/runtime/components/README.md) | الگوی Vue |
| [`src/runtime/composables`](src/runtime/composables/README.md) | `useComponentProps` |
| [`src/runtime/utils`](src/runtime/utils/README.md) | `tv` |
| [`src/runtime/types`](src/runtime/types/README.md) | تایپ عمومی تم و re-export |
| [`src/runtime/plugins`](src/runtime/plugins/README.md) | پلاگین Nuxt؛ رنگ این‌جا تزریق نمی‌شود |
| [`src/runtime/vue`](src/runtime/vue/README.md) | پلاگین Vue |
| [`src/runtime/vue/stubs`](src/runtime/vue/stubs/README.md) | جعل `#imports` برای Vue |
| [`src/shims`](src/shims/README.md) | جعل تایپ‌چک، بدون رفتار |
| [`.storybook`](.storybook/README.md) | استوری‌بوک Vue + `ui()` |
| [`playgrounds`](playgrounds/README.md) | تفاوت دو مصرف‌کننده |
| [`playgrounds/nuxt`](playgrounds/nuxt/README.md) | ماژول |
| [`playgrounds/vue`](playgrounds/vue/README.md) | `ui()` بعد از `vue()` |
| [`test`](test/README.md) | aliasهای ویتست |
| [`test/components`](test/components/README.md) | snapshot و axe |
| [`test/mocks`](test/mocks/README.md) | `appConfig` تست |

## قفل‌های شناخته‌شده

- `tailwind-variants` روی `3.2.2` در `pnpm-workspace.yaml` پین است.
- Vite 7 پلاگینی که از `config()` برگردد را دور می‌ریزد. `createViteIntegrations` باید از `src/vite.ts` به‌صورت آرایهٔ سطح بالا برگردد و resolver کامپوننت `enforce: 'post'` بماند.
- از `src/module.ts` تایپ runtime را export نکن؛ unbuild با مسیر دارای فاصله آن را می‌شکند.
- `import.meta.url` برای پیدا کردن مسیر فقط در `src/module.ts` و `resolveRuntimeDir` مجاز است.
