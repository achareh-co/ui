import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/unplugin',
    './src/vite'
  ],
  externals: [
    '#build/ui',
    '#build/ui.css',
    '#build/app.config',
    'vite'
  ],
  rollup: {
    emitCJS: false
  },
  hooks: {
    'mkdist:entry:options'(_ctx, _entry, options) {
      options.addRelativeDeclarationExtensions = false
      options.pattern = ['**', '!**/README.md']
    }
  }
})
