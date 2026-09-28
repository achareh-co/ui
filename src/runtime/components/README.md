# src/runtime/components

هر فایل یک کامپوننت است. نمونهٔ کامل `Button.vue` است؛ `Input.vue` برای پوستهٔ فرم و چند slot؛ `App.vue` برای ریشه و `ConfigProvider`.

## نقشهٔ فایل Vue

1. بلوک `<script lang="ts">` بدون `setup`: `import theme from '#build/ui/<kebab>'`، اینترفیس `XProps` و `XSlots`.
2. بلوک `<script setup>`: `useComponentProps('<key>', _props)`، `useAppConfig`، `computed(() => tv(...))`.
3. تمپلیت: `Primitive` از `reka-ui` برای `as`. هر گره `data-slot` برابر کلید slot تم.
4. تایپ‌ها را از `src/runtime/types/index.ts` دوباره export کن.

کلید `<key>` همان export در `src/theme/index.ts` است.

## قرارداد

- `color` / `variant` / `size` و بقیهٔ variantهای تم (`weight`, `paddingX`, `paddingY`, `radius`) را داخل `withDefaults` نگذار. پیش‌فرضشان در تم است تا `app.config.ui.<key>.defaultVariants` فرصت اعمال داشته باشد. `withDefaults` فقط برای چیزهایی مثل `type` و `dir` است.
- `tv` را داخل `computed` بساز:

```ts
const ui = computed(() => tv({
  extend: theme,
  ...(appConfig.ui?.button || {})
})({
  color: props.color,
  variant: props.variant,
  weight: props.weight
}))
```

- کلاس ریشه: `ui.<slot>({ class: [props.ui?.<slot>, props.class] })`. بقیهٔ slotها فقط `props.ui?.<slot>`.
- اگر `inheritAttrs: false` است، `data-slot` را قبل از `v-bind="$attrs"` بگذار تا `data-slot` مصرف‌کننده ببرد. `Button` این کار را می‌کند.
- `type` دکمه فقط وقتی عنصر رندرشده `button` است ست شود. `to` بدون `as` ریشه را `<a href>` می‌کند.
- کلاس جدید این‌جا ننویس؛ به تم برود. استثنا: هیچ. حتی یک utility.
- جهت منطقی و رنگ معنایی، همان قرارداد `src/theme/README.md`.

پیشوند `U` را به نام فایل اضافه نکن. Nuxt با `prefix` و Vite با resolver آن را می‌چسبانند.

استوری کنار همان SFC است: `<Pascal>.stories.ts`. عنوان `Components/<Pascal>` است. ماتریس variant مثل استوری‌های آچاره کالا است؛ اسلات آیکون دکمه `leading` و `trailing` است. قرارداد استوری‌بوک در [`.storybook/README.md`](../../../.storybook/README.md) است.
