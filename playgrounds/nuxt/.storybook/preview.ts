import type { Preview } from '@storybook/vue3-vite'
import { withThemeByClassName } from '@storybook/addon-themes'
import App from '@achareh/ui/components/App.vue'
import '../app/assets/css/main.css'
import './preview.css'

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
      template: `
        <App dir="rtl" class="min-h-0">
          <div style="padding: 1rem;">
            <story />
          </div>
        </App>
      `
    })
  ]
}

export default preview
