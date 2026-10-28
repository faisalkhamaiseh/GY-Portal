import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Fonts never swap in after the first paint (which would shift text): if a
// font is not ready almost immediately, the page keeps the system font for
// this visit, and the cached font is used from the next page on.
const fontDisplayOptional = {
  name: 'font-display-optional',
  transform(code, id) {
    if (id.includes('@fontsource') && id.endsWith('.css')) return code.replaceAll('font-display: swap', 'font-display: optional')
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss(), fontDisplayOptional],
  server: { port: 5190 },
  build: {
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
