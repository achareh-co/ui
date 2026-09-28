<script lang="ts">
import type { VNode } from 'vue'
import theme from '#build/ui/app'
import type { ComponentConfig, SlotClasses } from '../types/tv'

type AppTheme = ComponentConfig<typeof theme>

export interface AppProps {
  /**
   * The element or component to render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * Reading direction set on the root element and forwarded to Reka UI.
   * @defaultValue 'rtl'
   */
  dir?: 'ltr' | 'rtl'
  class?: any
  ui?: SlotClasses<AppTheme>
}

export interface AppSlots {
  default?(props?: Record<string, never>): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ConfigProvider, Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { tv } from '../utils/tv'

const _props = withDefaults(defineProps<AppProps>(), {
  dir: 'rtl'
})
defineSlots<AppSlots>()

const props = useComponentProps('app', _props)
const appConfig = useAppConfig()

const recipe = computed(() => tv({
  extend: theme,
  ...(appConfig.ui?.app || {})
}))

const ui = computed(() => recipe.value())
</script>

<template>
  <ConfigProvider :dir="props.dir">
    <Primitive
      :as="props.as"
      data-slot="root"
      :dir="props.dir"
      :class="ui.root({ class: [props.ui?.root, props.class] })"
    >
      <slot />
    </Primitive>
  </ConfigProvider>
</template>
