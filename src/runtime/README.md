# src/runtime

کد اجراشوندهٔ Vue. تم را فقط از `#build/ui/*` می‌گیرد. import از `src/theme` یا `src/utils` این‌جا ممنوع است، چون آن فایل‌ها در باندل runtime و در اپ مصرف‌کننده نیستند.

## زیرپوشه‌ها

| مسیر | کار |
| --- | --- |
| `components/` | SFCها. نام فایل پاسکال‌کیس بدون پیشوند `U`. |
| `storybook/` | `StoryIcon` برای استوری‌ها. کامپوننت منتشرشدهٔ اپ نیست. |
| `composables/` | ادغام prop با `app.config`. |
| `utils/` | `tv`. |
| `types/` | تایپ slot و re-export پراپ کامپوننت. |
| `plugins/` | پلاگین Nuxt. رنگ این‌جا تزریق نمی‌شود. |
| `vue/` | `app.use` برای اپ Vite. |
| `index.css` | توکن‌های معنایی و `@import '#build/ui.css'`. |

## نقشه

- رفتار و مارک‌آپ → `components/`.
- کلاس → `src/theme/`، بعد از تولید دوباره از `#build/ui`.
- alias `#ui` در Nuxt به همین پوشه اشاره می‌کند. در پکیج، `exports` مسیر `./runtime/*` را به `dist/runtime/*` می‌دهد.

`index.css` اسم‌های `text-default` و `bg-default` را به `--ui-color-*` وصل می‌کند و دو یوتیلیتی اسپینر دکمه را تعریف می‌کند: `animate-spinner-rotate` و `animate-spinner-dash`. خود آن متغیرها در `#build/ui.css` برای `.light` و `.dark` ساخته می‌شوند. بلوک `--ui-text*` / `--ui-bg*` / `--ui-border*` در `index.css` روی `:root, :host, .light, .dark` تعریف شده تا بخش تو در تو با کلاس `dark` یا `light` رنگ متن و پس‌زمینهٔ خودش را بگیرد. کلاس `dark` روی `documentElement` حالت تیره را روشن می‌کند. پله‌های پالت در `#build/ui.css` کلید `@theme default` هستند (`--color-primary-40`). نقش semantic برای روشن و تیره `--ui-color-*` است و به همان کلید اشاره می‌کند. درصد emphasis، spacing، شعاع، ضخامت border و نقش تایپوگرافی به‌صورت `--ui-emphasis-*`، `--ui-spacing-*`، `--ui-radius-*`، `--ui-border-width-*` و `--ui-font-size-*` / `--ui-leading-*` / `--ui-font-weight-*` / `--ui-tracking-*` / `--ui-font-family-brand` داخل `@layer theme` ساخته می‌شوند. کلاس پله `bg-primary-40` است. کلاس نقش `bg-primary` و `text-on-primary` است. شفافیت نام‌دار `text-on-primary/high` است. کلاس تایپ `typo-*` است. عوض کردن پله یک `@theme` بعدی در CSS اپ است و به `app.config` مربوط نیست. `--ui-radius` دیگر مصرف نمی‌شود.
