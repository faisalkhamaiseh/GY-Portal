import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import postcss from 'postcss'
import cascadeLayers from '@csstools/postcss-cascade-layers'

// Fonts never swap in after the first paint (which would shift text): if a
// font is not ready almost immediately, the page keeps the system font for
// this visit, and the cached font is used from the next page on.
const fontDisplayOptional = {
  name: 'font-display-optional',
  transform(code, id) {
    if (id.includes('@fontsource') && id.endsWith('.css')) return code.replaceAll('font-display: swap', 'font-display: optional')
  },
}

// Tailwind puts its CSS in cascade layers (@layer), which phones older than
// iOS 15.4 / Chrome 99 ignore completely, leaving the site unstyled. This
// rewrites the layers into plain rules with the same priority.
const flattenLayers = {
  name: 'flatten-css-layers',
  apply: 'build',
  enforce: 'post',
  async generateBundle(_, bundle) {
    for (const file of Object.values(bundle)) {
      if (file.type !== 'asset' || !file.fileName.endsWith('.css')) continue
      file.source = (await postcss([cascadeLayers()]).process(String(file.source), { from: undefined })).css
    }
  },
}

// Older phones still in use (iOS 14+, Android Chrome 80+): syntax is
// transpiled down to what they understand.
const browsers = ['chrome80', 'edge88', 'firefox78', 'safari14']

export default defineConfig({
  plugins: [react(), tailwindcss(), fontDisplayOptional, flattenLayers],
  server: { port: 5190 },
  build: {
    target: ['es2020', ...browsers],
    cssTarget: browsers,
    rollupOptions: {
      output: {
        // One long-cached chunk for React and one for every icon, shared by
        // both languages, instead of dozens of tiny per-icon requests.
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)) return 'react'
          if (id.includes('node_modules/lucide-react/')) return 'icons'
        },
      },
    },
  },
})
