import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'  // 👈 ADD THIS

export default defineConfig({
  plugins: [
    react(),
    VitePWA({   // 👈 ADD THIS BLOCK (don’t remove react)
      registerType: 'autoUpdate',
      manifest: {
        name: 'ChemLab Interactive',
        short_name: 'ChemLab',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f172a',
        theme_color: '#0f172a',
        icons: [
          {
            src: '/icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})