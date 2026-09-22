import { createTV } from 'tailwind-variants'

const create = createTV({
  twMerge: true
})

type SlotFn = (slotProps?: { class?: any, className?: any }) => string

/**
 * `tailwind-variants` erases slot keys when an `app.config` override is spread in.
 * This wrapper keeps `ui.<slot>()` callable while preserving `twMerge`.
 */
export function tv(config: { extend?: unknown } & Record<string, unknown>) {
  return create(config as any) as unknown as (props?: Record<string, any>) => Record<string, SlotFn>
}
