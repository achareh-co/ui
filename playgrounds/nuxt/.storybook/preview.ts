import type { Preview } from '@storybook/vue3-vite'
import { withThemeByClassName } from '@storybook/addon-themes'
import App from '@achareh/ui/components/App.vue'
import '../app/assets/css/main.css'
import './preview.css'

const resetDocumentDirection = () => {
  if (typeof document === 'undefined') return
  document.documentElement.removeAttribute('dir')
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      disable: true
    }
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark'
      },
      defaultTheme: 'light'
    }),
    () => ({
      components: { App },
      setup() {
        resetDocumentDirection()
      },
      template: `
        <App dir="rtl" class="min-h-0">
          <div
            dir="rtl"
            :style="{
              fontFamily: 'KalamehWebFaNum, sans-serif',
              padding: '1rem',
              direction: 'rtl',
              textAlign: 'right',
            }"
          >
            <story />
          </div>
        </App>
      `
    })
  ]
}

export default preview
