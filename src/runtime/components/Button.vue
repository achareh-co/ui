<script lang="ts">
import type { VNode } from 'vue'
import theme from '#build/ui/button'
import type { ComponentConfig, SlotClasses } from '../types/tv'

type ButtonTheme = ComponentConfig<typeof theme>

export interface ButtonProps {
  label?: string
  /**
   * @defaultValue 'primary'
   */
  color?: keyof ButtonTheme['variants']['color']
  /**
   * @defaultValue 'solid'
   */
  variant?: keyof ButtonTheme['variants']['variant']
  /**
   * @defaultValue 'md'
   */
  size?: keyof ButtonTheme['variants']['size']
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  /**
   * The element or component to render as.
   * @defaultValue 'button'
   */
  as?: any
  class?: any
  ui?: SlotClasses<ButtonTheme>
}

export interface ButtonSlots {
  default?(props?: Record<string, never>): VNode[]
  leading?(props?: Record<string, never>): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { tv } from '../utils/tv'

defineOptions({ inheritAttrs: false })

const _props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button'
})
const slots = defineSlots<ButtonSlots>()

const props = useComponentProps('button', _props)
const appConfig = useAppConfig()

const ui = computed(() => tv({
  extend: theme,
  ...(appConfig.ui?.button || {})
})({
  color: props.color,
  variant: props.variant,
  size: props.size,
  disabled: props.disabled
}))
</script>

<template>
  <Primitive
    :as="props.as || 'button'"
    :type="props.as ? undefined : props.type"
    :disabled="props.disabled"
    data-slot="base"
    v-bind="$attrs"
    :class="ui.base({ class: [props.ui?.base, props.class] })"
  >
    <span
      v-if="!!slots.leading"
      data-slot="leading"
      :class="ui.leading({ class: props.ui?.leading })"
    >
      <slot name="leading" />
    </span>
    <span
      data-slot="label"
      :class="ui.label({ class: props.ui?.label })"
    >
      <slot>{{ props.label }}</slot>
    </span>
  </Primitive>
</template>
