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
   * @defaultValue 'bold'
   */
  weight?: keyof ButtonTheme['variants']['weight']
  /**
   * @defaultValue 'compact'
   */
  paddingX?: keyof ButtonTheme['variants']['paddingX']
  /**
   * @defaultValue 'compact'
   */
  paddingY?: keyof ButtonTheme['variants']['paddingY']
  /**
   * @defaultValue 'xs'
   */
  radius?: keyof ButtonTheme['variants']['radius']
  block?: boolean
  loading?: boolean
  disabled?: boolean
  /**
   * @defaultValue 'button'
   */
  type?: 'button' | 'submit' | 'reset'
  /**
   * Renders an anchor when set and `as` is empty.
   */
  to?: string
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
  trailing?(props?: Record<string, never>): VNode[]
}
</script>

<script setup lang="ts">
import { computed, mergeProps } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { tv } from '../utils/tv'

defineOptions({ inheritAttrs: false })

const _props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  block: undefined
})
const slots = defineSlots<ButtonSlots>()

const props = useComponentProps('button', _props)
const appConfig = useAppConfig()

const hasLabel = computed(() => Boolean(props.label) || Boolean(slots.default))
const icon = computed(() => {
  if (!hasLabel.value) {
    return 'none'
  }
  if (slots.leading) {
    return 'leading'
  }
  if (slots.trailing && !props.loading) {
    return 'trailing'
  }
  return 'none'
})
const loadingLabel = computed(() => Boolean(props.loading) && hasLabel.value)
const rootAs = computed(() => props.as || (props.to ? 'a' : 'button'))
const isButton = computed(() => rootAs.value === 'button')
const isDisabled = computed(() => Boolean(props.disabled || props.loading))

// Runs before the consumer's click listener so a disabled link never navigates or fires it.
function onClick(event: MouseEvent) {
  if (isDisabled.value) {
    event.preventDefault()
    event.stopImmediatePropagation()
  }
}

const recipe = computed(() => tv({
  extend: theme,
  ...(appConfig.ui?.button || {})
}))

const ui = computed(() => recipe.value({
  color: props.color,
  variant: props.variant,
  weight: props.weight,
  paddingX: props.paddingX,
  paddingY: props.paddingY,
  radius: props.radius,
  block: props.block,
  loading: props.loading,
  loadingLabel: loadingLabel.value,
  icon: icon.value
}))
</script>

<template>
  <Primitive
    data-slot="base"
    v-bind="mergeProps({ onClick }, $attrs)"
    :as="rootAs"
    :type="isButton ? props.type : undefined"
    :href="!props.as && props.to && !isDisabled ? props.to : undefined"
    :to="props.as && props.to ? props.to : undefined"
    :disabled="isButton ? isDisabled : undefined"
    :aria-disabled="!isButton && isDisabled ? 'true' : undefined"
    :tabindex="!isButton && isDisabled ? -1 : undefined"
    :data-disabled="isDisabled ? '' : undefined"
    :aria-busy="props.loading ? 'true' : undefined"
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
      v-if="hasLabel"
      data-slot="label"
      :class="ui.label({ class: props.ui?.label })"
    >
      <slot>{{ props.label }}</slot>
    </span>
    <svg
      v-if="props.loading"
      data-slot="spinner"
      viewBox="25 25 50 50"
      aria-hidden="true"
      :class="ui.spinner({ class: props.ui?.spinner })"
    >
      <circle
        data-slot="spinnerPath"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="5"
        :class="ui.spinnerPath({ class: props.ui?.spinnerPath })"
      />
    </svg>
    <span
      v-else-if="!!slots.trailing"
      data-slot="trailing"
      :class="ui.trailing({ class: props.ui?.trailing })"
    >
      <slot name="trailing" />
    </span>
  </Primitive>
</template>
