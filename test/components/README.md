# test/components

یک spec برای هر کامپوننت. `Button.spec.ts` الگوست.

## هر spec این‌ها را دارد

1. رندر پیش‌فرض و `toMatchSnapshot()`.
2. variantهایی که کلاسشان فرق می‌کند (`color`, `variant`, `size`).
3. `ui` هر slot: کلاس اضافه‌شده روی `[data-slot="<slot>"]` باشد.
4. slotهای Vue که گره را اضافه یا حذف می‌کنند.
5. `axe` با `toHaveNoViolations`. برای قطعه‌ای که landmark نیست قانون `region` را فقط همان تست خاموش کن، مثل Card.
6. اگر `defaultVariants` از `app.config` خوانده می‌شود، روی `appConfig` بنویس و در پایان همان تست پاک کن تا spec بعدی نشت نگیرد.

کامپوننت را با نام فایل mount کن (`Button.vue`)، نه با پیشوند `U`. پیشوند فقط کار آداپتر است.

کلاس را با رشتهٔ معنایی assert کن (`bg-primary`, `text-error`)، نه با رنگ پالت.
