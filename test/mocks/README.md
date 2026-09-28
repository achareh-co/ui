# test/mocks

`#imports` داخل Vitest. `vitest.config.ts` فقط همین فایل را به آن alias می‌دهد.

## فایل‌ها

| فایل | کار |
| --- | --- |
| `imports.ts` | `appConfig` واکنش‌گرا با `getDefaultConfig()` و `useAppConfig`. |

## قرارداد

- این mock استایل به DOM تزریق نمی‌کند. تست رنگ CSS این‌جا معنا ندارد؛ آن رفتار مال playground و `runtime/vue/stubs` است.
- اگر تست `appConfig.ui` را عوض کرد، قبل از تمام شدن همان تست برش گردان (`delete` یا جایگزینی). `Button.spec.ts` برای `defaultVariants` و `slots` و `useComponentProps.spec.ts` با `afterEach` همین کار را می‌کنند.
- امضای exportها با `src/shims/imports.ts` و `src/runtime/vue/stubs/imports.ts` یکی بماند.
