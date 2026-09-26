# src/runtime

کد اجراشوندهٔ Vue. تم را فقط از `#build/ui/*` می‌گیرد. import از `src/theme` یا `src/utils` این‌جا ممنوع است، چون آن فایل‌ها در باندل runtime و در اپ مصرف‌کننده نیستند.

## زیرپوشه‌ها

| مسیر | کار |
| --- | --- |
| `components/` | SFCها. نام فایل پاسکال‌کیس بدون پیشوند `U`. |
| `composables/` | ادغام prop با `app.config`. |
| `utils/` | `tv` و ساخت CSS متغیر رنگ. |
| `types/` | تایپ slot و re-export پراپ کامپوننت. |
| `plugins/` | پلاگین Nuxt برای تزریق رنگ. |
| `vue/` | `app.use` برای اپ Vite. |
| `index.css` | توکن‌های معنایی و `@import '#build/ui.css'`. |

## نقشه

- رفتار و مارک‌آپ → `components/`.
- کلاس → `src/theme/`، بعد از تولید دوباره از `#build/ui`.
- چیزی که هم Nuxt و هم Vue لازم دارند (مثل `generateColorCss`) این‌جا می‌ماند؛ هر آداپتر فقط آن را صدا می‌زند.
- alias `#ui` در Nuxt به همین پوشه اشاره می‌کند. در پکیج، `exports` مسیر `./runtime/*` را به `dist/runtime/*` می‌دهد.

`index.css` منبع توکن است: `--ui-text*`، `--ui-bg*`، `--ui-border*` برای `.light` و `.dark`. کلاس `dark` روی `documentElement` حالت تیره را روشن می‌کند. رنگ semantic (`--ui-primary`) این‌جا سخت‌کد نمی‌شود؛ پلاگین آن را از `app.config.ui.colors` می‌سازد. پله‌های spacing، شعاع، ضخامت border و نقش تایپوگرافی در `#build/ui.css` به‌صورت `--ui-spacing-*`، `--ui-radius-*`، `--ui-border-width-*` و `--ui-font-size-*` / `--ui-leading-*` / `--ui-font-weight-*` / `--ui-tracking-*` / `--ui-font-family-brand` داخل `@layer theme` ساخته می‌شوند. کلاس نقش `typo-*` است. اورراید کاربر یک `:root` بدون لایه است و به `app.config` مربوط نیست. `--ui-radius` دیگر مصرف نمی‌شود.
