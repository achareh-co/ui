# src/theme

دادهٔ ظاهر. این پوشه Vue، DOM و side effect ندارد. `templates.ts` هر export این‌جا را به `#build/ui/<kebab>.ts` تبدیل می‌کند و Tailwind همان خروجی را اسکن می‌کند.

## فایل‌ها

| فایل | الگو |
| --- | --- |
| `index.ts` | فقط re-export. کلید export = نام در `useComponentProps` و `app.config.ui`. |
| `button.ts` | تم تابعی: به `options.theme.colors` و `transitions` وابسته است. |
| `card.ts`, `app.ts` | آبجکت ثابت: فقط `slots`. |

## نقشهٔ تم جدید

1. فایل را kebab-case بگذار: کلید `fieldGroup` → `field-group.ts`.
2. از `index.ts` با همان کلید export کن.
3. `slots` را با کلاس پایه پر کن. هر کلید slot باید در Vue یک `data-slot` همنام داشته باشد.
4. اگر variant داری، `variants` و `defaultVariants` را همین‌جا بگذار، نه در `withDefaults`.
5. رنگ semantic را برای هر رنگ `options.theme.colors` در `compoundVariants` با رشتهٔ کامل بنویس، مثل `button.ts`.
6. فیلد همان کلید را به `AppConfigUI` در `src/templates.ts` اضافه کن.

## قرارداد

- کلاس معنایی: `text-default`, `text-muted`, `text-highlighted`, `bg-default`, `bg-elevated`, `bg-accented`, `bg-inverted`, `ring-default`, `divide-default`.
- فاصله کلید فیگما است، نه شبکهٔ ۴px تیلویند. `p-8` و `gap-8` برابر ۱۶px هستند (`spacing/8`). `p-4` برابر ۸px است. پله‌های کسری (`1.5`, `2.5`) وجود ندارند.
- شعاع و ضخامت border کلید فیگما است. `rounded-sm` برابر ۸px است (`radius/sm`). `rounded-md` برابر ۱۲px و `rounded-lg` برابر ۱۶px است. `border-xs` برابر ۱px است؛ `border-sm` برابر ۲px، `border-md` برابر ۴px، `border-lg` برابر ۸px.
- نقش تایپوگرافی فیگما با پیشوند `typo-` است. `typo-label-large` اندازه، خط، وزن، فاصلهٔ حروف و خانواده را با هم می‌گذارد. تک‌خاصیت: `typo-size-label-large`، `typo-leading-label-large`، `typo-weight-label-large`، `typo-tracking-label-large` و `typo-family-brand`. مقیاس `text-sm` و `font-medium` تیلویند جدا می‌ماند.
- رنگ کامپوننت: پله با خط تیره است (`bg-primary-50`). در فیگما `0` تیره‌ترین است و `100` روشن‌ترین؛ `primary-50` وسط رمپ است، نه tint روشن Tailwind. شفافیت همان پله با اسلش است (`bg-primary-50/high` = ۸۸٪). نقش semantic پله ندارد و کلاس معتبر است (`hover:bg-on-primary`). `bg-primary` بدون شماره نقش جامد است و با `bg-primary-50` یکی نیست. نام پالت Tailwind (`red-100`, `blue`, `slate`) این‌جا ممنوع است.
- جهت منطقی: `ms`/`me`, `ps`/`pe`, `text-start`/`text-end`, `border-s`/`border-e`, `rounded-s`/`rounded-e`. از `ml`/`mr` و `left`/`right` استفاده نکن.
- `transition-colors` را با `options.theme.transitions` شرط کن، مثل `button.ts`.
- تابع تم `options` می‌گیرد و آبجکت برمی‌گرداند. `resolveTheme` در `src/utils/theme.ts` بعداً پیش‌فرض variant، حالت `unstyled` و prefix را اعمال می‌کند؛ آن منطق را این‌جا تکرار نکن.

```ts
// رنگ را این‌طور ننویس؛ Tailwind داخل .vue آن را نمی‌بیند
`bg-${color}`

// این رشته بعد از generate در #build/ui می‌نشیند و دیده می‌شود
class: `bg-${color} text-on-${color} hover:bg-${color}/90`
```
