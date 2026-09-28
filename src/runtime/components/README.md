# src/runtime/components

هر فایل یک کامپوننت است. نمونهٔ کامل `Button.vue` است؛ `Input.vue` برای پوستهٔ فرم، `v-model` و چند slot؛ `App.vue` برای ریشه، `dir` و `ConfigProvider`.

## نقشهٔ فایل Vue

1. بلوک `<script lang="ts">` بدون `setup`: `import theme from '#build/ui/<kebab>'`، اینترفیس `XProps` و `XSlots`.
2. بلوک `<script setup>`: `useComponentProps('<key>', _props)`، `useAppConfig`، دو `computed` برای `tv` (پایین).
3. تمپلیت: `Primitive` از `reka-ui` برای `as`. هر گره `data-slot` برابر کلید slot تم.
4. تایپ‌ها را از `src/runtime/types/index.ts` دوباره export کن.

کلید `<key>` همان export در `src/theme/index.ts` است.

## قرارداد

- `color` / `variant` / `size` و بقیهٔ variantهای تم (`weight`, `paddingX`, `paddingY`, `radius`) را داخل `withDefaults` نگذار. پیش‌فرضشان در تم است تا `app.config.ui.<key>.defaultVariants` فرصت اعمال داشته باشد. `withDefaults` فقط برای چیزهایی مثل `type` و `dir` است.
- variant بولی (مثل `block` در `Button`) را در `withDefaults` با `undefined` بگذار. Vue prop بولیِ داده‌نشده را `false` می‌کند و `false` جلوی `defaultVariants` کانفیگ را می‌گیرد. استثنا: `disabled` و `readonly` در `Input` عمداً `false` می‌مانند چون `compoundVariants` تم روی `false` تطبیق می‌خورد.
- `tv` را در دو `computed` بساز: recipe فقط با تغییر `app.config` دوباره ساخته شود، کلاس‌ها با تغییر prop.

```ts
const recipe = computed(() => tv({
  extend: theme,
  ...(appConfig.ui?.button || {})
}))

const ui = computed(() => recipe.value({
  color: props.color,
  variant: props.variant,
  weight: props.weight
}))
```

- کلاس ریشه: `ui.<slot>({ class: [props.ui?.<slot>, props.class] })`. بقیهٔ slotها فقط `props.ui?.<slot>`. `props.ui` از `useComponentProps` می‌آید و `app.config.ui.<key>.slots` را هم دارد؛ همین است که slot کانفیگ روی کلاس variant برنده می‌شود.
- اگر `inheritAttrs: false` است، `data-slot` را قبل از `v-bind="$attrs"` بگذار تا `data-slot` مصرف‌کننده ببرد. `Button` این کار را می‌کند. listener داخلی که باید قبل از listener مصرف‌کننده اجرا شود را با `v-bind="mergeProps({ onClick }, $attrs)"` بده، نه `@click` جدا.
- `type` دکمه فقط وقتی عنصر رندرشده `button` است ست شود. `to` بدون `as` ریشه را `<a href>` می‌کند.
- حالت غیرفعال: روی `button` واقعی `disabled`. روی هر عنصر دیگر `aria-disabled="true"`، `tabindex="-1"`، بدون `href`، و کلیک با `preventDefault` و `stopImmediatePropagation` خنثی می‌شود. در هر دو حالت `data-disabled` روی ریشه می‌نشیند و تم با `data-disabled:` استایل می‌دهد.
- `loading` یعنی `aria-busy="true"`.
- `Input` مقدار را با `defineModel` نگه می‌دارد، پس بدون `v-model` هم کار می‌کند. تبدیل رقم فارسی/عربی به انگلیسی فقط با `numeric` است و جای کرسر حفظ می‌شود. `state="error"` یعنی `aria-invalid="true"`؛ `aria-invalid` مصرف‌کننده از `$attrs` برنده است.
- جهت `Input`: prop `direction`، بعد `dir` از `ConfigProvider` (`UApp`)، بعد `rtl`.
- کلاس جدید این‌جا ننویس؛ به تم برود. استثنا: هیچ. حتی یک utility.
- جهت منطقی و رنگ معنایی، همان قرارداد `src/theme/README.md`.

پیشوند `U` را به نام فایل اضافه نکن. Nuxt با `prefix` و Vite با resolver آن را می‌چسبانند.

استوری کنار همان SFC است: `<Pascal>.stories.ts`. ماژول Nuxt این فایل‌ها را ثبت نمی‌کند و بیلد آن‌ها را به `.stories.js` در `dist` می‌برد. عنوان `Components/<Pascal>` است. variantها را در `args` نده تا `defaultVariants` کانفیگ دیده شود؛ پیش‌فرض را در `argTypes.<prop>.table.defaultValue` بنویس. ماتریس variant مثل استوری‌های آچاره کالا است؛ اسلات آیکون دکمه `leading` و `trailing` است. قرارداد استوری‌بوک در [`.storybook/README.md`](../../../.storybook/README.md) است.
