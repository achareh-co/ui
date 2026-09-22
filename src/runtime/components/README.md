# src/runtime/components

هر فایل یک کامپوننت است. نمونهٔ کامل `Button.vue` است؛ `Card.vue` برای slotهای تودرتو؛ `App.vue` برای ریشه و `ConfigProvider`.

## نقشهٔ فایل Vue

1. بلوک `<script lang="ts">` بدون `setup`: `import theme from '#build/ui/<kebab>'`، اینترفیس `XProps` و `XSlots`.
2. بلوک `<script setup>`: `useComponentProps('<key>', _props)`، `useAppConfig`، `computed(() => tv(...))`.
3. تمپلیت: `Primitive` از `reka-ui` برای `as`. هر گره `data-slot` برابر کلید slot تم.
4. تایپ‌ها را از `src/runtime/types/index.ts` دوباره export کن.

کلید `<key>` همان export در `src/theme/index.ts` است.

## قرارداد

- `color` / `variant` / `size` را داخل `withDefaults` نگذار. پیش‌فرضشان در تم است تا `app.config.ui.<key>.defaultVariants` فرصت اعمال داشته باشد. `withDefaults` فقط برای چیزهایی مثل `type` و `dir` است.
- `tv` را داخل `computed` بساز:

```ts
const ui = computed(() => tv({
  extend: theme,
  ...(appConfig.ui?.button || {})
})({
  color: props.color,
  variant: props.variant,
  size: props.size
}))
```

- کلاس ریشه: `ui.<slot>({ class: [props.ui?.<slot>, props.class] })`. بقیهٔ slotها فقط `props.ui?.<slot>`.
- اگر `inheritAttrs: false` است، `data-slot` را قبل از `v-bind="$attrs"` بگذار تا `data-slot` مصرف‌کننده ببرد. `Button` این کار را می‌کند.
- `type` دکمه فقط وقتی `as` خالی است ست شود.
- کلاس جدید این‌جا ننویس؛ به تم برود. استثنا: هیچ. حتی یک utility.
- جهت منطقی و رنگ معنایی، همان قرارداد `src/theme/README.md`.

پیشوند `U` را به نام فایل اضافه نکن. Nuxt با `prefix` و Vite با resolver آن را می‌چسبانند.
