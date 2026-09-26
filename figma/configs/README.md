# figma/configs

خروجی توکن فیگما. کامپوننت و runtime این JSONها را import نمی‌کنند. اسکریپت‌های `scripts/` مقدار `$value` را می‌خوانند و آرایهٔ متناظر در `src/utils` را می‌نویسند. `$extensions` وارد کد نمی‌شود.

| فایل | دستور |
| --- | --- |
| `spacing.system.tokens.json` | `pnpm tokens:spacing` |
| `border-radius.system.tokens.json` | `pnpm tokens:radius` |
| `border-width.system.tokens.json` | `pnpm tokens:border-width` |
| `RTL-Fa.system.tokens.json` | `pnpm tokens:typography` |

برای امتحان یک خروجی تازه، مسیر را آرگومان بده. آن اجرا فایل این پوشه را عوض نمی‌کند:

```bash
pnpm tokens:spacing -- /path/to/spacing.system.tokens.json
```
