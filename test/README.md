# test

Vitest روی کامپوننت‌های runtime و کد بیلد. تم را هر بار مستقیم از `src/theme` می‌سازد، پس `pnpm test` به `.nuxt/ui` و `pnpm dev:prepare` نیاز ندارد. `pnpm typecheck` هنوز نیاز دارد، چون `tsconfig.json` مسیر `#build/ui/*` را به `.nuxt/ui` می‌دهد.

## فایل‌ها

| مسیر | کار |
| --- | --- |
| `setup.ts` | matcherهای `vitest-axe` و augment تایپ `Assertion` در `vitest`. |
| `mocks/imports.ts` | alias `#imports`. |
| `components/` | یک `*.spec.ts` برای هر SFC. |
| `composables/` | پراکسی `useComponentProps`. |
| `utils/` | `resolveTheme` (پیش‌فرض رنگ، `unstyled`، prefix) و گروه‌های merge در `tv` (`typo-*`، border). |
| `theme-css.spec.ts` | خروجی `generateThemeCss` برای پله‌های spacing، radius، border-width و تایپوگرافی. |
| `templates.spec.ts` | نام تمپلیت‌ها، ماژول تم، شروع `ui.css` و این‌که هر کلید تم در `AppConfigUI` باشد. |
| `scripts.spec.ts` | `jsonPath` (با `--` که pnpm می‌فرستد) و `sortSpacing` از `scripts/read-figma-tokens.mjs`. |
| `../vitest.config.ts` | پلاگین `sourceTheme` که `#build/ui/<kebab>` را با `resolveTheme(themes[<camel>], {})` از `src/theme` می‌سازد، `#imports` → mock، محیط `happy-dom`. |

## قرارداد

- پلاگین `ui()` را در ویتست لود نکن. کامپوننت مستقیم از `src/runtime/components` mount می‌شود.
- تم تست با گزینهٔ پیش‌فرض ماژول ساخته می‌شود. تستی که گزینهٔ دیگری (`colors`, `prefix`, `unstyled`) لازم دارد، `resolveTheme` را مستقیم صدا بزند، مثل `utils/theme.spec.ts`.
- اسنپ‌شات کلاس تولیدشده را قفل می‌کند. اگر تم را عمداً عوض کردی، اسنپ‌شات را به‌روز کن (`pnpm test -u` بدون `CI`)؛ اگر نکردی، شکست اسنپ‌شات یعنی قرارداد ظاهر شکسته.
- mock را در `mocks/` عوض کن، نه با alias تازه داخل خود spec.
