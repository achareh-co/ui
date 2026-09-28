# test/components

یک spec برای هر کامپوننت. `Button.spec.ts` الگوست. `App.spec.ts` جهت پیش‌فرض `rtl`، prop `dir` و ارث‌بری جهت در `Input` را قفل می‌کند؛ چون `ConfigProvider` عنصری رندر نمی‌کند، روی `[data-slot="root"]` assert کن، نه `wrapper.attributes()`.

## هر spec این‌ها را دارد

1. رندر پیش‌فرض و `toMatchSnapshot()`.
2. variantهایی که کلاسشان فرق می‌کند (`color`, `variant`, `weight`, `padding`, `radius`).
3. `ui` هر slot: کلاس اضافه‌شده روی `[data-slot="<slot>"]` باشد.
4. slotهای Vue که گره را اضافه یا حذف می‌کنند.
5. `axe` با `toHaveNoViolations`. اینپوت را با `aria-label` صدا بزن. اگر قطعه landmark نیست، قانون `region` را فقط همان تست خاموش کن.
6. اگر `defaultVariants` یا `slots` از `app.config` خوانده می‌شود، روی `appConfig` بنویس و در پایان همان تست پاک کن تا spec بعدی نشت نگیرد.
7. رفتار دسترس‌پذیری که axe نمی‌بیند را صریح assert کن: `aria-disabled` و `tabindex` لینک غیرفعال، `aria-busy`، `aria-invalid`.

کامپوننت را با نام فایل mount کن (`Button.vue`)، نه با پیشوند `U`. پیشوند فقط کار آداپتر است.

کلاس را با رشتهٔ معنایی assert کن (`bg-primary`, `text-error`)، نه با رنگ پالت.
