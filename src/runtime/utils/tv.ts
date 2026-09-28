import { createTV } from 'tailwind-variants'

const create = createTV({
  twMerge: true,
  twMergeConfig: {
    extend: {
      classGroups: {
        'border-w': [{ border: ['xs', 'sm', 'md', 'lg'] }],
        'border-w-x': [{ 'border-x': ['xs', 'sm', 'md', 'lg'] }],
        'border-w-y': [{ 'border-y': ['xs', 'sm', 'md', 'lg'] }],
        'border-w-s': [{ 'border-s': ['xs', 'sm', 'md', 'lg'] }],
        'border-w-e': [{ 'border-e': ['xs', 'sm', 'md', 'lg'] }]
      }
    }
  }
})

type SlotFn = (slotProps?: { class?: any, className?: any }) => string

/**
 * `tailwind-variants` erases slot keys when an `app.config` override is spread in.
 * This wrapper keeps `ui.<slot>()` callable while preserving `twMerge`.
 */
export function tv(config: { extend?: unknown } & Record<string, unknown>) {
  return create(config as any) as unknown as (props?: Record<string, any>) => Record<string, SlotFn>
}
