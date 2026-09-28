export default defineNuxtConfig({
  modules: ['@achareh/ui'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'fa', dir: 'rtl' }
    }
  },
  compatibilityDate: '2026-09-22',
  devtools: { enabled: false }
})
