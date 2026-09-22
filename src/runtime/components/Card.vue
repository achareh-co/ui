<script lang="ts">
import type { VNode } from 'vue'
import theme from '#build/ui/card'
import type { ComponentConfig, SlotClasses } from '../types/tv'

type CardTheme = ComponentConfig<typeof theme>

export interface CardProps {
  title?: string
  description?: string
  /**
   * The element or component to render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  ui?: SlotClasses<CardTheme>
}

export interface CardSlots {
  default?(props?: Record<string, never>): VNode[]
  header?(props?: Record<string, never>): VNode[]
  footer?(props?: Record<string, never>): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { tv } from '../utils/tv'

const _props = defineProps<CardProps>()
const slots = defineSlots<CardSlots>()

const props = useComponentProps('card', _props)
const appConfig = useAppConfig()

const ui = computed(() => tv({
  extend: theme,
  ...(appConfig.ui?.card || {})
})())

const hasHeader = computed(() => Boolean(props.title || props.description || slots.header))
</script>

<template>
  <Primitive
    :as="props.as"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
  >
    <div
      v-if="hasHeader"
      data-slot="header"
      :class="ui.header({ class: props.ui?.header })"
    >
      <slot name="header">
        <h3
          v-if="props.title"
          data-slot="title"
          :class="ui.title({ class: props.ui?.title })"
        >
          {{ props.title }}
        </h3>
        <p
          v-if="props.description"
          data-slot="description"
          :class="ui.description({ class: props.ui?.description })"
        >
          {{ props.description }}
        </p>
      </slot>
    </div>

    <div
      data-slot="body"
      :class="ui.body({ class: props.ui?.body })"
    >
      <slot />
    </div>

    <div
      v-if="!!slots.footer"
      data-slot="footer"
      :class="ui.footer({ class: props.ui?.footer })"
    >
      <slot name="footer" />
    </div>
  </Primitive>
</template>
