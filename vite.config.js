import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';




export default defineConfig({
  plugins: [react(), tailwindcss() ,
     VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'ResumeAI - AI Resume Builder & Optimizer',
        short_name: 'Resume AI',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0ea5e9',
        icons: [
          { src: 'https://madgicaltechdom.com/wp-content/uploads/2024/04/How-AI-Helps-Filter-Resumes-According-to-Job-Descriptions.jpeg', sizes: '192x192', type: 'image/png' },
          { src: 'https://madgicaltechdom.com/wp-content/uploads/2024/04/How-AI-Helps-Filter-Resumes-According-to-Job-Descriptions.jpeg', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
})
