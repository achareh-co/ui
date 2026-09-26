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

`index.css` منبع توکن است: `--ui-text*`، `--ui-bg*`، `--ui-border*` برای `.light` و `.dark`. کلاس `dark` روی `documentElement` حالت تیره را روشن می‌کند. شعاع و رنگ semantic (`--ui-primary`) این‌جا سخت‌کد نمی‌شوند؛ شعاع در `:root` است و رنگ را پلاگین از `app.config.ui.colors` می‌سازد. پله‌های spacing در `#build/ui.css` به‌صورت `--ui-spacing-*` داخل `@layer theme` ساخته می‌شوند. اورراید کاربر یک `:root` بدون لایه است و به `app.config` مربوط نیست.
