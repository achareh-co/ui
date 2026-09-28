<script lang="ts">
import type { VNode } from 'vue'
import theme from '#build/ui/input'
import type { ComponentConfig, SlotClasses } from '../types/tv'

type InputTheme = ComponentConfig<typeof theme>

export interface InputProps {
  id?: string
  modelValue?: string
  placeholder?: string
  /**
   * @defaultValue 'bold'
   */
  weight?: keyof InputTheme['variants']['weight']
  /**
   * @defaultValue 'neutral'
   */
  state?: keyof InputTheme['variants']['state']
  /**
   * @defaultValue 'xs'
   */
  radius?: keyof InputTheme['variants']['radius']
  /**
   * @defaultValue 'cozy'
   */
  paddingX?: keyof InputTheme['variants']['paddingX']
  /**
   * @defaultValue 'comfortable'
   */
  paddingY?: keyof InputTheme['variants']['paddingY']
  /**
   * @defaultValue 'start'
   */
  align?: keyof InputTheme['variants']['align']
  /**
   * @defaultValue 'rtl'
   */
  direction?: 'rtl' | 'ltr'
  emptyDirection?: 'rtl' | 'ltr'
  readonly?: boolean
  disabled?: boolean
  clearable?: boolean
  numeric?: boolean
  /**
   * @defaultValue 'پاک کردن'
   */
  clearAriaLabel?: string
  /**
   * The element or component the shell renders as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  ui?: SlotClasses<InputTheme>
}

export interface InputSlots {
  leading?(props?: Record<string, never>): VNode[]
  prefix?(props?: Record<string, never>): VNode[]
  suffix?(props?: Record<string, never>): VNode[]
  trailing?(props?: Record<string, never>): VNode[]
}
</script>

<script setup lang="ts">
import { computed, nextTick, useTemplateRef } from 'vue'
import { Primitive, useId } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { toEnglishDigits } from '../utils/digits'
import { tv } from '../utils/tv'

defineOptions({ inheritAttrs: false })

const _props = defineProps<InputProps>()
const slots = defineSlots<InputSlots>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
  clear: []
  enter: []
}>()

const props = useComponentProps('input', _props)
const appConfig = useAppConfig()
const fallbackId = useId()
const inputEl = useTemplateRef<HTMLInputElement>('inputEl')

const inputId = computed(() => props.id || fallbackId)
const isFilled = computed(() => (props.modelValue ?? '').length > 0)
const direction = computed(() => props.direction ?? 'rtl')
const resolvedDirection = computed(() => {
  const emptyDirection = props.emptyDirection ?? direction.value
  return isFilled.value ? direction.value : emptyDirection
})
const showClear = computed(() => Boolean(props.clearable) && isFilled.value && !props.disabled && !props.readonly)

const ui = computed(() => tv({
  extend: theme,
  ...(appConfig.ui?.input || {})
})({
  weight: props.weight,
  state: props.state,
  radius: props.radius,
  paddingX: props.paddingX,
  paddingY: props.paddingY,
  align: props.align,
  disabled: props.disabled,
  readonly: props.readonly
}))

function onInput(event: Event) {
  emit('update:modelValue', toEnglishDigits((event.target as HTMLInputElement).value))
}

function focus() {
  inputEl.value?.focus()
}

function blur() {
  inputEl.value?.blur()
}

function onClear() {
  emit('update:modelValue', '')
  emit('clear')
  nextTick(() => focus())
}

defineExpose({ focus, blur })
</script>

<template>
  <Primitive
    data-slot="root"
    :as="props.as || 'div'"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    @click="focus"
  >
    <span
      v-if="!!slots.leading"
      data-slot="leading"
      :class="ui.leading({ class: props.ui?.leading })"
    >
      <slot name="leading" />
    </span>

    <div
      data-slot="field"
      :dir="resolvedDirection"
      :class="ui.field({ class: props.ui?.field })"
    >
      <div
        data-slot="content"
        :class="ui.content({ class: props.ui?.content })"
      >
        <span
          v-if="!!slots.prefix"
          data-slot="prefix"
          :class="ui.prefix({ class: props.ui?.prefix })"
        >
          <slot name="prefix" />
        </span>
        <input
          :id="inputId"
          ref="inputEl"
          data-slot="base"
          v-bind="$attrs"
          :value="props.modelValue"
          type="text"
          :placeholder="props.placeholder"
          :readonly="props.readonly"
          :disabled="props.disabled"
          :inputmode="props.numeric ? 'numeric' : undefined"
          :pattern="props.numeric ? '[0-9]*' : undefined"
          :class="ui.base({ class: props.ui?.base })"
          @input="onInput"
          @keydown.enter="emit('enter')"
        >
      </div>

      <Primitive
        v-if="showClear"
        as="button"
        type="button"
        data-slot="clear"
        :aria-label="props.clearAriaLabel || 'پاک کردن'"
        :class="ui.clear({ class: props.ui?.clear })"
        @mousedown.prevent
        @click.stop="onClear"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M3.59 3.59c.23-.23.6-.23.82 0L8 7.18l3.59-3.59a.58.58 0 0 1 .82.82L8.82 8l3.59 3.59a.58.58 0 1 1-.82.82L8 8.82l-3.59 3.59a.58.58 0 0 1-.82-.82L7.18 8 3.59 4.41a.6.6 0 0 1 0-.82"
          />
        </svg>
      </Primitive>

      <span
        v-if="!!slots.suffix"
        data-slot="suffix"
        :class="ui.suffix({ class: props.ui?.suffix })"
      >
        <slot name="suffix" />
      </span>
    </div>

    <span
      v-if="!!slots.trailing"
      data-slot="trailing"
      :class="ui.trailing({ class: props.ui?.trailing })"
    >
      <slot name="trailing" />
    </span>
  </Primitive>
</template>
