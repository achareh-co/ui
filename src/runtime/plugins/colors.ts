import { computed } from 'vue'
import { defineNuxtPlugin, useAppConfig, useHead } from '#imports'
import { generateColorCss } from '../utils/colors'

export default defineNuxtPlugin(() => {
  const appConfig = useAppConfig()

  const css = computed(() => generateColorCss(
    appConfig.ui?.colors || {},
    appConfig.ui?.prefix
  ))

  useHead({
    style: [{
      key: 'acme-ui-colors',
      innerHTML: css,
      tagPriority: 'critical'
    }]
  })
})
