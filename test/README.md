# test

Vitest روی کامپوننت‌های runtime، با تم از قبل تولیدشده در `.nuxt/ui`. قبل از تست `pnpm dev:prepare` لازم است.

## فایل‌ها

| مسیر | کار |
| --- | --- |
| `setup.ts` | matcherهای `vitest-axe`. |
| `mocks/imports.ts` | alias `#imports`. |
| `components/` | یک `*.spec.ts` برای هر SFC. |
| `../vitest.config.ts` | `#build/*` → `./.nuxt/`، `#imports` → mock، محیط `happy-dom`. |

## قرارداد

- پلاگین `ui()` را در ویتست لود نکن. کامپوننت مستقیم از `src/runtime/components` mount می‌شود.
- اسنپ‌شات کلاس تولیدشده را قفل می‌کند. اگر تم را عمداً عوض کردی، اسنپ‌شات را به‌روز کن؛ اگر نکردی، شکست اسنپ‌شات یعنی قرارداد ظاهر شکسته.
- mock را در `mocks/` عوض کن، نه با alias تازه داخل خود spec.
