import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@achareh/ui/vite'

export default defineConfig({
  plugins: [
    vue(),
    ui({
      ui: {
        colors: {
          primary: 'violet',
          neutral: 'slate'
        }
      }
    })
  ]
})
